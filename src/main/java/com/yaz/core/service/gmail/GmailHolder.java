package com.yaz.core.service.gmail;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.services.gmail.Gmail;
import com.google.api.services.gmail.model.Message;
import io.micrometer.core.annotation.Timed;
import io.reactivex.rxjava3.core.Completable;
import io.reactivex.rxjava3.core.Single;
import io.reactivex.rxjava3.schedulers.Schedulers;
import io.vertx.core.AsyncResult;
import io.vertx.core.Handler;
import io.vertx.core.impl.VertxInternal;
import io.vertx.rxjava3.core.Vertx;
import java.io.IOException;
import java.util.Queue;
import java.util.concurrent.Callable;
import java.util.concurrent.ConcurrentLinkedDeque;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class GmailHolder {

  public static final long LOCK_TIMEOUT = 600_000;

  private final Queue<Waiter> waiters = new ConcurrentLinkedDeque<>();
  private final String userId;
  private final Vertx vertx;
  private final Credential credential;
  private final Gmail gmail;
  private boolean available = true;

  public GmailHolder(String userId, Vertx vertx, Credential credential, Gmail gmail) {
    this.userId = userId;
    this.vertx = vertx;
    this.credential = credential;
    this.gmail = gmail;
  }

  public String userId() {
    return userId;
  }

  public Credential credential() {
    return credential;
  }

//  public Message sendReceiptEmail(ReceiptEmailRequest emailRequest) throws MessagingException, IOException {
//    final var mimeMessage = MimeMessageUtil.createEmail(emailRequest);
//
//    final var messageWithEmail = GmailUtil.createMessageWithEmail(mimeMessage);
//    return sendMsg(messageWithEmail);
//  }

  public Single<Message> sendMsgAsync(Message content) {
    return lockAction(() -> sendMsg(content));
  }

//  public void sendMsgAsync(Message content, Handler<AsyncResult<Message>> handler) {
//    waiters.add(new Waiter(content, handler));
//    if (available) {
//      resolve();
//    }
//  }
//
//  private void resolve() {
//    final var waiter = waiters.poll();
//    if (waiter != null) {
//      available = false;
//      vertx.executeBlocking(() -> sendMsg(waiter.message()))
//          .subscribeOn(Schedulers.io())
//          .doAfterTerminate(this::resolve)
//          .subscribe(
//              message -> waiter.handler().handle(Future.succeededFuture(message)),
//              error -> waiter.handler().handle(Future.failedFuture(error)));
//    } else {
//      available = true;
//    }
//  }

  @Timed(value = "gmail.send-msg", description = "[Gmail] A measure of how long it takes to send a message")
  Message sendMsg(Message content) throws IOException {
    return gmail.users().messages().send("me", content).execute();
  }

  private <T> Single<T> lockAction(Callable<T> callable) {
    final var scheduler = Schedulers.from(((VertxInternal) vertx.getDelegate()).getEventLoopGroup());
    return vertx.sharedData().getLocalLockWithTimeout(userId(), LOCK_TIMEOUT)
        .flatMap(lock -> {

          return vertx.executeBlocking(callable)
              .subscribeOn(Schedulers.io())
              .observeOn(scheduler)
              .toSingle()
              .doAfterTerminate(lock::release);
        })
        .subscribeOn(scheduler);
  }

  public Completable test() {
    return lockAction(() -> gmail.users().labels().list("me").execute().getLabels())
        .ignoreElement();
  }

  private record Waiter(Message message, Handler<AsyncResult<Message>> handler) {

  }
}
