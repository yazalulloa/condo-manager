package com.yaz.bean;

import com.yaz.persistence.repository.turso.TursoService;
import com.yaz.service.NotificationService;
import com.yaz.util.EnvParams;
import com.yaz.util.FileUtil;
import com.yaz.util.RxUtil;
import com.yaz.util.rx.RetryWithDelay;
import io.quarkus.runtime.Startup;
import io.quarkus.runtime.StartupEvent;
import io.reactivex.rxjava3.schedulers.Schedulers;
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
  private final TursoService tursoService;

  @Startup(value = 0)
  void init() {
    envParams.saveAppStartedAt();
    if (envParams.isShowDir()) {
      FileUtil.showDir();
    }

//    RxUtil.single(tursoService.sqliteTables())
//        .subscribeOn(Schedulers.io())
//        .retryWhen(RetryWithDelay.retry(500, TimeUnit.MILLISECONDS))
//        .subscribe(tursoResponse -> {
//
//        }, throwable -> {
//          log.error("FAILED_TO_GET_SQLITE_TABLES", throwable);
//        });
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
