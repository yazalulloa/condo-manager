package com.yaz.event;

import com.yaz.event.domain.BuildingDeleted;
import com.yaz.event.domain.EmailConfigDeleted;
import com.yaz.event.domain.TelegramWebhookRequest;
import com.yaz.service.BuildingService;
import com.yaz.service.ExtraChargeService;
import com.yaz.service.TelegramCommandResolver;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.ObservesAsync;
import jakarta.inject.Inject;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class EventConsumer {


  private final BuildingService buildingService;
  private final ExtraChargeService extraChargeService;
  private final TelegramCommandResolver telegramCommandResolver;

  public void emailConfigDeleted(@ObservesAsync EmailConfigDeleted task) {
    log.info("emailConfigDeleted: {}", task);
    buildingService.delete(task.id())
        .subscribe()
        .with(
            i -> {
              log.info("BuildingDeleted: {} deleted: {}", task.id(), i);
            },
            e -> {
              log.error("ERROR deleting building BuildingDeleted: {}", task.id(), e);
            });

  }

  public void buildingDeleted(@ObservesAsync BuildingDeleted task) {
    log.info("buildingDeleted: {}", task);

    extraChargeService.deleteByBuilding(task.id())
        .subscribe()
        .with(
            i -> {
              log.info("Deleting extra charges: {} deleted: {}", task.id(), i);
            },
            e -> {
              log.error("ERROR deleting extra charge BuildingDeleted: {}", task.id(), e);
            });
  }

  public void telegramMessageReceived(@ObservesAsync TelegramWebhookRequest task) {
    try {

      telegramCommandResolver.resolve(task)
          .subscribe()
          .with(
              i -> {},
              e -> log.error("ERROR telegramMessageReceived: {}", task, e));
    } catch (Exception e) {
      log.error("telegramMessageReceived: {}", task, e);
    }

  }
}
