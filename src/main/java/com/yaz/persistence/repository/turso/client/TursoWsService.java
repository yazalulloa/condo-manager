package com.yaz.persistence.repository.turso.client;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.yaz.persistence.repository.turso.client.ws.Listener;
import com.yaz.persistence.repository.turso.client.ws.TursoResult;
import com.yaz.persistence.repository.turso.client.ws.request.CloseStreamReq;
import com.yaz.persistence.repository.turso.client.ws.request.ExecuteReq;
import com.yaz.persistence.repository.turso.client.ws.request.HelloMsg;
import com.yaz.persistence.repository.turso.client.ws.request.OpenStreamReq;
import com.yaz.persistence.repository.turso.client.ws.request.Request;
import com.yaz.persistence.repository.turso.client.ws.request.RequestMsg;
import com.yaz.persistence.repository.turso.client.ws.request.Stmt;
import com.yaz.persistence.repository.turso.client.ws.request.Value;
import com.yaz.persistence.repository.turso.client.ws.response.ExecuteResp;
import com.yaz.persistence.repository.turso.client.ws.response.ExecuteResp.Row;
import com.yaz.persistence.repository.turso.client.ws.response.ResponseMsg;
import com.yaz.core.util.RandomUtil;
import io.smallrye.mutiny.Uni;
import io.smallrye.mutiny.vertx.AsyncResultUni;
import io.vertx.core.AsyncResult;
import io.vertx.core.Future;
import io.vertx.core.Handler;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.function.Function;
import lombok.extern.slf4j.Slf4j;
import org.eclipse.microprofile.config.inject.ConfigProperty;

@Slf4j
@ApplicationScoped
public class TursoWsService {

  private static final Map<Integer, String> STORED_QUERIES = new HashMap<>();

  private static final Map<Integer, TursoResult> RESULTS = new ConcurrentHashMap<>();
  private static final Map<Integer, Listener> LISTENERS = new ConcurrentHashMap<>();
  private static final AtomicBoolean HELLO_SENT = new AtomicBoolean(false);
  //private static final AtomicLong REQUEST_ID = new AtomicLong(0);
  //private static final AtomicLong STREAM_ID = new AtomicLong(0);
  //private static final AtomicLong SQL_ID = new AtomicLong(0);

  private static final String TOTAL_COUNT = "SELECT COUNT(%s) as total_count FROM %s";
  private final TursoWsClient client;
  private final String jwt;
  private final ObjectMapper mapper;

  @Inject
  public TursoWsService(TursoWsClient client, @ConfigProperty(name = "app.turso-jwt") String jwt,
      ObjectMapper objectMapper
      //    @NonNullObjectMapper JsonMapper jsonMapper
  ) {
    this.client = client;
    this.jwt = jwt;
    this.mapper = objectMapper
        .copy()
        .setSerializationInclusion(JsonInclude.Include.NON_NULL)
        .setPropertyNamingStrategy(PropertyNamingStrategies.SNAKE_CASE)
        .configure(JsonGenerator.Feature.WRITE_BIGDECIMAL_AS_PLAIN, true);
    client.addMsgHandler(this::handleMessage);
    client.addExceptionHandler(this::handleError);
    client.addCloseHandler(v -> handleCloseClient());
  }

  public Future<Void> heartBeat() {
    return client.start()
        .onSuccess(v -> {
          client.sendHeartBeat();
          sendHello();
        });
  }

  private void handleError(Throwable e) {
    for (Listener listener : LISTENERS.values()) {
      listener.handler().handle(Future.failedFuture(e));
    }
    LISTENERS.clear();
    RESULTS.clear();
  }

  private void handleCloseClient() {
    for (Listener listener : LISTENERS.values()) {
      listener.handler().handle(Future.failedFuture(new RuntimeException("Connection closed")));
    }
    LISTENERS.clear();
    RESULTS.clear();
  }

