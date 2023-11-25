package com.yaz.job;

import io.quarkus.scheduler.Scheduled;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import com.yaz.service.ServerSideEventHelper;

@ApplicationScoped
@Slf4j
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class SseJob {

  private final ServerSideEventHelper helper;

  @Scheduled(delay = 1, every = "15m")
  public void runAsStart() {
    //log.info("REMOVING CLOSED SSE");
    helper.removeClosed();
  }
}
