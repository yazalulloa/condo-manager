package com.yaz.core.event;

import com.yaz.api.domain.response.ReceiptProgressUpdate;
import com.yaz.api.resource.ReceiptResource;
import com.yaz.api.resource.ReceiptResource.Templates;
import com.yaz.api.resource.fragments.Fragments;
import com.yaz.core.event.domain.BuildingDeleted;
import com.yaz.core.event.domain.EmailConfigDeleted;
import com.yaz.core.event.domain.ReceiptAptSent;
import com.yaz.core.event.domain.TelegramWebhookRequest;
import com.yaz.core.event.domain.UserDeleted;
import com.yaz.core.service.ServerSideEventHelper;
import com.yaz.core.service.TelegramCommandResolver;
import com.yaz.core.service.entity.BuildingService;
import com.yaz.core.service.entity.EmailConfigService;
import com.yaz.core.service.entity.ExtraChargeService;
import com.yaz.core.service.entity.NotificationEventService;
import com.yaz.core.service.entity.OidcDbTokenService;
import com.yaz.core.service.entity.ReserveFundService;
import com.yaz.core.service.entity.TelegramChatService;
import io.smallrye.mutiny.Uni;
import io.vertx.core.Vertx;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.ObservesAsync;
import jakarta.inject.Inject;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.nodes.Element;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class EventConsumer {

  private final Vertx vertx;
  private final BuildingService buildingService;
  private final ExtraChargeService extraChargeService;
  private final ReserveFundService reserveFundService;
  private final TelegramCommandResolver telegramCommandResolver;
  private final ServerSideEventHelper serverSideEventHelper;
  private final EmailConfigService emailConfigService;
  private final OidcDbTokenService tokenService;
  private final NotificationEventService notificationEventService;
  private final TelegramChatService telegramChatService;

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

  private static final String EVENT_NAME_RECEIPT_PROGRESS = "receipt-progress";

  public void receiptAptSent(@ObservesAsync ReceiptAptSent event) {
    final var clientId = event.clientId();

    if (event.finished()) {
      if (event.error() != null) {
        final var msg = Fragments.rateInfo(event.error()).render();
        serverSideEventHelper.sendEvent(clientId, EVENT_NAME_RECEIPT_PROGRESS, msg);
      }

      final var div = new Element("div").id("sse-receipt-progress-bar-" + clientId)
          .attr("hx-swap-oob", "true")
          .toString();

      serverSideEventHelper.sendEvent(clientId, EVENT_NAME_RECEIPT_PROGRESS, div);
      vertx.setTimer(TimeUnit.SECONDS.toMillis(1), l -> serverSideEventHelper.close(clientId));
      return;
    }

    if (event.item() != null) {
      final var msg = Templates.sentInfo(event.item()).render();
      serverSideEventHelper.sendEvent(clientId, EVENT_NAME_RECEIPT_PROGRESS, msg);
      return;
    }

    var left = "Enviando %s %s %s %s/%s".formatted(event.building(), event.month(), event.date(),
        event.counter(), event.size());
    var right = "";

    if (event.from() != null && event.to() != null && !event.to().isEmpty()) {
      right = "APT: %s %s %s -> %s".formatted(event.apt(), event.name(), event.from(), String.join(",", event.to()));

    }

    final var msg = ReceiptResource.Templates.progressUpdate(
            new ReceiptProgressUpdate(left, right, event.counter(), event.size()))
        .render();

    serverSideEventHelper.sendEvent(clientId, EVENT_NAME_RECEIPT_PROGRESS, msg);

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
}
