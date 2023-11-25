package com.yaz.service;

import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.Objects;
import lombok.extern.slf4j.Slf4j;
import com.yaz.client.TelegramClient;
import com.yaz.client.domain.telegram.ParseMode;
import com.yaz.client.domain.telegram.SendMessage;
import com.yaz.client.domain.telegram.TelegramMessage;
import org.eclipse.microprofile.rest.client.inject.RestClient;

@Slf4j
@ApplicationScoped
public class TelegramRestService {

  private final TelegramClient client;

  @Inject
  public TelegramRestService(@RestClient TelegramClient client) {
    this.client = client;
  }

  public Uni<TelegramMessage> request(SendMessage sendMessage) {

    final var build = sendMessage.toBuilder()
        .parseMode(Objects.requireNonNullElse(sendMessage.parseMode(), ParseMode.HTML))
        .build();

    return client.sendMessage(build);
  }

  public Uni<TelegramMessage>  sendMessage(long chatId, String text) {

    final var sendMessage = SendMessage.builder()
        .chatId(chatId)
        .text(text)
        .build();

    return request(sendMessage);
  }

  public Uni<TelegramMessage> sendMessage(SendMessage sendMessage) {
    return request(sendMessage);
  }

  /*public Single<HttpClientResponse> editMessageText(EditMessageText editMessageText) {
    return vertxHandler.get(TelegramVerticle.EDIT_MESSAGE_TEXT, editMessageText);

      *//*  return HttpUtil.single(this.editMessageText, webTarget -> webTarget.request(MediaType.APPLICATION_JSON_TYPE)
                .post(Entity.json(editMessageText)));*//*
  }

  public Single<HttpClientResponse> getWebhookInfo() {
    return vertxHandler.get(TelegramVerticle.GET_WEBHOOK_INFO);
  }

  public Single<HttpClientResponse> deleteWebhook() {
    return vertxHandler.get(TelegramVerticle.DELETE_WEBHOOK);
  }

  public Single<HttpClientResponse> setDefaultWebhook() {
    return vertxHandler.get(TelegramVerticle.SET_DEFAULT_WEBHOOK);
  }

  public Single<HttpClientResponse> sendDocument(long chatId, String caption, FileResponse fileResponse) {
    return sendDocument(chatId, caption, fileResponse.fileName(), fileResponse.path(), fileResponse.contentType());
  }

  public Single<HttpClientResponse> sendDocument(long chatId, String caption, String fileName, String path,
      String mediaType) {

    final var multipartForm = MultipartForm.create()
        .binaryFileUpload("document",
            fileName,
            path,
            mediaType);

    return sendDocument(chatId, caption, multipartForm);
  }

  public Single<HttpClientResponse> sendDocument(long chatId, String caption, MultipartForm multipartForm) {
    final var sendDocument = SendDocument.builder()
        .chatId(chatId)
        .caption(caption)
        .multipartForm(multipartForm)
        .build();

    return sendDocument(sendDocument);
  }

  public Single<HttpClientResponse> sendDocument(SendDocument sendDocument) {
    return vertxHandler.get(TelegramVerticle.SEND_DOCUMENT, sendDocument);

  }*/
}
