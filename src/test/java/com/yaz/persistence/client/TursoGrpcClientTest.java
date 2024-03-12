package com.yaz.persistence.client;

import static org.junit.jupiter.api.Assertions.*;

import com.yaz.condo.manager.grpc.hrana.ws.ServerMsg;
import io.quarkus.test.junit.QuarkusTest;
import jakarta.inject.Inject;
import org.junit.jupiter.api.Test;

@QuarkusTest
class TursoGrpcClientTest {

  @Inject
  TursoGrpcClient client;
  @Test
  void hello() {

    final var serverMsg = client.hello("jwt").toUni().await().indefinitely();

    System.out.println(serverMsg);

  }

}