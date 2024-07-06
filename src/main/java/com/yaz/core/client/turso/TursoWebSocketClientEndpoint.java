//package com.yaz.core.client.turso;

//import io.quarkus.websockets.next.OnBinaryMessage;
//import io.quarkus.websockets.next.OnOpen;
//import io.quarkus.websockets.next.OnPongMessage;
//import io.quarkus.websockets.next.OnTextMessage;
//import io.quarkus.websockets.next.WebSocketClient;
//import io.quarkus.websockets.next.WebSocketClientConnection;
//import io.vertx.core.buffer.Buffer;
//import lombok.extern.slf4j.Slf4j;
//
//@Slf4j
//@WebSocketClient(path = "")
//public class TursoWebSocketClientEndpoint {
//
//  @OnTextMessage
//  void onMessage(String message, WebSocketClientConnection connection) {
//    log.info("Received message: {}", message);
//  }
//
//  @OnBinaryMessage
//  void onMessage(Buffer message, WebSocketClientConnection connection) {
//    log.info("Received message: {}", message);
//  }
//
//  @OnPongMessage
//  void onPong(Buffer message, WebSocketClientConnection connection) {
//    log.info("Received pong: {}", message);
//  }
//
//  @OnOpen
//  void onOpen(WebSocketClientConnection connection) {
//    log.info("Connected");
//  }
//
//}
