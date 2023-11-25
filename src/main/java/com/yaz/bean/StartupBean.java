package com.yaz.bean;

import io.quarkus.runtime.Startup;
import io.quarkus.vertx.web.RouteFilter;
import io.vertx.ext.web.RoutingContext;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import com.yaz.service.NotificationService;
import com.yaz.util.EnvUtil;
import com.yaz.util.FileUtil;
import com.yaz.util.JacksonUtil;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class StartupBean {

  private final NotificationService notificationService;

  @Startup(value = 0)
  void init() {
    EnvUtil.saveAppStartedAt();
    if (EnvUtil.isShowDir()) {
      FileUtil.showDir();
    }
    JacksonUtil.loadModules();
  }

  @Startup(value = Integer.MAX_VALUE)
  void afterStartup() {
    log.info("AFTER STARTUP");
    notificationService.sendAppStartup();
    log.info("AFTER_STARTUP_SEND");
  }

  @RouteFilter()
    //  (1)
  void rerouteStatic(RoutingContext rc) {
    final var path = rc.request().path();

    final var indexOfDot = path.lastIndexOf(".");
    final var count = path.chars().filter(ch -> ch == '/').count();

    if (indexOfDot == -1 && count == 1) {
      rc.reroute(path + ".html");
      return;
    }
    rc.next();
  }
}
