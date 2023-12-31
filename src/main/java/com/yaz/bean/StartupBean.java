package com.yaz.bean;

import com.yaz.service.NotificationService;
import com.yaz.util.EnvParams;
import com.yaz.util.FileUtil;
import com.yaz.util.JacksonUtil;
import io.quarkus.runtime.Startup;
import io.quarkus.runtime.StartupEvent;
import io.quarkus.vertx.web.RouteFilter;
import io.vertx.ext.web.RoutingContext;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Observes;
import jakarta.inject.Inject;
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
    JacksonUtil.loadModules();
  }

  void onStart(@Observes StartupEvent ev) {
    log.info("The application is starting...");
  }

  @Startup(value = Integer.MAX_VALUE)
  void afterStartup() {

    log.info("AFTER STARTUP");
    notificationService.sendAppStartup();
//    Completable.complete()
//        .delay(3, TimeUnit.SECONDS)
//        .andThen(Completable.fromAction(() -> notificationService.sendAppStartup()))
//        .subscribe(() -> log.info("AFTER_STARTUP_SEND"), throwable -> log.error("AFTER_STARTUP_SEND_ERROR", throwable));
  }


}
