package com.yaz.persistence.repository.turso.client;

import io.quarkus.websockets.next.OnBinaryMessage;
import io.quarkus.websockets.next.OnClose;
import io.quarkus.websockets.next.OnOpen;
import io.quarkus.websockets.next.OnPongMessage;
import io.quarkus.websockets.next.OnTextMessage;
import io.quarkus.websockets.next.WebSocketClient;
import io.quarkus.websockets.next.WebSocketClientConnection;
import io.vertx.core.buffer.Buffer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@WebSocketClient(path = "/", clientId = TursoBean.CLIENT_ID)
@RequiredArgsConstructor
public class TursoWebSocketClient {


  private final TursoBean bean;

  @OnTextMessage
  public void onMessage(String message, WebSocketClientConnection connection) {
    log.debug("Received text message: {} {}", message, connection.id());
    bean.receivedMsg(message);
  }

  @OnBinaryMessage
  public void onMessage(Buffer buffer, WebSocketClientConnection connection) {
    log.debug("Received binary message: {} {}", buffer, connection.id());
  }

  @OnPongMessage
  public void onPong(Buffer buffer, WebSocketClientConnection connection) {
    log.debug("Received pong: {} {}", buffer, connection.id());
  }

  @OnOpen
  public void onOpen(WebSocketClientConnection connection) {
    log.debug("Connected to: {} {}", connection.clientId(), connection.id());
  }

  @OnClose
  public void onClose(WebSocketClientConnection connection) {
    log.debug("Disconnected from: {} {}", connection.clientId(), connection.id());
  }


}