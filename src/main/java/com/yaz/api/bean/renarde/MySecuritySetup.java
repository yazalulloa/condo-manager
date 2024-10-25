package com.yaz.api.bean.renarde;

import io.quarkiverse.renarde.oidc.RenardeOidcHandler;
import io.quarkiverse.renarde.oidc.RenardeOidcSecurity;
import io.quarkiverse.renarde.router.Router;
import io.quarkiverse.renarde.security.RenardeSecurity;
import io.quarkiverse.renarde.security.RenardeUser;
import io.quarkiverse.renarde.security.RenardeUserProvider;
import io.quarkiverse.renarde.util.Flash;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import io.quarkiverse.renarde.util.RedirectException;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.core.Response;
import java.net.URI;
import lombok.extern.slf4j.Slf4j;

@ApplicationScoped
@Slf4j
public class MySecuritySetup implements RenardeUserProvider, RenardeOidcHandler {

  @Inject
  RenardeSecurity security;

  @Inject
  RenardeOidcSecurity oidcSecurity;

  @Inject
  Flash flash;

  @Transactional
  @Override
  public void oidcSuccess(String tenantId, String authId) {
    log.info("OIDC SUCCESS tenantID {} authId {} ", tenantId, authId);


  }

  @Override
  public void loginWithOidcSession(String tenantId, String authId) {
    log.info("LOGIN WITH OIDC SESSION tenantID {} authId {} ", tenantId, authId);
    URI uri;

    uri = URI.create("/loginWithOidcSession");
    throw new RedirectException(Response.seeOther(uri).build());
  }

  @Override
  public RenardeUser findUser(String tenantId, String authId) {

    log.info("FIND USER tenantID {} authId {} ", tenantId, authId);

    throw new RedirectException(security.makeLogoutResponse());
  }
}
