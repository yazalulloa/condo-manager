package com.yaz.persistence.repository.turso.client;

import com.yaz.persistence.repository.turso.client.ws.Listener;
import com.yaz.persistence.repository.turso.client.ws.TursoResult;
import com.yaz.persistence.repository.turso.client.ws.request.HelloMsg;
import com.yaz.persistence.repository.turso.client.ws.request.RequestMsg;
import com.yaz.persistence.repository.turso.client.ws.response.ResponseMsg;
import io.quarkus.websockets.next.OpenClientConnections;
import io.quarkus.websockets.next.WebSocketClientConnection;
import io.quarkus.websockets.next.WebSocketConnector;
import io.smallrye.mutiny.Uni;
import io.vertx.core.Future;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import lombok.extern.slf4j.Slf4j;
import org.eclipse.microprofile.config.inject.ConfigProperty;

@Slf4j
@Singleton
public class TursoBean {

  public static final String CLIENT_ID = "turso-client";
  private final Map<Integer, TursoResult> results = new ConcurrentHashMap<>();
  private final Map<Integer, Listener> listeners = new ConcurrentHashMap<>();

  @Inject
  OpenClientConnections openClientConnections;

  @Inject
  WebSocketConnector<TursoWebSocketClient> connector;


  @ConfigProperty(name = "quarkus.rest-client.turso-db.url")
  String url;

  @ConfigProperty(name = "app.turso-jwt")
  String jwt;

  @Inject
  TursoJsonMapper mapper;

  public Uni<WebSocketClientConnection> openAndSendMessage() {
    final var connections = openClientConnections.findByClientId(CLIENT_ID);
    log.debug("Connections: {}", connections.size());

    for (WebSocketClientConnection connection : connections) {
      if (connection.isOpen()) {
        return Uni.createFrom().item(connection);
      }
    }

    return connector
        .baseUri(URI.create(url))
        .connect()
        .flatMap(ws -> {
          final var helloMsg = HelloMsg.create(jwt);
          final var json = mapper.toJson(helloMsg);
          return ws.sendText(json)
              .replaceWith(ws);
        });
  }


  public Uni<List<TursoResult>> sendMsgs(RequestMsg[] requestMsgs) {

    return openAndSendMessage()
        .flatMap(connection -> {
          return Uni.createFrom()
              .emitter(uniEmitter -> {

                final var requests = new int[requestMsgs.length];
                final var listener = new Listener(requests, event -> {
                  if (event.succeeded()) {
                    uniEmitter.complete(event.result());
                  } else {
                    uniEmitter.fail(event.cause());
                  }
                });

                for (int i = 0; i < requestMsgs.length; i++) {
                  final var requestId = requestMsgs[i].requestId();
                  requests[i] = requestId;
                  listeners.put(requestId, listener);
                }

                for (RequestMsg requestMsg : requestMsgs) {
                  results.putIfAbsent(requestMsg.requestId(), new TursoResult(requestMsg));
                  final var json = mapper.toJson(requestMsg);
                  if (json.equals("{}")) {
                    log.error("Invalid message: %s".formatted(json));
                    uniEmitter.fail(new IllegalArgumentException("Invalid message: %s".formatted(json)));
                  } else {
                    log.debug("Sending message: %s".formatted(json));
                    connection.sendText(json).subscribe()
                        .with(
                            v -> log.debug("Message sent: %s".formatted(json)),
                            t -> log.error("Failed to send message: %s".formatted(json), t)
                        );
                  }

                }
              });


        });


  }

  public void receivedMsg(String json) {

    final var responseMsg = mapper.fromJson(json, ResponseMsg.class);
    if (responseMsg.type().equals("hello_ok") || responseMsg.type().equals("hello_error")) {
      if (responseMsg.type().equals("hello_error")) {
        log.error("Failed to send hello: %s".formatted(responseMsg.error()));
      }
      //sendPending();
      return;
    }

    final var msgResult = results.get(responseMsg.requestId());
    if (msgResult == null) {
      log.error("No request found for response: %s".formatted(json));
    } else {
      msgResult.setResponse(responseMsg);
      log.debug("MsgResult {} {}", msgResult.requestId(), mapper.toJson(msgResult));
      final var listener = listeners.get(msgResult.requestId());
      if (listener != null) {

        final var tursoResults = new ArrayList<TursoResult>(listener.requests().length);
        for (int id : listener.requests()) {
          final var result = results.get(id);
          if (result.responseMsg() != null) {
            tursoResults.add(result);
          }
        }
        if (tursoResults.size() == listener.requests().length) {
          for (int id : listener.requests()) {
            results.remove(id);
            listeners.remove(id);
          }
          listener.handler().handle(Future.succeededFuture(tursoResults));
        }

      } else {
        results.remove(msgResult.requestId());
      }

    }
  }

//  void shutdown(@Observes ShutdownEvent event) {
//    log.info("The application is stopping...");
//    Multi.createFrom().items(openClientConnections.stream())
//        .onItem()
//        .transformToUni(WebSocketClientConnection::close)
//        .merge()
//        .collect()
//        .asList()
//        .await()
//        .atMost(Duration.ofSeconds(2));
//  }
}
