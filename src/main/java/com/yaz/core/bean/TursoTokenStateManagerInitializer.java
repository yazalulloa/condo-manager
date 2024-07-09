package com.yaz.core.bean;

import com.yaz.core.service.entity.OidcDbTokenService;
import com.yaz.core.util.DateUtil;
import io.quarkus.runtime.ShutdownEvent;
import io.quarkus.runtime.StartupEvent;
import io.vertx.core.Handler;
import io.vertx.core.Vertx;
import jakarta.enterprise.event.Observes;
import java.time.Duration;
import java.util.concurrent.atomic.AtomicBoolean;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class TursoTokenStateManagerInitializer {

  private static final long EXPIRED_EXTRA_GRACE = 30;
  private static volatile Long timerId = null;

  private static void periodicallyDeleteExpiredTokens(Vertx vertx, OidcDbTokenService service,
      long delayBetweenChecks) {
    timerId = vertx
        .setPeriodic(5000, delayBetweenChecks, new Handler<>() {

          private final AtomicBoolean deleteInProgress = new AtomicBoolean(false);

          @Override
          public void handle(Long aLong) {
            if (deleteInProgress.compareAndSet(false, true)) {

              final long deleteExpiresIn = DateUtil.epochSecond() - EXPIRED_EXTRA_GRACE;

              service.deleteIfExpired(deleteExpiresIn)
                  .subscribe()
                  .with(
                      ignored -> {
                        // success
                        deleteInProgress.set(false);
                      },
                      t -> {
                        log.error("Failed to expired OIDC token states from database", t);
                        deleteInProgress.set(false);
                      });
            }
          }
        });
  }

  void initialize(@Observes StartupEvent event, Vertx vertx, OidcDbTokenService service) {
    periodicallyDeleteExpiredTokens(vertx, service, Duration.ofHours(8).toMillis());
  }

  void shutdown(@Observes ShutdownEvent event, Vertx vertx) {
    if (timerId != null) {
      vertx.cancelTimer(timerId);
    }
  }
}
