package com.yaz.core.event;

import com.yaz.core.event.domain.ReceiptAptSent;
import com.yaz.core.event.domain.TelegramWebhookRequest;
import com.yaz.core.event.domain.BuildingDeleted;
import com.yaz.core.event.domain.EmailConfigDeleted;
import com.yaz.api.resource.ReceiptResource.Templates;
import com.yaz.api.domain.response.ReceiptProgressUpdate;
import com.yaz.core.service.ServerSideEventHelper;
import com.yaz.core.service.TelegramCommandResolver;
import com.yaz.core.service.entity.BuildingService;
import com.yaz.core.service.entity.ExtraChargeService;
import com.yaz.core.service.entity.ReserveFundService;
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

  public void receiptAptSent(@ObservesAsync ReceiptAptSent event) {

    if (event.finished()) {
      final var div = new Element("div").id("progress-receipts")
          .attr("hx-swap-oob", "true")
          .toString();
      serverSideEventHelper.sendEvent(event.clientId(), "receipt-progress", div);
      vertx.setTimer(TimeUnit.SECONDS.toMillis(1), l -> serverSideEventHelper.close(event.clientId()));
    } else {

      var left = "Enviando %s %s %s %s/%s".formatted(event.building(), event.month(), event.date(),
          event.counter(), event.size());
      var right = "";

      if (event.from() != null && event.to() != null && !event.to().isEmpty()) {
        right = "%s %s -> %s".formatted(event.apt(), event.from(), String.join(",", event.to()));

      }

      final var msg = Templates.progressUpdate(
              new ReceiptProgressUpdate(left, right, event.counter(), event.size()))
          .render();

      serverSideEventHelper.sendEvent(event.clientId(), "receipt-progress", msg);
    }
  }
}
