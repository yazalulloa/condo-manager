package com.yaz.persistence.repository.turso.client;

import io.vertx.core.Future;
import io.vertx.core.Handler;
import io.vertx.core.buffer.Buffer;
import io.vertx.core.http.WebSocket;
import io.vertx.core.http.WebSocketClient;
import io.vertx.core.http.WebSocketClientOptions;
import io.vertx.core.http.WebSocketConnectOptions;
import io.vertx.mutiny.core.Vertx;
import jakarta.annotation.PreDestroy;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicBoolean;
import lombok.extern.slf4j.Slf4j;
import org.eclipse.microprofile.config.inject.ConfigProperty;

@Slf4j
@ApplicationScoped
public class TursoWsClient {

  private static final LinkedBlockingQueue<String> PENDING_MESSAGES = new LinkedBlockingQueue<>();

  private final Vertx vertx;
  private final String url;
  private final AtomicBoolean connecting = new AtomicBoolean(false);
  private final List<Handler<String>> msgHandlers = new ArrayList<>();
  private final List<Handler<Throwable>> exceptionHandlers = new ArrayList<>();
  private final List<Handler<Void>> closeHandlers = new ArrayList<>();
  private WebSocketClient client;
  private WebSocket webSocket;

  @Inject
  public TursoWsClient(Vertx vertx, @ConfigProperty(name = "quarkus.rest-client.turso-db.url") String url) {
    this.vertx = vertx;
    this.url = url.replace("https://", "");
  }

//  @PostConstruct
//  void init() {
//    start();
//  }

  @PreDestroy
  void destroy() {
    sendPending();
    close();
  }

  public void addMsgHandler(Handler<String> handler) {
    msgHandlers.add(handler);
  }

  public void addExceptionHandler(Handler<Throwable> handler) {
    exceptionHandlers.add(handler);
  }

  public void addCloseHandler(Handler<Void> handler) {
    closeHandlers.add(handler);
  }

  private WebSocketClient client() {
    if (client != null) {
      return client;
    }

    final var options = new WebSocketClientOptions()
        .setReuseAddress(true)
        .setReusePort(true)
        .setSsl(true)
        .setUseAlpn(true)
        .setShared(true)
        .setMetricsName("TURSO_WS_CLIENT")
        .setName("TURSO_WS_CLIENT");

    client = vertx.getDelegate().createWebSocketClient(options);
    return client;
  }

  public Future<Void> start() {

    //log.info("Starting");
    if (connecting.get()) {
      //log.info("Already connecting");
      return Future.succeededFuture();
    }

    //log.info("connecting");

    connecting.set(true);

    final var webSocketConnectOptions = new WebSocketConnectOptions()
        .setPort(443)
        .setHost(url)
        .setURI("/")
//        .setConnectTimeout(Duration.ofSeconds(10).toMillis())
//        .setIdleTimeout(Duration.ofSeconds(5).toMillis())
//        .setTimeout(Duration.ofSeconds(10).toMillis())
        ;

    return client().connect(webSocketConnectOptions)
        .flatMap(socket -> {
          this.webSocket = socket;
          log.info("Connected to Turso websocket {}", url);
          return Future.succeededFuture();
        })
        .onSuccess(a -> {

          webSocket.frameHandler(frame -> {
                if (frame.isPing()) {
                  log.info("Received ping");
                  webSocket.writePong(Buffer.buffer(0xA));
                  //webSocket.writeFrame(WebSocketFrame.pongFrame(Buffer.buffer(0xA)));
                } else {
                  // log.info("Received frame: {}", frame.textData());
                }
              })
              //.binaryMessageHandler(b -> log.info("Received binary {}", b.toString()))
              // .pongHandler(b -> log.info("Received pong {}", b.toString()))
              .drainHandler(v -> {
                log.info("Drain handler");
              }).textMessageHandler(message -> {
                //log.info("Received message: %s".formatted(message));
                msgHandlers.forEach(h -> h.handle(message));
              }).exceptionHandler(e -> {
                log.info("Closed by error", e);
                exceptionHandlers.forEach(h -> h.handle(e));
                restart(3);
              }).closeHandler(v -> {
                log.info("Closed");
                closeHandlers.forEach(h -> h.handle(null));
                restart(1);
              });

          sendHeartBeat();
          sendPending();
        })
        .onFailure(t -> {
          log.error("Failed to connect to websocket {}", url, t);
          restart(5);
        })
        .flatMap(w -> Future.succeededFuture());
  }


  private void sendPending() {
    if (webSocket != null) {
      while (!PENDING_MESSAGES.isEmpty()) {
        sendMessage(PENDING_MESSAGES.poll());
      }
    }
  }

  private void close() {
    if (client != null) {
      client.close();
      client = null;
      webSocket = null;
    }
    connecting.set(false);
  }

  private void restart(int delay) {
    close();
    log.info("Restarting in {} seconds", delay);
    vertx.setTimer(TimeUnit.SECONDS.toMillis(delay), l -> start());
  }

  public void sendHeartBeat() {
    if (webSocket != null) {
      //log.info("Sending ping");
      webSocket.writePing(Buffer.buffer(0x9));
      //webSocket.writeFrame(WebSocketFrame.pingFrame(Buffer.buffer(0x9)));
    }
  }

  public void sendMessage(String msg) {
    if (webSocket == null) {
      PENDING_MESSAGES.add(msg);
      log.info("WebSocket is not connected {}", msg);
      return;
    }
    if (msg.equals("{}")) {
      log.info("Invalid message: %s".formatted(msg));
    } else {
      //log.info("Sending message: %s".formatted(msg));
      webSocket.writeTextMessage(msg);
    }

  }
}
