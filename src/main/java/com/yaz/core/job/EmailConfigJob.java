package com.yaz.core.job;

import com.yaz.core.service.gmail.GmailChecker;
import com.yaz.core.util.MutinyUtil;
import io.quarkus.scheduler.Scheduled;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class EmailConfigJob {

  private final GmailChecker gmailChecker;

  @Scheduled(delay = 1, every = "30M")
  Uni<Void> runAsStart() {
    return MutinyUtil.toUni(gmailChecker.checkAll());
  }
}
