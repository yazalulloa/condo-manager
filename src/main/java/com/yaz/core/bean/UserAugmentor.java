package com.yaz.core.bean;

import com.yaz.persistence.domain.IdentityProvider;
import io.quarkus.oidc.OidcTenantConfig;
import io.quarkus.oidc.UserInfo;
import io.quarkus.oidc.runtime.OidcJwtCallerPrincipal;
import io.quarkus.security.identity.SecurityIdentity;
import io.vertx.core.json.Json;
import io.vertx.ext.web.RoutingContext;
import java.util.Optional;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Data
@Slf4j
public class UserAugmentor {

  private final SecurityIdentity securityIdentity;
  private final RoutingContext routingContext;
  private String providerId;
  private String tenant;
  private IdentityProvider identityProvider;
  private OidcJwtCallerPrincipal principal;

  public UserAugmentor(SecurityIdentity securityIdentity) {
    this.securityIdentity = securityIdentity;
    this.routingContext = securityIdentity.getAttribute(RoutingContext.class.getName());

    if (routingContext != null) {
      //log.info("Data keys: {}", routingContext.data().keySet());
      final var tenantConfig = (OidcTenantConfig) routingContext.data().get("io.quarkus.oidc.OidcTenantConfig");
      //log.info("Tenant config: {}", Optional.ofNullable(tenantConfig).map(Json::encode).orElse("is null"));
      this.tenant = (String) routingContext.data().get("static.tenant.id");
      if (securityIdentity.getPrincipal() instanceof OidcJwtCallerPrincipal principal && tenant != null) {
        this.principal = principal;
        switch (tenant) {
          case "google": {
            providerId = principal.getSubject();
            identityProvider = IdentityProvider.GOOGLE;
            break;
          }
          case "github": {
            UserInfo userInfo = securityIdentity.getAttribute("userinfo");
            providerId = String.valueOf(userInfo.getLong("id"));
            identityProvider = IdentityProvider.GITHUB;
            break;
          }
        }
      }
    }
  }

  public SecurityIdentity securityIdentity() {
    return securityIdentity;
  }

  public RoutingContext routingContext() {
    return routingContext;
  }

  public String providerId() {
    return providerId;
  }

  public String tenant() {
    return tenant;
  }

  public IdentityProvider identityProvider() {
    return identityProvider;
  }

  public OidcJwtCallerPrincipal principal() {
    return principal;
  }

  public boolean canAugment() {
    return providerId != null && identityProvider != null && tenant != null;
  }
}
