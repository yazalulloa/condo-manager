package com.yaz.bean;

import com.yaz.service.NotificationService;
import com.yaz.util.EnvParams;
import com.yaz.util.FileUtil;
import io.quarkus.runtime.ShutdownEvent;
import io.quarkus.runtime.Startup;
import io.quarkus.runtime.StartupEvent;
import io.vertx.core.Vertx;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Observes;
import jakarta.inject.Inject;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class StartupBean {

  private final NotificationService notificationService;
  private final EnvParams envParams;

  @Startup(value = 0)
  void init() {
    envParams.saveAppStartedAt();
    if (envParams.isShowDir()) {
      FileUtil.showDir();
    }
  }

  void onStart(@Observes StartupEvent ev) {
    log.info("The application is starting...");
  }

  @Startup(value = Integer.MAX_VALUE)
  void afterStartup() {

    log.info("AFTER STARTUP");
    notificationService.sendAppStartup();
  }

  void shutdown(@Observes ShutdownEvent event) {
    log.info("The application is stopping...");
    try {
      notificationService.sendShuttingDownApp()
          .blockingAwait(3, TimeUnit.SECONDS);
    } catch (Exception e) {
      log.error("Error sending shutting down message", e);
    }

    log.info("The application is stopping...");
  }
}
