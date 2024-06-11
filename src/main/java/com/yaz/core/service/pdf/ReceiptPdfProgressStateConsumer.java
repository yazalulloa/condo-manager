package com.yaz.core.service.pdf;

import com.yaz.api.domain.response.ReceiptProgressUpdate;
import com.yaz.api.resource.ReceiptResource;
import com.yaz.api.resource.ReceiptResource.Templates;
import com.yaz.api.resource.fragments.Fragments;
import com.yaz.core.event.domain.ReceiptAptSent;
import com.yaz.core.service.ServerSideEventHelper;
import io.vertx.core.Vertx;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.ObservesAsync;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.nodes.Element;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor
public class ReceiptPdfProgressStateConsumer {

  private static final String EVENT_NAME_RECEIPT_PROGRESS = "receipt-progress";

  private final Vertx vertx;
  private final ServerSideEventHelper sseHelper;

  public void consume(@ObservesAsync ReceiptPdfProgressState state) {
    log.debug("Consuming state: {}", state);

    final var left = state.apt().equals(state.name()) ? state.apt() : state.apt() + " " + state.name();
    final var right = "%s/%s".formatted(state.counter(), state.totalSize());

    ReceiptResource.Templates.progressUpdate(new ReceiptProgressUpdate(left, right, state.counter(), state.totalSize()))
        .createUni()
        .subscribe()
        .with(
            html -> sendReceiptProgress(html, state.clientId()),
            e -> log.error("Error sending receipt pdf apt info", e));
  }

  public void receiptAptSent(@ObservesAsync ReceiptAptSent event) {
    final var clientId = event.clientId();

    if (event.finished()) {
      if (event.error() != null) {
        Fragments.rateInfo(event.error())
            .createUni()
            .subscribe()
            .with(
                html -> sendReceiptProgress(html, clientId),
                e -> log.error("Error sending receipt apt error", e));
      }

      final var div = new Element("div").id("sse-receipt-progress-bar-" + clientId)
          .attr("hx-swap-oob", "true")
          .toString();
      sendReceiptProgress(div, clientId);
      vertx.setTimer(TimeUnit.SECONDS.toMillis(1), l -> sseHelper.close(clientId));
      return;
    }

    if (event.item() != null) {
      Templates.sentInfo(event.item()).createUni()
          .subscribe()
          .with(
              html -> sendReceiptProgress(html, clientId),
              e -> log.error("Error sending receipt apt info", e));
      return;
    }

    var left = "Enviando %s %s %s %s/%s".formatted(event.building(), event.month(), event.date(),
        event.counter(), event.size());
    var right = "";

    if (event.from() != null && event.to() != null && !event.to().isEmpty()) {
      right = "APT: %s %s %s -> %s".formatted(event.apt(), event.name(), event.from(), String.join(",", event.to()));
    }

    ReceiptResource.Templates.progressUpdate(new ReceiptProgressUpdate(left, right, event.counter(), event.size()))
        .createUni()
        .subscribe()
        .with(
            html -> sendReceiptProgress(html, clientId),
            e -> log.error("Error sending receipt apt info", e));

  }

  public void sendReceiptProgress(String html, String clientId) {
    if (clientId != null) {
      sseHelper.sendEvent(clientId, EVENT_NAME_RECEIPT_PROGRESS, html);
    }
  }
}
