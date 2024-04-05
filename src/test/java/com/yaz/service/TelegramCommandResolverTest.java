package com.yaz.service;

import com.yaz.core.service.TelegramCommandResolver;
import com.yaz.core.event.domain.TelegramWebhookRequest;
import io.quarkus.test.junit.QuarkusTest;
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
    final var aVoid = resolver.resolve(new TelegramWebhookRequest(null, json)).await().indefinitely();
    System.out.println(aVoid);
  }
}