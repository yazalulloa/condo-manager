package com.yaz.client;

import com.yaz.core.client.TelegramClient;
import com.yaz.core.service.TelegramRestService;
import io.quarkus.test.junit.QuarkusTest;
import io.vertx.core.json.Json;
import io.vertx.core.json.JsonObject;
import jakarta.inject.Inject;
import org.eclipse.microprofile.rest.client.inject.RestClient;
import org.junit.jupiter.api.Test;

@QuarkusTest
class TelegramClientTest {

  @RestClient
  TelegramClient client;
  @Inject
  TelegramRestService restService;


  @Test
  void me() {
    final var me = restService.me().await().indefinitely();
    System.out.println(me);
  }

  @Test
  void webhookInfo() {
    final var webhookInfo = restService.getWebhookInfo().await().indefinitely();
    System.out.println(webhookInfo);
  }

  @Test
  void deleteWebhook() {
    final var deleteWebhook = restService.deleteWebhook().await().indefinitely();
    System.out.println(deleteWebhook);
  }

  @Test
  void getUpdates() {
    final var getUpdates = restService.getUpdates().await().indefinitely();
    getUpdates.forEach(update -> {
      System.out.println(Json.encode(update));
    });

  }

  @Test
  void getUpdatesStr() {
    final var getUpdates = client.getUpdatesStr().await().indefinitely();
    System.out.println(new JsonObject(getUpdates).encodePrettily());
  }

}