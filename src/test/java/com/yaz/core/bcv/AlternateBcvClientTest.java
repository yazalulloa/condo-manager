package com.yaz.core.bcv;

import static org.junit.jupiter.api.Assertions.*;

import io.quarkus.test.junit.QuarkusTest;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.Response;
import org.junit.jupiter.api.Test;

@QuarkusTest
class AlternateBcvClientTest {

  @Inject
  AlternateBcvClient alternateBcvClient;

  @Test
  void testGet() {
    final var response = alternateBcvClient.get().blockingGet();
    System.out.println(response.getStatus());
    assertEquals(Response.Status.OK.getStatusCode(), response.getStatus());
  }

}