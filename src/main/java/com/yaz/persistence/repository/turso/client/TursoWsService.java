package com.yaz.persistence.repository.turso.client;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.yaz.core.util.RandomUtil;
import com.yaz.core.util.VertxUtil;
import com.yaz.persistence.repository.turso.client.ws.TursoResult;
import com.yaz.persistence.repository.turso.client.ws.request.CloseStreamReq;
import com.yaz.persistence.repository.turso.client.ws.request.ExecuteReq;
import com.yaz.persistence.repository.turso.client.ws.request.OpenStreamReq;
import com.yaz.persistence.repository.turso.client.ws.request.Request;
import com.yaz.persistence.repository.turso.client.ws.request.RequestMsg;
import com.yaz.persistence.repository.turso.client.ws.request.Stmt;
import com.yaz.persistence.repository.turso.client.ws.request.Value;
import com.yaz.persistence.repository.turso.client.ws.response.ExecuteResp;
import com.yaz.persistence.repository.turso.client.ws.response.ExecuteResp.Row;
import io.micrometer.core.annotation.Timed;
import io.smallrye.mutiny.Uni;
import io.vertx.mutiny.core.eventbus.EventBus;
import io.vertx.mutiny.core.eventbus.Message;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.function.Function;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor
public class TursoWsService {

  private static final String TOTAL_COUNT = "SELECT COUNT(%s) as total_count FROM %s";

  private final TursoJsonMapper mapper;
  private final EventBus bus;
  private final TursoBean tursoBean;


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

  @Timed(value = "turso.query.request", description = "[Turso] A measure of how long it takes to execute a query")
  public Uni<List<TursoResult>> uniSimpleQuery(Stmt... stmts) {

    final var requestMsgs = new RequestMsg[stmts.length + 2];
    final var streamId = getStreamId();
    requestMsgs[0] = createRequest(OpenStreamReq.create(streamId));

    for (int i = 0; i < stmts.length; i++) {
      requestMsgs[i + 1] = createRequest(ExecuteReq.create(streamId, stmts[i]));
    }

    requestMsgs[requestMsgs.length - 1] = createRequest(CloseStreamReq.create(streamId));

    if (true) {
      return tursoBean.sendMsgs(requestMsgs);
    }

    return bus.request(TursoVerticle.ADDRESS, requestMsgs)
        .map(Message::body)
        .flatMap(obj -> {
          if (obj instanceof Throwable t) {
            return Uni.createFrom().failure(VertxUtil.removeReply(t));
          } else {
            return Uni.createFrom().item((List<TursoResult>) obj);
          }
        });

    // return AsyncResultUni.toUni(handler -> executeStatements(handler, stmts));
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
                  .append("Request:").append(mapper.toJson(result.requestMsg()))
                  .append("Response:").append(mapper.toJson(responseMsg))
                  //.append("Request:").append(result.requestMsg()).append("Response:").append(responseMsg)
                  .append("]").append("\n");
            } else {

              if (result.requestMsg().request().type().equals("execute") && responseMsg.response() != null) {

                try {
                  final var executeResp = mapper.mapper().treeToValue(responseMsg.response(), ExecuteResp.class);
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