  private void handleMessage(String json) {
    final var responseMsg = fromJson(json, ResponseMsg.class);
    if (responseMsg.type().equals("hello_ok") || responseMsg.type().equals("hello_error")) {
      if (responseMsg.type().equals("hello_error")) {
        log.error("Failed to send hello: %s".formatted(responseMsg.error()));
      }
      return;
    }
    final var msgResult = RESULTS.get(responseMsg.requestId());
    if (msgResult == null) {
      log.warn("No request found for response: %s".formatted(json));
    } else {
      msgResult.setResponse(responseMsg);
      log.debug("MsgResult {} {}", msgResult.requestId(), toJson(msgResult));
      final var listener = LISTENERS.get(msgResult.requestId());
      if (listener != null) {

        final var tursoResults = new ArrayList<TursoResult>(listener.requests().length);
        for (int id : listener.requests()) {
          final var result = RESULTS.get(id);
          if (result.responseMsg() != null) {
            tursoResults.add(result);
          }
        }
        if (tursoResults.size() == listener.requests().length) {
          for (int id : listener.requests()) {
            RESULTS.remove(id);
            LISTENERS.remove(id);
          }
          listener.handler().handle(Future.succeededFuture(tursoResults));
        }

      } else {
        RESULTS.remove(msgResult.requestId());
      }

    }
  }

  private <T> T fromJson(String json, Class<T> clazz) {
    try {
      return mapper.readValue(json, clazz);
    } catch (JsonProcessingException e) {
      log.error("Failed to parse json: %s".formatted(json));
      throw new RuntimeException(e);
    }
  }

  private String toJson(Object object) {
    try {
      return mapper.writeValueAsString(object);
    } catch (JsonProcessingException e) {
      log.error("Failed to serialize object: %s".formatted(object));
      throw new RuntimeException(e);
    }
  }

  public void sendHello() {
    if (HELLO_SENT.compareAndSet(false, true)) {
      final var helloMsg = HelloMsg.create(jwt);

      client.sendMessage(toJson(helloMsg));
    }
  }

  private void request(RequestMsg request) {
    sendHello();
    RESULTS.putIfAbsent(request.requestId(), new TursoResult(request));
    client.sendMessage(toJson(request));
  }

  private RequestMsg createRequest(Request request) {
    return RequestMsg.create(getRequestId(), request);
  }

  public Uni<ExecuteResp> loadSchema() {
    return executeQuery(Stmt.sql("SELECT * FROM sqlite_schema;"));
  }

  private int getStreamId() {
    return RandomUtil.unsignedInt10();
  }

  private int getRequestId() {
    return RandomUtil.unsignedInt10();
  }

  public void executeStatements(Handler<AsyncResult<List<TursoResult>>> handler, Stmt... stmts) {
    final var streamId = getStreamId();
    final var openStreamReq = createRequest(OpenStreamReq.create(streamId));

    final var executeReqs = new RequestMsg[stmts.length];
    for (int i = 0; i < stmts.length; i++) {
      final var executeReq = createRequest(ExecuteReq.create(streamId, stmts[i]));
      executeReqs[i] = executeReq;
    }
    //final var executeReq = createRequest(ExecuteReq.create(streamId, stmt));
    final var closeStreamReq = createRequest(CloseStreamReq.create(streamId));

    final var requests = new int[executeReqs.length + 2];
    requests[0] = openStreamReq.requestId();
    requests[requests.length - 1] = closeStreamReq.requestId();
    for (int i = 0; i < executeReqs.length; i++) {
      requests[i + 1] = executeReqs[i].requestId();
    }

    final var listener = new Listener(requests, handler);

    LISTENERS.put(openStreamReq.requestId(), listener);
    for (RequestMsg executeResp : executeReqs) {
      LISTENERS.put(executeResp.requestId(), listener);
    }

    LISTENERS.put(closeStreamReq.requestId(), listener);

    request(openStreamReq);
    for (RequestMsg executeResp : executeReqs) {
      request(executeResp);
    }
    request(closeStreamReq);
  }

  public Uni<List<TursoResult>> uniSimpleQuery(Stmt... stmt) {
    return AsyncResultUni.toUni(handler -> executeStatements(handler, stmt));
  }

  public Uni<ExecuteResp> executeQuery(String sql, Value... values) {
    final var stmt = Stmt.stmt(sql, values);
    return executeQuery(stmt);
  }

