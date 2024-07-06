package com.yaz.api.bean;

import io.quarkus.security.identity.SecurityIdentity;
import io.quarkus.vertx.http.runtime.security.HttpSecurityPolicy;
import io.smallrye.mutiny.Uni;
import io.vertx.ext.web.RoutingContext;
import jakarta.enterprise.context.ApplicationScoped;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
public class ApiCheckHttpSecurityPolicy implements HttpSecurityPolicy {

  @Override
  public Uni<CheckResult> checkPermission(RoutingContext event, Uni<SecurityIdentity> identity,
      AuthorizationRequestContext requestContext) {

    log.debug("checkPermission {}", event.request().uri());

    if (customRequestAuthorization(event)) {
      return Uni.createFrom().item(CheckResult.PERMIT);
    }

    log.debug("checkPermission DENY {}", event.request().uri());
    return Uni.createFrom().item(CheckResult.DENY);
  }

  @Override
  public String name() {
    return "api-check";
  }

  private static boolean customRequestAuthorization(RoutingContext event) {
    // here comes your own security check
    return !event.request().path().endsWith("denied");
  }
}