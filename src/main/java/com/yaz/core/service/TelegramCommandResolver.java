package com.yaz.core.service;

import com.yaz.core.client.domain.telegram.Chat;
import com.yaz.core.client.domain.telegram.TelegramUpdate;
import com.yaz.core.client.domain.telegram.TelegramUser;
import com.yaz.core.service.entity.TelegramChatService;
import com.yaz.core.service.entity.UserService;
import com.yaz.core.util.ConvertUtil;
import com.yaz.core.event.domain.TelegramWebhookRequest;
import com.yaz.persistence.entities.TelegramChat;
import io.smallrye.mutiny.Uni;
import io.vertx.core.json.Json;
import io.vertx.core.json.JsonObject;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class TelegramCommandResolver {

  private final UserService userService;
  private final TelegramChatService chatService;
  private final TelegramRestService restService;

  public Uni<Void> resolve(TelegramWebhookRequest webhookRequest) {

    return Uni.createFrom().deferred(() -> {

      final var update = Json.decodeValue(webhookRequest.body(), TelegramUpdate.class);

      final var message = update.message();
      if (message != null) {
        final var text = message.text();
        final var from = message.from();
        final var chat = message.chat();

        if (text != null && from != null) {

          if (text.startsWith("/start") && text.length() > 8 && !from.isBot() && chat != null) {
            final var formatUserId = text.substring(7).trim();
            final var userId = ConvertUtil.getUserId(formatUserId);

            log.info("formatUserId: {} userId: {}", formatUserId, userId);
            return addAccount(userId, from, chat);
          }

          if (text.startsWith("/log")) {
            // return sendLogs.sendLogs(chatId, "logs");
          }

          if (text.startsWith("/system_info")) {
//          return telegramRestApi.sendMessage(chatId, SystemUtil.systemInfo().collect(Collectors.joining("\n")))
//              .ignoreElement();
          }

          if (text.startsWith("/tasa")) {

//          return rateService.last(Currency.USD, Currency.VED)
//              .toSingle()
//              .map(rate -> "TASA:%s\nFECHA: %s\nCREADO: %s\nID: %s".formatted(rate.rate(), rate.dateOfRate(),
//                  DateUtil.formatVe(rate.createdAt()), rate.id()))
//              .flatMap(msg -> telegramRestApi.sendMessage(chatId, msg))
//              .ignoreElement();
          }

          if (text.startsWith("/backups")) {
            //  return sendEntityBackups.sendAvailableBackups(chatId);
          }
        }
      }

      final var callbackQuery = update.callbackQuery();

      if (callbackQuery != null) {
        final var from = callbackQuery.from();
//      if (callbackQuery.data().startsWith(TelegramSendEntityBackups.CALLBACK_KEY)) {
//        return sendEntityBackups.resolve(from.id(),
//            callbackQuery.data().replace(TelegramSendEntityBackups.CALLBACK_KEY, "").trim());
//      }

      }

      return Uni.createFrom().voidItem();
    });

  }


  private Uni<Void> sendMessage(long chatId, String msg) {
    return restService.sendMessage(chatId, msg)
        .replaceWithVoid();
  }

  private Uni<Void> addAccount(String userId, TelegramUser from, Chat chat) {
    final var chatId = from.id();

    final var existsUni = userService.exists(userId);
    final var userUni = chatService.read(userId, chatId);

    return Uni.combine()
        .all()
        .unis(existsUni, userUni)
        .withUni((userExists, chatMaybe) -> {
          if (userExists) {

            final var data = new JsonObject()
                .put("from", new JsonObject(Json.encode(from)))
                .put("chat", new JsonObject(Json.encode(chat)));

            final var telegramChat = TelegramChat.builder()
                .userId(userId)
                .chatId(chatId)
                .firstName(from.firstName())
                .lastName(from.lastName())
                .username(from.username())
                .data(data)
                .build();

            if (chatMaybe.isEmpty()) {
              return chatService.save(telegramChat)
                  .replaceWith(sendMessage(chatId, "Chat guardado"));
            }

            return Uni.createFrom().deferred(() -> {
                  final var oldChat = chatMaybe.get();

                  final var equalsCheck = Objects.equals(telegramChat.firstName(), oldChat.firstName())
                      && Objects.equals(telegramChat.lastName(), oldChat.lastName())
                      && Objects.equals(telegramChat.username(), oldChat.username())
                      && Objects.equals(telegramChat.data(), oldChat.data());

                  if (!equalsCheck) {
                    return chatService.update(telegramChat).replaceWithVoid();
                  }

                  return Uni.createFrom().voidItem();
                })
                .replaceWith(sendMessage(chatId, "Cuenta ya enlazada"));
          }

          return restService.sendMessage(chatId, "Usuario no encontrado")
              .replaceWithVoid();

        });
  }
}
