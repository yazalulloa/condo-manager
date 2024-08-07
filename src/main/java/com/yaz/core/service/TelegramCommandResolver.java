package com.yaz.core.service;

import com.yaz.core.client.domain.telegram.CallbackQuery;
import com.yaz.core.client.domain.telegram.Chat;
import com.yaz.core.client.domain.telegram.TelegramMessage;
import com.yaz.core.client.domain.telegram.TelegramUpdate;
import com.yaz.core.client.domain.telegram.TelegramUser;
import com.yaz.core.event.domain.TelegramWebhookRequest;
import com.yaz.core.service.entity.RateService;
import com.yaz.core.service.entity.TelegramChatService;
import com.yaz.core.service.entity.UserService;
import com.yaz.core.util.ConvertUtil;
import com.yaz.core.util.DateUtil;
import com.yaz.core.util.SystemUtil;
import com.yaz.persistence.domain.Currency;
import com.yaz.persistence.entities.TelegramChat;
import io.smallrye.mutiny.Uni;
import io.vertx.core.json.Json;
import io.vertx.core.json.JsonObject;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.ObservesAsync;
import java.time.ZoneOffset;
import java.util.Objects;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor
public class TelegramCommandResolver {

  private static final String LAST_RATE_MSG = "TASA:%s%nFECHA: %s%nCREADO: %s%nID: %s";

  private final UserService userService;
  private final RateService rateService;
  private final TelegramChatService chatService;
  private final TelegramRestService restService;

  public void telegramMessageReceived(@ObservesAsync TelegramWebhookRequest task) {
    try {

      final var update = Json.decodeValue(task.body(), TelegramUpdate.class);
      resolve(update)
          .subscribe()
          .with(
              i -> {
              },
              e -> log.error("ERROR telegramMessageReceived: {}", task, e));
    } catch (Exception e) {
      log.error("telegramMessageReceived: {}", task, e);
    }

  }

  public Uni<Void> resolve(TelegramUpdate update) {

    return Uni.createFrom().deferred(() -> {
      log.debug("update: {}", update.updateId());

      return Uni.combine().all()
          .unis(command(update.message()), callbackQuery(update.callbackQuery()))
          .discardItems();
    });

  }

  public Uni<Void> command(TelegramMessage message) {

    if (message == null || message.entities() == null || message.entities().isEmpty()) {
      return Uni.createFrom().voidItem();
    }

    final var entitiesItem = message.entities().getFirst();
    if (!entitiesItem.type().equals("bot_command")) {
      return Uni.createFrom().voidItem();
    }

    final var text = message.text();
    final var from = message.from();
    final var chat = message.chat();


    if (text == null || from == null || chat == null) {
      return Uni.createFrom().voidItem();
    }

    final var chatId = chat.id();

    if (text.startsWith("/start") && text.length() > 8 && !from.isBot()) {
      final var formatUserId = text.substring(7).trim();
      final var userId = ConvertUtil.getUserId(formatUserId);

      return addAccount(userId, from, chat);
    }

    if (text.startsWith("/log")) {
      // return sendLogs.sendLogs(chatId, "logs");
    }

    if (text.startsWith("/system_info")) {
      return restService.sendMessage(chatId, SystemUtil.systemInfo().collect(Collectors.joining("\n")))
          .replaceWithVoid();
    }

    if (text.startsWith("/tasa")) {

      return rateService.lastUni(Currency.USD, Currency.VED)
          .map(opt -> opt.map(rate -> LAST_RATE_MSG.formatted(rate.rate(), rate.dateOfRate(),
                  DateUtil.formatVe(rate.createdAt().atZone(ZoneOffset.UTC)), rate.id()))
              .orElse("No hay tasa"))
          .flatMap(msg -> restService.sendMessage(chatId, msg))
          .replaceWithVoid();
    }

    if (text.startsWith("/backups")) {
      //  return sendEntityBackups.sendAvailableBackups(chatId);
    }

    if (true) {
      return restService.sendMessage(chatId, "Comando no reconocido")
          .replaceWithVoid();
    }

    return Uni.createFrom().voidItem();
  }

  public Uni<Void> callbackQuery(CallbackQuery callbackQuery) {
    if (callbackQuery == null) {
      return Uni.createFrom().voidItem();
    }

    //      if (callbackQuery.data().startsWith(TelegramSendEntityBackups.CALLBACK_KEY)) {
//        return sendEntityBackups.resolve(from.id(),
//            callbackQuery.data().replace(TelegramSendEntityBackups.CALLBACK_KEY, "").trim());
//      }

    return Uni.createFrom().voidItem();
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
