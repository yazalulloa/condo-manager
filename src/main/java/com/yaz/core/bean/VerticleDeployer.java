package com.yaz.core.bean;

import com.yaz.core.bean.vertx.DefaultJacksonMessageCodec;
import io.quarkus.runtime.ShutdownEvent;
import io.quarkus.runtime.StartupEvent;
import io.reactivex.rxjava3.core.Observable;
import io.vertx.core.AbstractVerticle;
import io.vertx.core.DeploymentOptions;
import io.vertx.core.Vertx;
import io.vertx.core.VertxOptions;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Observes;
import jakarta.enterprise.inject.Instance;
import java.util.HashSet;
import java.util.Set;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
public class VerticleDeployer {

  private static final Set<String> VERTICLES_IDS = new HashSet<>();

  public void init(@Observes StartupEvent e, Vertx vertx, Instance<AbstractVerticle> verticles) {
    final var eventBus = vertx.eventBus();
    final var defaultJacksonMessageCodec = new DefaultJacksonMessageCodec();
    eventBus.unregisterCodec(defaultJacksonMessageCodec.name());
    eventBus.registerCodec(defaultJacksonMessageCodec);
    eventBus.codecSelector(body -> defaultJacksonMessageCodec.name());
    final var deploymentOptions = new DeploymentOptions()
        // In native this is precalculated
        .setInstances(VertxOptions.DEFAULT_EVENT_LOOP_POOL_SIZE)
        //.setInstances(1)
        ;
    vertx.deployVerticle(verticles::get,
            deploymentOptions)
        .onSuccess(VERTICLES_IDS::add);
  }

  void shutdown(@Observes ShutdownEvent event, Vertx vertx) {
    final var rxVertx = io.vertx.rxjava3.core.Vertx.newInstance(vertx);

    Observable.fromIterable(VERTICLES_IDS)
        .flatMapCompletable(id -> {
          VERTICLES_IDS.remove(id);
          return rxVertx.undeploy(id);
        })
        .blockingAwait();
  }
}
