package com.yaz.core.bean;

import static io.quarkus.oidc.runtime.CodeAuthenticationMechanism.SESSION_MAX_AGE_PARAM;

import com.yaz.core.service.entity.OidcDbTokenService;
import com.yaz.core.util.DateUtil;
import io.quarkus.oidc.AuthorizationCodeTokens;
import io.quarkus.oidc.OidcRequestContext;
import io.quarkus.oidc.OidcTenantConfig;
import io.quarkus.oidc.TokenStateManager;
import io.quarkus.security.AuthenticationCompletionException;
import io.quarkus.security.AuthenticationFailedException;
import io.smallrye.mutiny.Uni;
import io.vertx.ext.web.RoutingContext;
import jakarta.annotation.Priority;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.inject.Alternative;
import jakarta.inject.Inject;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
@Alternative
@Priority(1)
public class TursoTokenStateManager implements TokenStateManager {

  private static final String TOKEN_STATE_INSERT_FAILED = "Failed to insert token state into database";
  private static final String FAILED_TO_ACQUIRE_TOKEN = "Failed to acquire authorization code tokens";

  private final OidcDbTokenService service;

  @Override
  public Uni<String> createTokenState(RoutingContext event, OidcTenantConfig oidcConfig,
      AuthorizationCodeTokens tokens, OidcRequestContext<String> requestContext) {

    final var now = DateUtil.epochSecond();
    final String id = now + UUID.randomUUID().toString();
    final var expiresIn = now + event.<Long>get(SESSION_MAX_AGE_PARAM);

    return service.insert(tokens.getIdToken(), tokens.getAccessToken(),
            tokens.getRefreshToken(), expiresIn, id)
        .onFailure()
        .invoke(throwable -> log.error("Failed to insert token state into database: ", throwable))
        .onFailure()
        .transform(throwable -> new AuthenticationFailedException(TOKEN_STATE_INSERT_FAILED, throwable))
        .flatMap(affected -> {
          if (true) {
            return Uni.createFrom().item(id);
          }
          return Uni.createFrom().failure(new AuthenticationFailedException(TOKEN_STATE_INSERT_FAILED));
        })
        .memoize().indefinitely();
  }

  @Override
  public Uni<AuthorizationCodeTokens> getTokens(RoutingContext routingContext, OidcTenantConfig oidcConfig,
      String tokenState,
      OidcRequestContext<AuthorizationCodeTokens> requestContext) {

    return service.read(tokenState)
        .onFailure().transform(throwable -> new AuthenticationCompletionException(FAILED_TO_ACQUIRE_TOKEN, throwable))
        .flatMap(optional -> {
          if (optional.isPresent()) {
            final var tokens = optional.get();
            return Uni.createFrom().item(new AuthorizationCodeTokens(
                tokens.idToken(),
                tokens.accessToken(),
                tokens.refreshToken()));
          }
          log.info(FAILED_TO_ACQUIRE_TOKEN);
          return Uni.createFrom().failure(new AuthenticationCompletionException(FAILED_TO_ACQUIRE_TOKEN));

        })
        .memoize().indefinitely();
  }

  @Override
  public Uni<Void> deleteTokens(RoutingContext routingContext, OidcTenantConfig oidcConfig, String tokenState,
      OidcRequestContext<Void> requestContext) {

    return service.delete(tokenState)
        .replaceWithVoid()
        .onFailure()
        .recoverWithItem(throwable -> {
          log.debug("Failed to delete tokens: {}", throwable.getMessage());
          return null;
        });
  }
}
