package com.yaz.core.service.gmail;

import com.yaz.api.domain.response.EmailConfigTableItem;
import com.yaz.core.service.entity.EmailConfigService;
import com.yaz.core.util.RxUtil;
import io.reactivex.rxjava3.core.Maybe;
import jakarta.enterprise.context.ApplicationScoped;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor
public class GmailService {

  private final GmailHelper gmailHelper;
  private final GmailChecker gmailChecker;
  private final EmailConfigService emailConfigService;

  public Maybe<EmailConfigTableItem> loadItem(String id) {
    return RxUtil.single(emailConfigService.readItem(id))
        .flatMapMaybe(Maybe::fromOptional)
        .flatMap(item -> {
          if (item.item().shouldGetNewOne()) {
            return Maybe.just(item);
          }

          final var emailConfig = item.item();
          return gmailChecker.check(emailConfig.id(), emailConfig.hash())
              .andThen(RxUtil.single(emailConfigService.readItem(id)))
              .flatMapMaybe(Maybe::fromOptional);
        })
        .switchIfEmpty(Maybe.defer(() -> {
          gmailHelper.clearFlow(id);
          return Maybe.empty();
        }));
  }
}
