package com.yaz.event;

import com.yaz.client.domain.telegram.TelegramUpdate;
import com.yaz.event.domain.EmailConfigDeleted;
import com.yaz.event.domain.TelegramWebhookRequest;
import com.yaz.service.BuildingService;
import com.yaz.service.UserService;
import io.vertx.core.json.Json;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.ObservesAsync;
import jakarta.inject.Inject;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class EventConsumer {


  private final BuildingService service;
  private final UserService userService;

  public void emailConfigDeleted(@ObservesAsync EmailConfigDeleted task) {
    log.info("emailConfigDeleted: {}", task);
    service.updateEmailConfig(task.id())
        .subscribe()
        .with(
            i -> {
              log.info("EmailConfigDeleted: {} updated: {}", task.id(), i);
            },
            e -> {
              log.error("ERROR updating building EmailConfigDeleted: {}", task.id(), e);
            });

  }

  public void telegramMessageReceived(@ObservesAsync TelegramWebhookRequest task) {
    try {
      final var telegramUpdate = Json.decodeValue(task.body(), TelegramUpdate.class);
      log.info("telegramUpdate: {}", telegramUpdate);
    } catch (Exception e) {
      log.error("telegramMessageReceived: {}", task, e);
    }

  }
}
