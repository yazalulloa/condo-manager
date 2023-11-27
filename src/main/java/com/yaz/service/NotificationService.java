package com.yaz.service;

import com.yaz.domain.NotificationEvent;
import com.yaz.util.EnvUtil;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import lombok.extern.slf4j.Slf4j;
import org.eclipse.microprofile.config.inject.ConfigProperty;


@Slf4j
@ApplicationScoped
public class NotificationService {


  private final TelegramRestService restService;
  private final boolean enabled;

  @Inject
  public NotificationService(TelegramRestService restService,
      @ConfigProperty(name = "app.notifications.enabled", defaultValue = "true") boolean enabled) {
    this.restService = restService;
    this.enabled = enabled;
  }
  //private final SendLogs sendLogs;
  //private final TelegramChatService chatService;
//  private final TranslationProvider translationProvider;

  public void sendAppStartup() {
    final var event = NotificationEvent.APP_STARTUP;
    final var msg = event.name();//translationProvider.translate(event.name());
    final var string = EnvUtil.addEnvInfo(msg, false);

    if (enabled) {
      restService.sendMessage(475635800, string)
          .subscribe()
          .with(
              telegramMessage -> log.info("TELEGRAM_MESSAGE {}", telegramMessage),
              throwable -> log.error("TELEGRAM_ERROR", throwable));
    }

    //return blocking(send(EnvUtil.addEnvInfo(msg, false), event));
  }

 /* private Completable sendNotification(Set<NotificationEvent> set, Function<Long, Completable> function) {
    return chatService.chatsByEvents(set)
        .filter(s -> !s.isEmpty())
        .flatMapObservable(Observable::fromIterable)
        .map(function::apply)
        .toList()
        .toFlowable()
        .flatMapCompletable(Completable::merge);
  }

  public Completable sendNewRate(String msg) {
    return send(EnvUtil.addEnvInfo(msg), NotificationEvent.NEW_RATE);
  }

  public Completable send(String msg, NotificationEvent event) {
    return sendNotification(Set.of(event), chat -> restService.sendMessage(chat, msg).ignoreElement());
  }*/

 /* private boolean blocking(Completable completable) {
    return completable
        .blockingAwait(10, TimeUnit.SECONDS);
  }*/

  /*public Completable sendLogs(long chatId, String caption) {
    return sendLogs.sendLogs(chatId, caption);
  }

  public boolean sendShuttingDownApp() {
    final var event = NotificationEvent.APP_SHUTTING_DOWN;
    final var caption = event.name();//translationProvider.translate(event.name());
    return blocking(sendNotification(Set.of(event), chat -> sendLogs(chat, EnvUtil.addEnvInfo(caption))));
  }*/
}
