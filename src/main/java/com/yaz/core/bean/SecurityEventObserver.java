package com.yaz.core.bean;

import io.quarkus.security.spi.runtime.AuthenticationFailureEvent;
import io.quarkus.security.spi.runtime.AuthenticationSuccessEvent;
import io.quarkus.security.spi.runtime.AuthorizationFailureEvent;
import io.quarkus.security.spi.runtime.AuthorizationSuccessEvent;
import io.quarkus.security.spi.runtime.SecurityEvent;
import io.vertx.ext.web.RoutingContext;
import jakarta.enterprise.event.Observes;
import jakarta.enterprise.event.ObservesAsync;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class SecurityEventObserver {

//  void observeAuthenticationSuccess(@ObservesAsync AuthenticationSuccessEvent event) {
//    log.info("User {} has authenticated successfully", event.getSecurityIdentity().getPrincipal().getName());
//  }
//
//  void observeAuthenticationFailure(@ObservesAsync AuthenticationFailureEvent event) {
//    RoutingContext routingContext = (RoutingContext) event.getEventProperties().get(RoutingContext.class.getName());
//    log.info("Authentication failed, request path: {}", routingContext.request().path());
//  }
//
//  void observeAuthorizationSuccess(@ObservesAsync AuthorizationSuccessEvent event) {
//    String principalName = getPrincipalName(event);
//    if (principalName != null) {
//      log.info("User {} has been authorized successfully", principalName);
//    }
//  }
//
//  void observeAuthorizationFailure(@Observes AuthorizationFailureEvent event) {
//    log.error("User {} authorization failed", event.getSecurityIdentity().getPrincipal().getName(),
//        event.getAuthorizationFailure());
//  }
//
//  private static String getPrincipalName(SecurityEvent event) {
//    if (event.getSecurityIdentity() != null) {
//      return event.getSecurityIdentity().getPrincipal().getName();
//    }
//    return null;
//  }

}
