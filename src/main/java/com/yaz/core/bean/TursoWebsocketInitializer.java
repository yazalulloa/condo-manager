package com.yaz.core.bean;

import com.yaz.persistence.repository.turso.client.TursoWsService;
import io.quarkus.runtime.ShutdownEvent;
import io.quarkus.runtime.StartupEvent;
import io.vertx.core.Vertx;
import jakarta.enterprise.event.Observes;
import java.time.Duration;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class TursoWebsocketInitializer {

  private static volatile Long timerId = null;

  void initialize(@Observes StartupEvent event, Vertx vertx, TursoWsService service) {
    service.heartBeat();

    timerId = vertx.setPeriodic(Duration.ofSeconds(30).toMillis(), id -> {
      service.heartBeat();
    });
  }

  void shutdown(@Observes ShutdownEvent event, Vertx vertx) {
    if (timerId != null) {
      vertx.cancelTimer(timerId);
    }
  }
}
