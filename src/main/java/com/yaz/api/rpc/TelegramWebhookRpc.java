package com.yaz.api.rpc;

import com.yaz.core.event.domain.TelegramWebhookRequest;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.handler.BodyHandler;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Event;
import jakarta.enterprise.event.Observes;
import jakarta.inject.Inject;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.eclipse.microprofile.config.inject.ConfigProperty;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class TelegramWebhookRpc {

  private final Event<TelegramWebhookRequest> requestEvent;

  @ConfigProperty(name = "app.telegram.webhook.url")
  String path;

  public void init(@Observes Router router) {
    if (path != null) {

      router.post(path + "/msg")
          .handler(BodyHandler.create())
          .handler(rc -> {
            final var headers = rc.request().headers();
            final var body = rc.body().asString();
            rc.response().end();
            final var request = new TelegramWebhookRequest(headers, body);
            requestEvent.fireAsync(request);
          });
    }
  }
}