  public Uni<ExecuteResp[]> executeQueries(Stmt... stmts) {

    return uniSimpleQuery(stmts)
        .flatMap(list -> {
          final var resps = new ExecuteResp[stmts.length];

          final var errorBuilder = new StringBuilder();

          int i = 0;

          for (TursoResult result : list) {
            final var responseMsg = result.responseMsg();
            final var error = responseMsg.error();
            if (error != null) {
              errorBuilder.append("[").append("Message: ").append(error.message()).append(" Code: ")
                  .append(error.code())
                  .append(" --- ")
                  .append("Request:").append(toJson(result.requestMsg()))
                  .append("Response:").append(toJson(responseMsg))
                  //.append("Request:").append(result.requestMsg()).append("Response:").append(responseMsg)
                  .append("]").append("\n");
            } else {

              if (result.requestMsg().request().type().equals("execute") && responseMsg.response() != null) {

                try {
                  final var executeResp = mapper.treeToValue(responseMsg.response(), ExecuteResp.class);
                  resps[i] = executeResp;
                  i++;

                } catch (JsonProcessingException e) {
                  return Uni.createFrom().failure(e);
                }
              }
            }
          }

          if (!errorBuilder.isEmpty()) {
            errorBuilder.insert(0, "Error \n");
            return Uni.createFrom().failure(new RuntimeException(errorBuilder.toString()));
          }

          if (resps.length == 0) {
            return Uni.createFrom().failure(new RuntimeException("No response"));
          }

          return Uni.createFrom().item(resps);
        });

  }

  public Uni<ExecuteResp> executeQuery(Stmt stmt) {
    return executeQueries(stmt)
        .map(a -> a[0]);
  }

  public Uni<Long> count(String sql, Value... values) {
    return executeQuery(Stmt.stmt(sql, values))
        .map(this::extractCount);
  }

  public Uni<Long> count(String column, String table) {
    final var sql = TOTAL_COUNT.formatted(column, table);

    return executeQuery(Stmt.sql(sql))
        .map(this::extractCount);
  }

  public long extractCount(ExecuteResp executeResp) {
    final var rows = executeResp.result().rows();
    if (rows.length > 0 && rows[0].length > 0) {
      final var value = rows[0][0];
      switch (value.type()) {
        case "float":
          return ((Number) value.value()).longValue();
        case "integer", "text":
          return Long.parseLong((String) value.value());
        case "null", "blob":
          break;
      }
    }

    throw new RuntimeException("No count found");
  }

  public <T> Uni<List<T>> selectQuery(String sql, Function<Row, T> function) {
    return selectQuery(Stmt.sql(sql), function);
  }

  public <T> Uni<List<T>> selectQuery(Stmt stmt, Function<Row, T> function) {
    return executeQuery(stmt)
        .map(executeResp -> {

          final var rows = executeResp.rows();
          final var list = new ArrayList<T>(rows.length);
          for (Row row : rows) {
            list.add(function.apply(row));
          }
          return list;


        });
  }

  public <T> Uni<Set<T>> selectQuerySet(Stmt stmt, Function<Row, T> function) {
    return executeQuery(stmt)
        .map(executeResp -> {

          final var rows = executeResp.rows();

          final var set = HashSet.<T>newHashSet(rows.length);
          for (Row row : rows) {
            set.add(function.apply(row));
          }
          return set;


        });
  }

  public <T> Uni<List<T>> selectQuery(String sql, Collection<Value> values, Function<Row, T> function) {
    return selectQuery(Stmt.sqlWithArgs(sql, values.toArray(new Value[0])), function);
  }

  public <T> Uni<Optional<T>> selectOne(Stmt stmt, Function<Row, T> function) {
    return executeQuery(stmt)
        .map(ExecuteResp::rows)
        .map(rows -> {
          if (rows.length == 0) {
            return Optional.empty();
          }
          return Optional.of(function.apply(rows[0]));
        });
  }

  public <T> Uni<Optional<T>> selectOne(String sql, Collection<Value> values, Function<Row, T> function) {
    return selectOne(Stmt.sqlWithArgs(sql, values.toArray(new Value[0])), function);

  }

}
