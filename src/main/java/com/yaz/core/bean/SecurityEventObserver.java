package com.yaz.core.bean;

import io.quarkus.security.spi.runtime.AuthenticationFailureEvent;
import io.quarkus.security.spi.runtime.AuthenticationSuccessEvent;
import io.quarkus.security.spi.runtime.AuthorizationFailureEvent;
import io.quarkus.security.spi.runtime.AuthorizationSuccessEvent;
import io.quarkus.security.spi.runtime.SecurityEvent;
import jakarta.enterprise.event.Observes;
import jakarta.enterprise.event.ObservesAsync;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class SecurityEventObserver {

  private static String getPrincipalName(SecurityEvent event) {
    if (event.getSecurityIdentity() != null) {
      return event.getSecurityIdentity().getPrincipal().getName();
    }
    return null;
  }

  void observeAuthenticationSuccess(@ObservesAsync AuthenticationSuccessEvent event) {

//    log.info("User '{}' has authenticated successfully", getPrincipalName(event));
//    log.info("attrs: {}", event.getSecurityIdentity().getPrincipal());
  }

  void observeAuthenticationFailure(@ObservesAsync AuthenticationFailureEvent event) {
    //RoutingContext routingContext = (RoutingContext) event.getEventProperties().get(RoutingContext.class.getName());
    //log.info("Authentication failed, request path: '{}'", routingContext.request().path());
  }

  void observeAuthorizationSuccess(@ObservesAsync AuthorizationSuccessEvent event) {
    String principalName = getPrincipalName(event);
    if (principalName != null) {
      // log.info("User '{}' has been authorized successfully", principalName);
    }
  }

  void observeAuthorizationFailure(@Observes AuthorizationFailureEvent event) {
    final var name = getPrincipalName(event);
    //log.error("User '{}' authorization failed: {}", name, event.getAuthorizationFailure().getMessage());
  }

}
