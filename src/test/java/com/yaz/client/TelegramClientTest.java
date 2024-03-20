package com.yaz.client;

import static org.junit.jupiter.api.Assertions.*;

import io.quarkus.test.junit.QuarkusTest;
import jakarta.inject.Inject;
import org.eclipse.microprofile.rest.client.inject.RestClient;
import org.junit.jupiter.api.Test;

@QuarkusTest
class TelegramClientTest {

  @RestClient
  TelegramClient client;


  @Test
  void me() {
    final var me = client.getMe().await().indefinitely();
    System.out.println(me);
  }

  @Test
  void webhookInfo() {
    final var webhookInfo = client.getWebhookInfo().await().indefinitely();
    System.out.println(webhookInfo);
  }

}