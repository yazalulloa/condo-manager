package com.yaz.core.bean;

import com.yaz.core.service.entity.OidcDbTokenService;
import com.yaz.core.service.entity.UserService;
import io.quarkus.oidc.SecurityEvent;
import io.vertx.core.http.Cookie;
import io.vertx.ext.web.RoutingContext;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Observes;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor
public class SecurityEventListener {

  private final UserService userService;
  private final UserAugmentService userAugmentService;
  private final OidcDbTokenService tokenService;

  public void event(@Observes SecurityEvent event) {
    final var securityIdentity = event.getSecurityIdentity();
    final var tenant = securityIdentity.getAttribute("tenant");
    final var userId = securityIdentity.<String>getAttribute("userId");

    final var tenantId = securityIdentity.getAttribute("tenant-id");
    final RoutingContext routingContext = securityIdentity.getAttribute(RoutingContext.class.getName());

    final var format = String.format("event:%s,tenantId:%s", event.getEventType().name(), tenantId);
    routingContext.put("listener-message", format);

    final var sessionId = routingContext.request().cookies().stream()
        .filter(cookie -> cookie.getName().startsWith("q_session"))
        .map(Cookie::getValue)
        .findFirst()
        .orElse(null);

    if (userId != null && sessionId != null) {
      if (event.getEventType() == SecurityEvent.Type.OIDC_LOGIN
          || event.getEventType() == SecurityEvent.Type.OIDC_SESSION_REFRESHED
          || event.getEventType() == SecurityEvent.Type.OIDC_SESSION_EXPIRED_AND_REFRESHED) {
        log.debug("updateUserId {} tenant {} sessionId {}", userId, tenant, sessionId);
        tokenService.updateUserId(sessionId, userId)
            .subscribe()
            .with(i -> {
              log.debug("session updated {} {} {}", sessionId, userId, i);
            }, t -> log.error("Error update oidc token {} {}", sessionId, userId, t));

        final var userAugmentor = new UserAugmentor(securityIdentity);
        if (userAugmentor.canAugment()) {

          userAugmentService.getUser(userAugmentor)
              .map(user -> user.toBuilder()
                  .id(userId)
                  .build())
              .flatMap(userService::update)
              .subscribe()
              .with(i -> {
                log.debug("User updated {}", i);
              }, t -> log.error("Error update user {}", userAugmentor, t));
        }


      }
    }
  }


}
