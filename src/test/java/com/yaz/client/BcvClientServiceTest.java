package com.yaz.client;

import static org.junit.jupiter.api.Assertions.*;

import io.quarkus.test.junit.QuarkusTest;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.Response;
import org.junit.jupiter.api.Test;

@QuarkusTest
class BcvClientServiceTest {

  @Inject
  BcvClientService service;
  @Test
  void head() {

    final var response = service.head().blockingGet();
    System.out.println();
    System.out.println("METADATA");
    response.getMetadata().forEach((k, v) -> System.out.println(k + " : " + v));

    System.out.println("\nHEADERS");
    response.getHeaders().forEach((k, v) -> System.out.println(k + " : " + v));

    assertEquals(200, response.getStatus());
  }

}