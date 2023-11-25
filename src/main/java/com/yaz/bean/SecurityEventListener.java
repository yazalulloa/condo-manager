package com.yaz.bean;

import io.quarkus.oidc.SecurityEvent;
import io.quarkus.oidc.runtime.OidcJwtCallerPrincipal;
import io.vertx.ext.web.RoutingContext;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Observes;
import lombok.extern.slf4j.Slf4j;
import com.yaz.domain.GoogleUserData;
import org.eclipse.microprofile.jwt.Claims;

@Slf4j
@ApplicationScoped
public class SecurityEventListener {

  public void event(@Observes SecurityEvent event) {
    final var securityIdentity = event.getSecurityIdentity();
    final var principal = (OidcJwtCallerPrincipal)securityIdentity.getPrincipal();

    final var userData = GoogleUserData.builder()
        .sub(principal.getSubject())
        .givenName(principal.getClaim(Claims.given_name))
        .name(principal.getName())
        .email(principal.getClaim(Claims.email))
        .emailVerified(principal.getClaim(Claims.email_verified))
        .picture(principal.getClaim("picture"))
        .locale(principal.getClaim(Claims.locale))
        .iat(principal.getClaim(Claims.iat))
        .exp(principal.getClaim(Claims.exp))
        .atHash(principal.getClaim(Claims.at_hash))
        .accessToken(principal.getRawToken())
        .expiresIn(principal.getClaim(Claims.exp))
        //.scope()
        //.tokenType()
        .idToken(principal.getRawToken())
        .build();

    //log.info("userData {}", userData);

    final var tenantId = securityIdentity.getAttribute("tenant-id");
    final RoutingContext routingContext = securityIdentity.getAttribute(RoutingContext.class.getName());
    final var format = String.format("event:%s,tenantId:%s", event.getEventType().name(), tenantId);
    routingContext.put("listener-message", format);
    routingContext.put("user-data", userData);
    log.info("SecurityEventListener.event {}", format);
  }
}
