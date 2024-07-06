package com.yaz.core.bean;

import com.yaz.core.domain.GithubUserData;
import com.yaz.core.domain.GoogleUserData;
import com.yaz.core.github.RestGithubClient;
import com.yaz.core.github.UserEmail;
import com.yaz.core.service.entity.UserService;
import com.yaz.core.util.DateUtil;
import com.yaz.persistence.domain.IdentityProvider;
import com.yaz.persistence.entities.User;
import io.quarkus.oidc.AuthorizationCodeTokens;
import io.quarkus.oidc.UserInfo;
import io.quarkus.security.identity.AuthenticationRequestContext;
import io.quarkus.security.identity.SecurityIdentity;
import io.quarkus.security.identity.SecurityIdentityAugmentor;
import io.quarkus.security.runtime.QuarkusSecurityIdentity;
import io.smallrye.mutiny.Uni;
import io.vertx.core.json.Json;
import io.vertx.core.json.JsonObject;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.Optional;
import java.util.Set;
import lombok.extern.slf4j.Slf4j;
import org.eclipse.microprofile.jwt.Claims;
import org.eclipse.microprofile.rest.client.inject.RestClient;

@Slf4j
@ApplicationScoped
public class CustomSecurityIdentityAugmentor implements SecurityIdentityAugmentor {


  private final UserService userService;
  private final RestGithubClient githubClient;

  public CustomSecurityIdentityAugmentor(UserService userService, @RestClient RestGithubClient githubClient) {
    this.userService = userService;
    this.githubClient = githubClient;
  }

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
            return getUser(userAugmentor)
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


  private Uni<User> getUser(UserAugmentor userAugmentor) {
    final var principal = userAugmentor.principal();
    switch (userAugmentor.tenant()) {
      case "google": {
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

        return Uni.createFrom().item(user);
      }
      case "github": {

        UserInfo userInfo = userAugmentor.securityIdentity().getAttribute("userinfo");
        log.debug("userinfo {}", userInfo.getJsonObject());

        Set<String> audSet = principal.getClaim(Claims.aud);
        final var aud = Optional.ofNullable(audSet)
            .map(set -> String.join(",", set))
            .orElse(null);

        return Uni.createFrom().deferred(() -> {
              final var email = userInfo.getString("email");
              if (email != null) {
                return Uni.createFrom().item(email);
              }

              final AuthorizationCodeTokens authorizationCodeTokens = (AuthorizationCodeTokens) userAugmentor.routingContext()
                  .data()
                  .get("io.quarkus.oidc.AuthorizationCodeTokens");
              if (authorizationCodeTokens == null) {
                return Uni.createFrom()
                    .failure(new RuntimeException("AuthorizationCodeTokens not found in routingContext"));
              }

              return githubClient.getUserEmails("token " + authorizationCodeTokens.getAccessToken())
                  .map(list -> {
                    return list.stream().filter(userEmail -> userEmail.primary() && userEmail.email() != null)
                        .map(UserEmail::email)
                        .findFirst()
                        .orElseThrow(() -> new RuntimeException("Primary email not found"));
                  });
            })
            .map(email -> {

              final var userData = GithubUserData.builder()
                  .id(userInfo.getLong("id"))
                  .login(userInfo.getString("login"))
                  .name(userInfo.getString("name"))
                  .email(email)
                  .nodeId(userInfo.getString("node_id"))
                  .avatarUrl(userInfo.getString("avatar_url"))
                  .url(userInfo.getString("url"))

                  .aud(aud)
                  .iat(principal.getClaim(Claims.iat))
                  .exp(principal.getClaim(Claims.exp))
                  .jti(principal.getClaim(Claims.jti))
                  .build();

              return User.builder()
                  .provider(IdentityProvider.GITHUB)
                  .providerId(String.valueOf(userData.id()))
                  .email(userData.email())
                  .username(userData.login())
                  .name(userData.name())
                  .picture(userData.avatarUrl())
                  .data(new JsonObject(Json.encode(userData)))
                  .createdAt(DateUtil.utcLocalDateTime())
                  .lastLoginAt(DateUtil.utcLocalDateTime())
                  .build();
            });

      }
      default:
        return Uni.createFrom().nullItem();
    }
  }
}
