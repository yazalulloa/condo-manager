package com.yaz.core.job;

import com.yaz.core.service.ServerSideEventHelper;
import io.quarkus.scheduler.Scheduled;
import jakarta.enterprise.context.ApplicationScoped;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor
public class SseJob {

  private final ServerSideEventHelper helper;

  @Scheduled(delay = 1, every = "15m")
  public void runAsStart() {
    //log.info("REMOVING CLOSED SSE");
    helper.removeClosed();
  }
}
