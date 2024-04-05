package com.yaz.core.bean;

import io.quarkus.oidc.TenantResolver;
import io.vertx.ext.web.RoutingContext;
import jakarta.enterprise.context.ApplicationScoped;
import lombok.extern.slf4j.Slf4j;

//@Slf4j
//@ApplicationScoped
//public class CustomTenantResolver implements TenantResolver {
//
//  @Override
//  public String resolve(RoutingContext context) {
//    final String ctxTenantId = context.get("tenant-id");
//    if (ctxTenantId != null) {
//      log.info("ctxTenantId: {}", ctxTenantId);
//      return ctxTenantId;
//    }
//
//    String path = context.request().path().trim();
//    log.info("path: {}", path);
//
//    if (path.startsWith("/login/")) {
//      return path.substring(7);
//    }
//
//    if (path.startsWith("/oauth2/authorization/")) {
//      return path.substring(22);
//    }
//
//    return null;
//  }
//}
