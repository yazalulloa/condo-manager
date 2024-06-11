package com.yaz.service;

import com.yaz.core.client.domain.telegram.TelegramUpdate;
import com.yaz.core.service.TelegramCommandResolver;
import com.yaz.core.event.domain.TelegramWebhookRequest;
import io.quarkus.test.junit.QuarkusTest;
import io.vertx.core.json.Json;
import jakarta.inject.Inject;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import org.junit.jupiter.api.Test;

@QuarkusTest
class TelegramCommandResolverTest {

  @Inject
  TelegramCommandResolver resolver;

  @Test
  void test() throws IOException {
    final var json = Files.readString(Paths.get("test.json"));
    final var webhookRequest = new TelegramWebhookRequest(null, json);
    final var update = Json.decodeValue(webhookRequest.body(), TelegramUpdate.class);
    final var aVoid = resolver.resolve(update).await().indefinitely();
    System.out.println(aVoid);
  }
}