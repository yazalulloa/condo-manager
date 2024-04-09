package com.yaz.core.bean;

import com.yaz.core.service.entity.UserService;
import com.yaz.persistence.domain.IdentityProvider;
import io.quarkus.oidc.UserInfo;
import io.quarkus.oidc.runtime.OidcJwtCallerPrincipal;
import io.quarkus.security.identity.AuthenticationRequestContext;
import io.quarkus.security.identity.SecurityIdentity;
import io.quarkus.security.identity.SecurityIdentityAugmentor;
import io.quarkus.security.runtime.QuarkusSecurityIdentity;
import io.smallrye.mutiny.Uni;
import io.vertx.ext.web.RoutingContext;
import jakarta.enterprise.context.ApplicationScoped;
import java.security.Principal;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
public class CustomSecurityIdentityAugmentor implements SecurityIdentityAugmentor {

  private final UserService userService;

  public CustomSecurityIdentityAugmentor(UserService userService) {
    this.userService = userService;
  }

  @Override
  public Uni<SecurityIdentity> augment(SecurityIdentity identity, AuthenticationRequestContext context) {
    // log.info("CustomSecurityIdentityAugmentor.augment SecurityIdentity {} {} {}", identity, identity.isAnonymous(), identity.getAttributes());
    RoutingContext routingContext = identity.getAttribute(RoutingContext.class.getName());
    final var userIdAttr = identity.getAttribute("userId");
    if (identity.getPrincipal() instanceof OidcJwtCallerPrincipal principal && userIdAttr == null) {
      if (principal.getIssuer().equals("https://accounts.google.com")) {
        final var subject = principal.getSubject();
        QuarkusSecurityIdentity.Builder builder = QuarkusSecurityIdentity.builder(identity);
        final var identityProvider = IdentityProvider.GOOGLE;
        return userService.getIdFromProvider(identityProvider, subject)
            .map(optional -> {
              if (optional.isEmpty()) {
                log.info("userId is null for {} {}", identityProvider, subject);

              }
              builder.addAttribute("userId", optional.orElse(null));
              //log.info("CustomSecurityIdentityAugmentor.augment userId {}", userId);
              return builder.build();
            });
      }

    }

    if (routingContext != null) {

      if (routingContext.normalizedPath().endsWith("/github")) {
        QuarkusSecurityIdentity.Builder builder = QuarkusSecurityIdentity.builder(identity);

        UserInfo userInfo = identity.getAttribute("userinfo");

        builder.setPrincipal(new Principal() {

          @Override
          public String getName() {
            return userInfo.getString("preferred_username");
          }

        });
        identity = builder.build();
      }
    }

    return Uni.createFrom().item(identity);
  }

}
