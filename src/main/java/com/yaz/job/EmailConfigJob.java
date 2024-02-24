package com.yaz.job;

import com.yaz.service.EmailConfigService;
import io.quarkus.scheduler.Scheduled;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class EmailConfigJob {

  private final EmailConfigService service;

  @Scheduled(delay = 1, every = "30M")
  public void runAsStart() {
    checkAll();
  }

  private void checkAll() {

    service.checkAll()
        .subscribe(() -> {
        }, throwable -> log.error("ERROR", throwable));
  }

}
