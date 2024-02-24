package com.yaz.bean;

import com.yaz.domain.GoogleUserData;
import com.yaz.persistence.domain.IdentityProvider;
import com.yaz.persistence.entities.User;
import com.yaz.service.OidcDbTokenService;
import com.yaz.service.UserService;
import com.yaz.util.DateUtil;
import io.quarkus.oidc.SecurityEvent;
import io.quarkus.oidc.runtime.OidcJwtCallerPrincipal;
import io.vertx.core.http.Cookie;
import io.vertx.core.json.Json;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.RoutingContext;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Observes;
import jakarta.inject.Inject;
import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.eclipse.microprofile.jwt.Claims;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class SecurityEventListener {

  private final UserService userService;
  private final OidcDbTokenService tokenService;

  public void event(@Observes SecurityEvent event) {
    final var securityIdentity = event.getSecurityIdentity();
    final var principal = (OidcJwtCallerPrincipal) securityIdentity.getPrincipal();

    final var tenantId = securityIdentity.getAttribute("tenant-id");
    final RoutingContext routingContext = securityIdentity.getAttribute(RoutingContext.class.getName());

    final var format = String.format("event:%s,tenantId:%s", event.getEventType().name(), tenantId);
    routingContext.put("listener-message", format);

  //  log.info("SecurityEventListener.event {}", format);

    if (event.getEventType() == SecurityEvent.Type.OIDC_LOGIN) {
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
      routingContext.put("user-data", userData);

      //log.info("userData {}", userData);



      final var user = User.builder()
          .provider(IdentityProvider.GOOGLE)
          .providerId(userData.sub())
          .email(userData.email())
          .username(userData.givenName())
          .name(userData.name())
          .picture(userData.picture())
          .data(new JsonObject(Json.encode(userData)))
          .createdAt(DateUtil.utcLocalDateTime())
          .lastLoginAt(DateUtil.utcLocalDateTime())
          .build();

      final var sessionId = Optional.ofNullable(routingContext.request().getCookie("q_session"))
          .map(Cookie::getValue)
          .orElse(null);

      userService.saveIfExists(user)
          .subscribe()
          .with(
              userId -> {
                log.info("User saved {}", userId);

                if (sessionId != null && userId != null) {
                  tokenService.updateUserId(sessionId, userId)
                      .subscribe()
                      .with(i -> {
                        log.info("session updated {} {} {}", sessionId, userId, i);
                      }, t -> log.error("Error update oidc token {} {}", sessionId, userId, t));
                }
              },
              throwable -> log.error("Error saving user", throwable)
          );
    }


  }
}
