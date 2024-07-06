package com.yaz.core.bean;

import com.yaz.core.service.entity.UserService;
import io.quarkus.security.identity.AuthenticationRequestContext;
import io.quarkus.security.identity.SecurityIdentity;
import io.quarkus.security.identity.SecurityIdentityAugmentor;
import io.quarkus.security.runtime.QuarkusSecurityIdentity;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor
public class CustomSecurityIdentityAugmentor implements SecurityIdentityAugmentor {

  private final UserService userService;
  private final UserAugmentService userAugmentService;

  @Override
  public Uni<SecurityIdentity> augment(SecurityIdentity identity, AuthenticationRequestContext context) {
    final var userAugmentor = new UserAugmentor(identity);

    if (!userAugmentor.canAugment()) {
      log.debug("Cannot augment user {}", userAugmentor);
      return Uni.createFrom().item(identity);
    }

    final var requestUri = userAugmentor.routingContext().request().uri();

    log.debug("Augmenting user {} {}", userAugmentor, requestUri);
    return userService.getIdFromProvider(userAugmentor.identityProvider(), userAugmentor.providerId())
        .<SecurityIdentity>flatMap(opt -> {
          if (opt.isEmpty()) {
            return userAugmentService.getUser(userAugmentor)
                .flatMap(user -> {
                  log.debug("Inserting user {}", user);
                  return userService.saveIfExists(user)
                      .map(id -> {
                        QuarkusSecurityIdentity.Builder builder = QuarkusSecurityIdentity.builder(identity);
                        builder.addAttribute("userId", id);
                        builder.addAttribute("tenant", userAugmentor.tenant());
                        builder.addRole("RECEIPTS_READ");
                        return builder.build();
                      });
                });
          }

          log.debug("User found {}", opt.get());
          QuarkusSecurityIdentity.Builder builder = QuarkusSecurityIdentity.builder(identity);
          builder.addAttribute("userId", opt.get());
          builder.addAttribute("tenant", userAugmentor.tenant());
          builder.addRole("RECEIPTS_READ");
          return Uni.createFrom().item(builder.build());
        })
        .invoke(securityIdentity -> {
          log.debug("Roles user {} {}", securityIdentity.getRoles(), requestUri);
        })
        .onFailure()
        .invoke(throwable -> {
          log.error("Error augmenting user {}", userAugmentor, throwable);
        });
  }
}
