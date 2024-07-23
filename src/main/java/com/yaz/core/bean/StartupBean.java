package com.yaz.core.bean;

import com.yaz.core.service.NotificationService;
import com.yaz.core.service.csv.ReceiptParser;
import com.yaz.core.util.EnvParams;
import com.yaz.core.util.FileUtil;
import io.quarkus.oidc.runtime.TenantConfigBean;
import io.quarkus.runtime.ShutdownEvent;
import io.quarkus.runtime.Startup;
import io.quarkus.runtime.StartupEvent;
import io.quarkus.runtime.configuration.ConfigUtils;
import io.reactivex.rxjava3.core.Completable;
import io.reactivex.rxjava3.schedulers.Schedulers;
import io.vertx.core.VertxOptions;
import io.vertx.core.impl.cpu.CpuCoreSensor;
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
  private final ReceiptParser receiptParser;
  private final TenantConfigBean tenantConfigBean;

  @Startup(value = 0)
  void init() {
    envParams.saveAppStartedAt();
    if (envParams.isShowDir()) {
      Completable.fromAction(FileUtil::showDir)
          .subscribeOn(Schedulers.io())
          .subscribe(() -> {
          }, t -> log.error("Error showing dir", t));
    }
  }

  void onStart(@Observes StartupEvent ev) {
    log.info("The application is starting...");
  }

  @Startup(value = Integer.MAX_VALUE)
  void afterStartup() {

    log.info("AFTER STARTUP");
    notificationService.sendAppStartup();

    final var profiles = ConfigUtils.getProfiles();
    log.info("Profiles: {}", profiles);
    final var cloudProvider = System.getenv("CLOUD_PROVIDER");
    log.info("Cloud provider: {}", cloudProvider);
    log.info("Cores: {}", CpuCoreSensor.availableProcessors());
    log.info("Event Loop Size {}", VertxOptions.DEFAULT_EVENT_LOOP_POOL_SIZE);

    tenantConfigBean.getStaticTenantsConfig().forEach((tenant, ctx) -> {
      log.info("Tenant {}", tenant);

//      final var metadata = ctx.getOidcMetadata();
//
//      final var data = new StringBuilder()
//          .append("\n")
//          .append("AuthServer URI: ").append(ctx.getOidcTenantConfig().getAuthServerUrl().orElse(null)).append("\n")
//          .append("Discovery URI: ").append(metadata.getDiscoveryUri()).append("\n")
//          .append("Token Uri: ").append(metadata.getTokenUri()).append("\n")
//          .append("Introspection Uri: ").append(metadata.getIntrospectionUri()).append("\n")
//          .append("Authorization Uri: ").append(metadata.getAuthorizationUri()).append("\n")
//          .append("JsonWebKeySet Uri: ").append(metadata.getJsonWebKeySetUri()).append("\n")
//          .append("UserInfo Uri: ").append(metadata.getUserInfoUri()).append("\n")
//          .append("End Session Uri: ").append(metadata.getEndSessionUri()).append("\n")
//          .append("Issue: ").append(metadata.getIssuer()).append("\n")
//          .toString();
//
//      log.info("Tenant {} {} {}", tenant, data, ctx.getOidcTenantConfig());
    });

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
