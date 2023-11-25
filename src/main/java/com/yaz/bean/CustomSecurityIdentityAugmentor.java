package com.yaz.bean;

import io.quarkus.oidc.UserInfo;
import io.quarkus.security.identity.AuthenticationRequestContext;
import io.quarkus.security.identity.SecurityIdentity;
import io.quarkus.security.identity.SecurityIdentityAugmentor;
import io.quarkus.security.runtime.QuarkusSecurityIdentity;
import io.quarkus.security.runtime.QuarkusSecurityIdentity.Builder;
import io.smallrye.mutiny.Uni;
import io.vertx.ext.web.RoutingContext;
import jakarta.enterprise.context.ApplicationScoped;
import java.security.Principal;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
public class CustomSecurityIdentityAugmentor implements SecurityIdentityAugmentor {

  @Override
  public Uni<SecurityIdentity> augment(SecurityIdentity identity, AuthenticationRequestContext context) {
    RoutingContext routingContext = identity.getAttribute(RoutingContext.class.getName());


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
