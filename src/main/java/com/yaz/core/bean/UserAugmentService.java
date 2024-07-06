package com.yaz.core.bean;

import com.yaz.core.domain.GithubUserData;
import com.yaz.core.domain.GoogleUserData;
import com.yaz.core.github.RestGithubClient;
import com.yaz.core.github.UserEmail;
import com.yaz.core.util.DateUtil;
import com.yaz.persistence.domain.IdentityProvider;
import com.yaz.persistence.entities.User;
import io.quarkus.oidc.AuthorizationCodeTokens;
import io.quarkus.oidc.UserInfo;
import io.smallrye.mutiny.Uni;
import io.vertx.core.json.Json;
import io.vertx.core.json.JsonObject;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import lombok.extern.slf4j.Slf4j;
import org.eclipse.microprofile.jwt.Claims;
import org.eclipse.microprofile.rest.client.inject.RestClient;

@Slf4j
@ApplicationScoped
public class UserAugmentService {

  private final RestGithubClient githubClient;

  public UserAugmentService(@RestClient RestGithubClient githubClient) {
    this.githubClient = githubClient;
  }

  public Uni<User> getUser(UserAugmentor userAugmentor) {
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
                return Uni.createFrom().item(List.of(UserEmail.email(email)));
              }

              final AuthorizationCodeTokens authorizationCodeTokens = (AuthorizationCodeTokens) userAugmentor.routingContext()
                  .data()
                  .get("io.quarkus.oidc.AuthorizationCodeTokens");
              if (authorizationCodeTokens == null) {
                return Uni.createFrom()
                    .failure(new RuntimeException("AuthorizationCodeTokens not found in routingContext"));
              }

              return githubClient.getUserEmails("token " + authorizationCodeTokens.getAccessToken());
            })
            .map(emails -> {

              final var email = emails.stream()
                  .filter(userEmail -> userEmail.primary() && userEmail.email() != null)
                  .map(UserEmail::email)
                  .findFirst()
                  .orElseThrow(() -> new RuntimeException("Primary email not found"));

              final var userData = GithubUserData.builder()
                  .id(userInfo.getLong("id"))
                  .login(userInfo.getString("login"))
                  .name(userInfo.getString("name"))
                  .email(email)
                  .emails(emails)
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
