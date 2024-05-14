package com.yaz.persistence.repository.turso.client;

import com.yaz.core.util.VertxUtil;
import com.yaz.persistence.repository.turso.client.ws.Listener;
import com.yaz.persistence.repository.turso.client.ws.TursoResult;
import com.yaz.persistence.repository.turso.client.ws.request.HelloMsg;
import com.yaz.persistence.repository.turso.client.ws.request.RequestMsg;
import com.yaz.persistence.repository.turso.client.ws.response.ResponseMsg;
import io.vertx.core.AbstractVerticle;
import io.vertx.core.AsyncResult;
import io.vertx.core.Future;
import io.vertx.core.Handler;
import io.vertx.core.Promise;
import io.vertx.core.buffer.Buffer;
import io.vertx.core.http.WebSocket;
import io.vertx.core.http.WebSocketClient;
import io.vertx.core.http.WebSocketClientOptions;
import io.vertx.core.http.WebSocketConnectOptions;
import jakarta.enterprise.context.Dependent;
import jakarta.inject.Inject;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.LinkedBlockingQueue;
import lombok.extern.slf4j.Slf4j;
import org.eclipse.microprofile.config.inject.ConfigProperty;

@Slf4j
@Dependent
public class TursoVerticle extends AbstractVerticle {

  private final LinkedBlockingQueue<RequestMsg[]> pendingMessages = new LinkedBlockingQueue<>();

  private final Map<Integer, TursoResult> results = new ConcurrentHashMap<>();
  private final Map<Integer, Listener> listeners = new ConcurrentHashMap<>();

  public static final String ADDRESS = "turso-request";

  @ConfigProperty(name = "quarkus.rest-client.turso-db.url")
  String url;

  @ConfigProperty(name = "app.turso-jwt")
  String jwt;

  @Inject
  TursoJsonMapper mapper;

  private WebSocketClient client;
  private WebSocket webSocket;
  private boolean closing;

  private Long timerId;
  private long lastPongAt;
  private final long PING_INTERVAL = 10;


  @Override
  public void start(Promise<Void> startPromise) throws Exception {
    url = url.replace("https://", "");
    vertx.eventBus().<RequestMsg[]>consumer(ADDRESS)
        .handler(message -> {

          final var requestMsgs = message.body();

          final var requests = new int[requestMsgs.length];
          final var listener = new Listener(requests, new Handler<>() {
            @Override
            public void handle(AsyncResult<List<TursoResult>> event) {
              if (event.succeeded()) {
                message.reply(event.result());
              } else {
                message.reply(VertxUtil.replyException(event.cause(), getClass().toString()));
              }
            }
          });

          for (int i = 0; i < requestMsgs.length; i++) {
            final var requestId = requestMsgs[i].requestId();
            requests[i] = requestId;
            listeners.put(requestId, listener);
          }

          sendMsg(requestMsgs);
        })
        .completionHandler(startPromise);

    startSocket();
  }

  void sendMsg(RequestMsg[] requestMsgs) {
    if (webSocket != null) {
      for (RequestMsg requestMsg : requestMsgs) {
        results.putIfAbsent(requestMsg.requestId(), new TursoResult(requestMsg));
        sendMessage(mapper.toJson(requestMsg));
      }
    } else {
      pendingMessages.add(requestMsgs);
    }
  }

  void startSocket() {
    closing = false;

    final var options = new WebSocketClientOptions()
        .setReuseAddress(true)
        .setReusePort(true)
        .setSsl(true)
        .setUseAlpn(true)
        .setMaxFrameSize(1000000)
        .setMaxMessageSize(1000000)
        .setSendBufferSize(1000000)
        .setReceiveBufferSize(1000000)
        //  .setConnectTimeout(Duration.ofSeconds(10).toMillisPart())
        //.setIdleTimeout(10)
        //.setIdleTimeoutUnit(TimeUnit.SECONDS)
//        .setClosingTimeout(Duration.ofSeconds(3).toMillisPart())
//        .setTcpUserTimeout(Duration.ofSeconds(10).toMillisPart())
//        .setReadIdleTimeout(Duration.ofSeconds(10).toMillisPart())
//        //.setSslHandshakeTimeout(10)
//        //.setSslHandshakeTimeoutUnit(TimeUnit.SECONDS)
        //   .setWriteIdleTimeout(Duration.ofSeconds(30).toMillisPart())

        .setShared(false)
        .setMetricsName("TURSO_WEBSOCKET")
        .setName("TURSO_WEBSOCKET");

    client = vertx.createWebSocketClient(options);

    final var webSocketConnectOptions = new WebSocketConnectOptions()
        .setPort(443)
        .setHost(url)
        .setURI("/")
        .setSsl(true)
        .setConnectTimeout(Duration.ofSeconds(10).toMillis())
        .setIdleTimeout(Duration.ofSeconds(30).toMillis())
        .setTimeout(Duration.ofSeconds(10).toMillis());

    client.connect(webSocketConnectOptions)
        .flatMap(socket -> {
          this.webSocket = socket;
          log.debug("Connected to Turso websocket {}", url);
          configWebSocket();
          return Future.succeededFuture();
        })
        .onFailure(t -> {
          log.error("Failed to connect to websocket {}\n", url, t);
          restart(Duration.ofSeconds(5));
        });
  }

