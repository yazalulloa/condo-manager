package com.yaz.api.resource;

import com.yaz.core.client.ManagementClient;
import io.vertx.ext.web.Router;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Observes;
import jakarta.inject.Inject;
import lombok.extern.slf4j.Slf4j;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipse.microprofile.rest.client.inject.RestClient;

@Slf4j
@ApplicationScoped
public class ManagementReactiveRoute {

  private final String path;
  private final ManagementClient managementClient;

  @Inject
  public ManagementReactiveRoute(
      @ConfigProperty(name = "app.management.path") String path,
      @RestClient ManagementClient managementClient) {
    this.path = path;
    this.managementClient = managementClient;
  }

  public void init(@Observes Router router) {
    if (path != null) {
      router.get(path + "/health").handler(rc ->
          managementClient.healthCheck()
              .subscribe()
              .with(
                  response -> rc.response()
                      .putHeader("Content-Type", "application/json")
                      .end(response),
                  rc::fail
              ));

      router.get(path + "/metrics").handler(rc -> {
        managementClient.metrics()
            .subscribe()
            .with(
                response -> rc.response()
                    .putHeader("Content-Type", "text/plain")
                    .end(response),
                rc::fail
            );
      });
    }
  }
}
