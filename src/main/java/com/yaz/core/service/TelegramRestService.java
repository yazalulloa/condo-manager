package com.yaz.core.service;

import com.yaz.core.client.TelegramClient;
import com.yaz.core.client.TelegramClient.GetUpdatesRequest;
import com.yaz.core.client.TelegramClient.TelegramUpdateResponse;
import com.yaz.core.client.domain.telegram.ParseMode;
import com.yaz.core.client.domain.telegram.SendMessage;
import com.yaz.core.client.domain.telegram.TelegramUpdate;
import com.yaz.core.client.domain.telegram.WebHookRequest;
import com.yaz.core.util.RandomUtil;
import com.yaz.core.util.RxUtil;
import io.reactivex.rxjava3.core.Completable;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.net.URI;
import java.util.List;
import java.util.Objects;
import lombok.extern.slf4j.Slf4j;
import org.eclipse.microprofile.rest.client.inject.RestClient;

@Slf4j
@ApplicationScoped
public class TelegramRestService {

  private final TelegramClient client;

  @Inject
  public TelegramRestService(@RestClient TelegramClient client) {
    this.client = client;
  }

  public Uni<String> request(SendMessage sendMessage) {

    final var build = sendMessage.toBuilder()
        .parseMode(Objects.requireNonNullElse(sendMessage.parseMode(), ParseMode.HTML))
        .build();

    return client.sendMessage(build);
  }

  public Uni<String> sendMessage(long chatId, String text) {

    final var sendMessage = SendMessage.builder()
        .chatId(chatId)
        .text(text)
        .build();

    return request(sendMessage);
  }

  public Completable rxSendMessage(long chatId, String text) {
    return RxUtil.single(sendMessage(chatId, text)).ignoreElement();
  }

  public Uni<String> sendMessage(SendMessage sendMessage) {
    return request(sendMessage);
  }

  public Uni<String> setWebhook(String url) {
    final var webHookRequest = WebHookRequest.builder()
        .url(URI.create(url))
        .build();
    return client.setWebhook(webHookRequest);
  }

  public Uni<String> deleteWebhook() {
    return client.deleteWebhook(false);
  }

  public Uni<String> getWebhookInfo() {
    return client.getWebhookInfo();
  }

  public Uni<String> me() {
    return client.getMe();
  }

  public Uni<List<TelegramUpdate>> getUpdates(GetUpdatesRequest getUpdatesRequest) {
    return client.getUpdates(getUpdatesRequest)
        .map(TelegramUpdateResponse::result);
  }

  public Uni<List<TelegramUpdate>> getUpdates() {
    return getUpdates(new GetUpdatesRequest(null, null, null, null));
  }

  public Uni<List<TelegramUpdate>> getUpdates(Long offset) {
    return getUpdates(GetUpdatesRequest.builder()
        .offset(offset)
        .timeout(RandomUtil.randomInt(5, 20))
        .build());
  }
}
