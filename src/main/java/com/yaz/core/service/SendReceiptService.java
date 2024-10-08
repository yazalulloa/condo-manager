package com.yaz.core.service;

import com.yaz.api.domain.response.EmailConfigTableItem;
import com.yaz.api.domain.response.ReceiptTableItem;
import com.yaz.api.resource.ReceiptResource.SendReceiptRequest;
import com.yaz.core.event.domain.ReceiptAptSent;
import com.yaz.core.helper.VertxHelper;
import com.yaz.core.service.entity.ReceiptService;
import com.yaz.core.service.gmail.GmailHelper;
import com.yaz.core.service.gmail.GmailService;
import com.yaz.core.service.gmail.GmailUtil;
import com.yaz.core.service.gmail.MimeMessageUtil;
import com.yaz.core.service.gmail.domain.GmailConfig;
import com.yaz.core.service.gmail.domain.ReceiptEmailRequest;
import com.yaz.core.service.pdf.ReceiptPdfService;
import com.yaz.core.util.DateUtil;
import com.yaz.core.util.RxUtil;
import com.yaz.core.util.rx.RetryWithDelay;
import com.yaz.persistence.entities.Receipt;
import com.yaz.persistence.entities.Receipt.Keys;
import io.reactivex.rxjava3.core.Completable;
import io.reactivex.rxjava3.core.Maybe;
import io.reactivex.rxjava3.core.Single;
import io.reactivex.rxjava3.schedulers.Schedulers;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Event;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor
public class SendReceiptService {

  private final ReceiptPdfService pdfService;
  private final ReceiptService receiptService;
  private final GmailService gmailService;
  private final GmailConfig gmailConfig;
  private final GmailHelper gmailHelper;
  private final TranslationProvider translationProvider;
  private final Event<ReceiptAptSent> receiptAptSentEvent;
  private final VertxHelper vertxHelper;


  public Completable sendReceipts(Keys keys, String clientId, SendReceiptRequest request) {
    return sendReceipts(keys, request.getKey(), clientId, request.getSubject(), request.getMsg(), request.getApts());
  }

  public Completable sendReceipts(Receipt.Keys keys, String key, String clientId) {
    return sendReceipts(keys, key, clientId, null, null, null);
  }

