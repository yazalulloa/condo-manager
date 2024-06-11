package com.yaz.core.job;

import io.quarkus.scheduler.Scheduled;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import com.yaz.core.service.ServerSideEventHelper;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class SseJob {

  private final ServerSideEventHelper helper;

  @Scheduled(delay = 1, every = "15m")
  public void runAsStart() {
    //log.info("REMOVING CLOSED SSE");
    helper.removeClosed();
  }
}
