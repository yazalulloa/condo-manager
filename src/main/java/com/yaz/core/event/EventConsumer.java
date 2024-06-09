package com.yaz.core.event;

import com.yaz.core.event.domain.BuildingDeleted;
import com.yaz.core.event.domain.EmailConfigDeleted;
import com.yaz.core.event.domain.TelegramWebhookRequest;
import com.yaz.core.event.domain.UserDeleted;
import com.yaz.core.service.TelegramCommandResolver;
import com.yaz.core.service.entity.BuildingService;
import com.yaz.core.service.entity.DebtService;
import com.yaz.core.service.entity.EmailConfigService;
import com.yaz.core.service.entity.ExpenseService;
import com.yaz.core.service.entity.ExtraChargeService;
import com.yaz.core.service.entity.NotificationEventService;
import com.yaz.core.service.entity.OidcDbTokenService;
import com.yaz.core.service.entity.ReserveFundService;
import com.yaz.core.service.entity.TelegramChatService;
import com.yaz.persistence.entities.Apartment;
import com.yaz.persistence.entities.Receipt;
import io.smallrye.mutiny.Uni;
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
  private final ReserveFundService reserveFundService;
  private final TelegramCommandResolver telegramCommandResolver;
  private final EmailConfigService emailConfigService;
  private final OidcDbTokenService tokenService;
  private final NotificationEventService notificationEventService;
  private final TelegramChatService telegramChatService;
  private final DebtService debtService;
  private final ExpenseService expenseService;

  public void emailConfigDeleted(@ObservesAsync EmailConfigDeleted task) {

    buildingService.updateEmailConfig(task.id())
        .subscribe()
        .with(
            i -> {
              log.info("Building email config: {} deleted: {}", task.id(), i);
            },
            e -> {
              log.error("ERROR deleting building email config: {}", task.id(), e);
            });

  }

  public void buildingDeleted(@ObservesAsync BuildingDeleted task) {
    log.info("buildingDeleted: {}", task);

    Uni.combine()
        .all()
        .unis(reserveFundService.deleteByBuilding(task.id()),
            extraChargeService.deleteByBuilding(task.id()))
        .with(Integer::sum)
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
              i -> {
              },
              e -> log.error("ERROR telegramMessageReceived: {}", task, e));
    } catch (Exception e) {
      log.error("telegramMessageReceived: {}", task, e);
    }

  }


  public void userDeleted(@ObservesAsync UserDeleted task) {
    final var userId = task.id();
    log.info("userDeleted: {}", task);

    Uni.join()
        .all(tokenService.deleteByUser(userId),
            emailConfigService.delete(userId),
            notificationEventService.deleteByUser(userId),
            telegramChatService.deleteByUser(userId))
        .andCollectFailures()
        .subscribe()
        .with(
            i -> {
              log.info("Deleting user data: {} deleted: {}", task.id(), i);
            },
            e -> {
              log.error("ERROR deleting user data: {}", task.id(), e);
            });

  }

  public void receiptDeleted(@ObservesAsync Receipt.Keys keys) {
    log.info("receiptDeleted: {}", keys);
    Uni.join()
        .all(extraChargeService.deleteByReceipt(keys.buildingId(), String.valueOf(keys.id())),
            debtService.deleteByReceipt(keys.buildingId(), keys.id()),
            expenseService.deleteByReceipt(keys.buildingId(), keys.id()))
        .andCollectFailures()
        .subscribe()
        .with(
            i -> log.info("Deleting receipt data: {} {} deleted: {}", keys.buildingId(), keys.id(), i),
            e -> log.error("ERROR deleting receipt data: {} {}", keys.buildingId(), keys.id(), e));

  }

  public void apartmentDeleted(@ObservesAsync Apartment.Keys keys) {
    log.info("apartmentDeleted: {}", keys);
    Uni.join()
        .all(debtService.deleteByApartment(keys.buildingId(), keys.number()),
            extraChargeService.deleteByApartment(keys.buildingId(), keys.number()))
        .andCollectFailures()
        .subscribe()
        .with(
            i -> {
              log.info("Deleting apartment data: {} {} deleted: {}", keys.buildingId(), keys.number(), i);
            },
            e -> {
              log.error("ERROR deleting apartment data: {} {}", keys.buildingId(), keys.number(), e);
            });
  }
}
