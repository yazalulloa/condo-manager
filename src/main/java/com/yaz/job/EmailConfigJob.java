package com.yaz.job;

import com.yaz.service.EmailConfigService;
import com.yaz.service.GmailChecker;
import io.quarkus.scheduler.Scheduled;
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
  public void runAsStart() {
    checkAll();
  }

  private void checkAll() {

    gmailChecker.checkAll()
        .subscribe(() -> {
        }, throwable -> log.error("ERROR", throwable));
  }

}