  public Completable sendReceipts(Receipt.Keys keys, String key, String clientId, String subjectParam, String msgParam,
      Set<String> apts) {

    return pdfService.pdfs(keys.buildingId(), keys.id(), apts)
        .flatMap(response -> {
          final var receipt = response.receipt();
          final var emailConfigId = receipt.emailConfigId();

          if (emailConfigId == null) {
            return Single.error(new IllegalArgumentException("Email config not set in building"));
          }

          return gmailService.loadItem(receipt.emailConfigId())
              .map(EmailConfigTableItem::item)
              .flatMap(emailConfig -> {

                if (emailConfig.stacktrace() != null) {
                  return Maybe.error(new IllegalArgumentException("Email config error: " + emailConfig.stacktrace()));
                }

                return Maybe.just(emailConfig);
              })
              .switchIfEmpty(Single.error(new IllegalArgumentException("Email config not found")))
              .map(emailConfig -> {
                final var subject = Optional.ofNullable(subjectParam)
                    .orElse("AVISO DE COBRO") + " %s %s Adm. %s APT: %s";

                final var month = translationProvider.translate(receipt.month().name());

                final var gmail = gmailHelper.gmail(emailConfig.id());

                AtomicInteger counter = new AtomicInteger();

                final var receiptAptSent = ReceiptAptSent.builder()
                    .clientId(clientId)
                    .counter(counter.get())
                    .size(response.pdfItems().size() - 1)
                    .building(receipt.building().id())
                    .month(month)
                    .date(receipt.date().toString())
                    .apt("")
                    .build();

                receiptAptSentEvent.fireAsync(receiptAptSent);

                return response.pdfItems()
                    .stream()
                    .map(item -> Single.defer(() -> {
                          if (item.emails() == null || item.emails().isEmpty()) {
                            return Single.just("");
                          }

                          final var emailRequest = ReceiptEmailRequest.builder()
                              .from(emailConfig.email())
                              .to(gmailConfig.useAlternativeReceiptTo() ? gmailConfig.receiptTo() : item.emails())
                              .subject(subject.formatted(month, receipt.year(), receipt.building().name(), item.id()))
                              .text(Optional.ofNullable(msgParam).orElse("AVISO DE COBRO"))
                              .files(Set.of(item.path().toString()))
                              .build();

                          final var mimeMessage = MimeMessageUtil.createEmail(emailRequest);

                          final var messageWithEmail = GmailUtil.createMessageWithEmail(mimeMessage);

                          return gmail.sendMsgAsync(messageWithEmail)
                              //vertxHelper.<Message>single(handler -> gmail.sendMsgAsync(messageWithEmail, handler))
                              .doOnSuccess(msg -> {
                                receiptAptSentEvent.fireAsync(receiptAptSent.toBuilder()
                                    .counter(counter.incrementAndGet())
                                    .from(emailRequest.from())
                                    .to(emailRequest.to())
                                    .apt(item.id())
                                    .name(item.name())
                                    .build());
                              });
                        })
                        .retryWhen(RetryWithDelay.retry(10, 1, TimeUnit.SECONDS, t -> {
                          log.error("Error sending email: ", t);
                          return true;
                        }))
                        .subscribeOn(Schedulers.io()))
                    .toList();
              })
              .toFlowable()
              .flatMap(Single::concat)
              .toList()
              .flatMap(list -> {
                final var lastSent = DateUtil.utcLocalDateTime();
                final var item = ReceiptTableItem.builder()
                    .key(key)
                    .item(receipt.receipt().toBuilder()
                        .sent(true)
                        .lastSent(lastSent)
                        .build())
                    .cardId(keys.cardId())
                    .sentInfoOutOfBounds(true)
                    .build();

                receiptAptSentEvent.fireAsync(ReceiptAptSent.item(clientId, item));

                return RxUtil.single(receiptService.updateLastSent(receipt.id(), lastSent));
              });
        })
        .delay(1, TimeUnit.SECONDS) // wait for last event
        .doOnSuccess(l -> receiptAptSentEvent.fireAsync(ReceiptAptSent.finished(clientId)))
        .onErrorResumeNext(throwable -> {

          final var finished = ReceiptAptSent.finished(clientId, throwable.getMessage());

          return Completable.complete()
              .delay(2, TimeUnit.SECONDS)
              .andThen(Completable.fromAction(() -> receiptAptSentEvent.fireAsync(finished)))
              .andThen(Single.error(throwable));
        })
        .ignoreElement();

  }

  public Completable sendZip(String buildingId, long receiptId, Set<String> emails) {
    return pdfService.zipResponse(buildingId, receiptId)
        .flatMap(zipResponse -> {
          final var receipt = zipResponse.receipt();

          if (receipt.emailConfigId() == null) {
            return Single.error(new IllegalArgumentException("Email config not set in building"));
          }

          return gmailService.loadItem(receipt.emailConfigId())
              .map(EmailConfigTableItem::item)
              .flatMap(emailConfig -> {

                if (emailConfig.stacktrace() != null) {
                  return Maybe.error(new IllegalArgumentException("Email config error: " + emailConfig.stacktrace()));
                }

                return Maybe.just(emailConfig);
              })
              .switchIfEmpty(Single.error(new IllegalArgumentException("Email config not found")))
              .flatMap(emailConfig -> {
                final var subject = "AVISO DE COBRO %s %s Adm. %s";

                final var month = translationProvider.translate(receipt.month().name());
                final var emailRequest = ReceiptEmailRequest.builder()
                    .from(emailConfig.email())
                    .to(emails)
                    .subject(subject.formatted(month, receipt.year(), receipt.building().name()))
                    .text("AVISO DE COBRO")
                    .files(Set.of(zipResponse.fileResponse().path().toString()))
                    .build();
                final var mimeMessage = MimeMessageUtil.createEmail(emailRequest);

                final var gmail = gmailHelper.gmail(emailConfig.id());
                final var messageWithEmail = GmailUtil.createMessageWithEmail(mimeMessage);

                return gmail.sendMsgAsync(messageWithEmail)
                    //vertxHelper.<Message>single(handler -> gmail.sendMsgAsync(messageWithEmail, handler))
                    .doOnSuccess(message -> log.info("Zip sent: {} {}", emailRequest, message));
              });
        })
        .subscribeOn(Schedulers.io())
        .ignoreElement();
  }
}
