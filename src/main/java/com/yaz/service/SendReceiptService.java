package com.yaz.service;

import com.yaz.persistence.domain.EmailConfigUser;
import com.yaz.resource.domain.response.EmailConfigTableItem;
import com.yaz.service.entity.UserService;
import com.yaz.service.gmail.GmailHelper;
import com.yaz.service.gmail.GmailService;
import com.yaz.service.gmail.GmailUtil;
import com.yaz.service.gmail.MimeMessageUtil;
import com.yaz.service.gmail.domain.ReceiptEmailRequest;
import com.yaz.service.pdf.ReceiptPdfService;
import com.yaz.util.RxUtil;
import io.reactivex.rxjava3.core.Completable;
import io.reactivex.rxjava3.core.Maybe;
import io.reactivex.rxjava3.core.Single;
import io.reactivex.rxjava3.schedulers.Schedulers;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class SendReceiptService {

  private final ReceiptPdfService pdfService;
  private final GmailService gmailService;
  private final UserService userService;
  private final GmailHelper gmailHelper;
  private final TranslationProvider translationProvider;


  public Completable sendZip(String buildingId, long receiptId) {
    return pdfService.zipResponse(buildingId, receiptId)
        .flatMap(zipResponse -> {
          final var receipt = zipResponse.receipt();

          if (receipt.emailConfigId() == null) {
            return Single.error(new IllegalArgumentException("Email config not set in building"));
          }

          final var emailConfigSingle = gmailService.loadItem(receipt.emailConfigId())
              .map(EmailConfigTableItem::getItem)
              .map(EmailConfigUser::emailConfig)
              .flatMap(emailConfig -> {

                if (emailConfig.stacktrace() != null) {
                  return Maybe.error(new IllegalArgumentException("Email config error: " + emailConfig.stacktrace()));
                }

                return Maybe.just(emailConfig);
              })
              .switchIfEmpty(Single.error(new IllegalArgumentException("Email config not found")));

          final var userSingle = RxUtil.single(userService.read(receipt.emailConfigId()))
              .flatMapMaybe(Maybe::fromOptional)
              .switchIfEmpty(Single.error(new IllegalArgumentException("User not found")));

          return Single.zip(emailConfigSingle, userSingle, (emailConfig, user) -> {
            final var subject = "AVISO DE COBRO %s %s Adm. %s";

            final var month = translationProvider.translate(receipt.month().name());
            final var emailRequest = ReceiptEmailRequest.builder()
                .from(user.email())
                .to(Set.of("yzlup2@gmail.com"))
                .subject(subject.formatted(month, receipt.year(), receipt.building().name()))
                .text("AVISO DE COBRO")
                .files(Set.of(zipResponse.fileResponse().path().toString()))
                .build();

            final var mimeMessage = MimeMessageUtil.createEmail(emailRequest);

            final var gmail = gmailHelper.gmail(emailConfig.userId());
            final var messageWithEmail = GmailUtil.createMessageWithEmail(mimeMessage);
            return gmail.users().messages().send("me", messageWithEmail)
                .execute()
                .toString();
          });
        })
        .subscribeOn(Schedulers.io())
        .ignoreElement();
  }
}