  void configWebSocket() {

    webSocket.frameHandler(frame -> {
          if (frame.isPing()) {
            log.debug("Received ping");
            webSocket.writePong(Buffer.buffer(0xA));
            //webSocket.writeFrame(WebSocketFrame.pongFrame(Buffer.buffer(0xA)));
          } else {
            // log.info("Received frame: {}", frame.textData());
          }
        })
        //.binaryMessageHandler(b -> log.info("Received binary {}", b.toString()))
        .pongHandler(b -> {
         // log.debug("Received pong {}", b.toString());
          lastPongAt = System.currentTimeMillis();
        })
        .drainHandler(v -> log.info("Drain handler"))
        .textMessageHandler(this::receivedMsg)
        .exceptionHandler(e -> {
          if (!closing) {
            log.debug("Closed by error", e);
            handleError(e);
            restart(Duration.ofSeconds(3));
          }
        })
        .closeHandler(v -> {
          if (!closing) {
            log.debug("Closed");
            handleCloseClient();
            restart(Duration.ofSeconds(1));
          }
        });

    sendHeartBeat();
    final var helloMsg = HelloMsg.create(jwt);
    sendMessage(mapper.toJson(helloMsg));

    if (timerId == null) {
      timerId = vertx.setPeriodic(Duration.ofSeconds(PING_INTERVAL).toMillis(), l -> {
        sendHeartBeat();
      });
    }
  }

  public void receivedMsg(String json) {
    log.debug("Received message: %s".formatted(json));

    final var responseMsg = mapper.fromJson(json, ResponseMsg.class);
    if (responseMsg.type().equals("hello_ok") || responseMsg.type().equals("hello_error")) {
      if (responseMsg.type().equals("hello_error")) {
        log.error("Failed to send hello: %s".formatted(responseMsg.error()));
      }
      sendPending();
      return;
    }

    final var msgResult = results.get(responseMsg.requestId());
    if (msgResult == null) {
      log.warn("No request found for response: %s".formatted(json));
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

  public void sendHeartBeat() {
    if (webSocket != null) {

      if (lastPongAt > 0 && System.currentTimeMillis() - lastPongAt > Duration.ofSeconds(30).toMillis()) {
        lastPongAt = 0;
        log.info("No pong received for 30 seconds, closing socket");
        restart(Duration.ofSeconds(1));
        return;
      }

      //log.debug("Sending ping");
      webSocket.writePing(Buffer.buffer(0x9));
      //webSocket.writeFrame(WebSocketFrame.pingFrame(Buffer.buffer(0x9)));
    }
  }

  private void sendPending() {
    if (webSocket != null) {
      while (!pendingMessages.isEmpty()) {
        sendMsg(pendingMessages.poll());
      }
    }
  }

  public void sendMessage(String msg) {
    if (msg.equals("{}")) {
      log.info("Invalid message: %s".formatted(msg));
    } else {
      log.debug("Sending message: %s".formatted(msg));
      webSocket.writeTextMessage(msg);
    }
  }

  private void restart(Duration duration) {
    if (!closing) {
      closeSocket()
          .compose(v -> closeClient());
      log.debug("Restarting in {} seconds", duration);
      vertx.setTimer(duration.toMillis(), l -> startSocket());
    }
  }

  @Override
  public void stop(Promise<Void> stopPromise) {
    closing = true;
    if (timerId != null) {
      vertx.cancelTimer(timerId);
    }
    closeSocket()
        .compose(v -> closeClient())
        .onComplete(stopPromise);
  }

  Future<Void> closeSocket() {

    if (webSocket != null) {
      final var future = webSocket.close();
      webSocket = null;
      return future;
    }

    return Future.succeededFuture();
  }

  Future<Void> closeClient() {
    if (client != null) {
      final var future = client.close();
      client = null;
      return future;
    }

    return Future.succeededFuture();
  }

  private void handleError(Throwable e) {
    for (Listener listener : listeners.values()) {
      listener.handler().handle(Future.failedFuture(e));
    }
    listeners.clear();
    results.clear();
  }

  private void handleCloseClient() {
    for (Listener listener : listeners.values()) {
      listener.handler().handle(Future.failedFuture(new RuntimeException("Connection closed")));
    }
    listeners.clear();
    results.clear();
  }
}
