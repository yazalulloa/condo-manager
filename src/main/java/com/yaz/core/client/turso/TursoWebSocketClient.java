//package com.yaz.core.client.turso;
//
//import com.yaz.persistence.repository.turso.client.TursoJsonMapper;
//import com.yaz.persistence.repository.turso.client.ws.request.HelloMsg;
//import io.quarkus.websockets.next.WebSocketClientConnection;
//import io.quarkus.websockets.next.WebSocketConnector;
//import jakarta.inject.Inject;
//import jakarta.inject.Singleton;
//import java.net.URI;
//import lombok.extern.slf4j.Slf4j;
//import org.eclipse.microprofile.config.inject.ConfigProperty;
//
//@Slf4j
//@Singleton
//public class TursoWebSocketClient {
//
//  @ConfigProperty(name = "quarkus.rest-client.turso-db.url")
//  String url;
//  @ConfigProperty(name = "app.turso-jwt")
//  String jwt;
//
//  @Inject
//  TursoJsonMapper mapper;
//
//  @Inject
//  WebSocketConnector<TursoWebSocketClientEndpoint> connector;
//
//  void openAndSendMessage() {
//    log.info("connecting");
//    final var helloMsg = HelloMsg.create(jwt);
//    mapper.toJson(helloMsg);
//    WebSocketClientConnection connection = connector
//        .baseUri(URI.create(url.replace("https://", "")))
//        .connectAndAwait();
//    connection.sendTextAndAwait(helloMsg);
//    log.info("connected");
//
//  }
//}
