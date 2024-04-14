package com.yaz.api.resource;

import com.yaz.core.util.StringUtil;
import io.quarkus.vertx.web.Route;
import io.quarkus.vertx.web.Route.HttpMethod;
import io.quarkus.vertx.web.RouteFilter;
import io.vertx.ext.web.RoutingContext;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.eclipse.microprofile.config.inject.ConfigProperty;

@Slf4j
@ApplicationScoped
public class StaticReactiveRoutes {

  public static final String BUILDING_EDIT = "/buildings/edit/";
  public static final String RECEIPT_PDF_VIEW = "/receipts/pdfs/";

  private static final String[] DEEP_LINKING_ROUTES = {BUILDING_EDIT, RECEIPT_PDF_VIEW};
  private static final String[] FILES_EXTENSIONS = {".js", ".css", ".svg", ".png", ".ico", ".html"};

  private final String[] nextPaths;

  @Inject
  public StaticReactiveRoutes(
      @ConfigProperty(name = "app.management.path") String managementPath,
      @ConfigProperty(name = "app.telegram.webhook.url") String telegramPath) {
    this.nextPaths = new String[]{managementPath, telegramPath, "/api", "/rpc", "/redirect"};
  }

  private boolean isNextPath(String path) {
    for (var nextPath : nextPaths) {
      if (path.startsWith(nextPath)) {
        return true;
      }
    }
    return false;
  }

  private boolean isFileExtension(String path) {
    for (var ext : FILES_EXTENSIONS) {
      if (path.endsWith(ext)) {
        return true;
      }
    }
    return false;
  }

  @RouteFilter()
  //  (1)
  public void all(RoutingContext rc) {

    final var path = rc.request().path();

    if (path.equals("/")
        || path.isEmpty()) {
      rc.next();
      return;
    }

    if (isFileExtension(path)) {
      rc.next();
      return;
    }

    if (isNextPath(path)) {
      rc.next();
      return;
    }

    //log.info("path {}", path);

    final var hxCurrentUrl = rc.request().getHeader("Hx-Current-Url");
    //log.info("hxCurrentUrl {}", hxCurrentUrl);

    if (hxCurrentUrl == null) {
      rc.reroute("/index.html");
      return;
    }

    for (var route : DEEP_LINKING_ROUTES) {
      if (path.startsWith(route)) {
        final var id = path.substring(route.length());
        if (StringUtils.isEmpty(id)) {
          rc.response().setStatusCode(404).end();
          return;
        }
        rc.reroute(route + "index.html");
        return;
      }
    }

    if (path.endsWith("/")) {
      rc.reroute(path + "index.html");
      return;
    }

    rc.next();
  }

  @Route(path = "index.js", methods = Route.HttpMethod.GET)
  void indexJs(RoutingContext routingContext) {
    routingContext.reroute("/out/js/index.js");
  }

  @Route(path = "output.css", methods = Route.HttpMethod.GET)
  void cssFile(RoutingContext routingContext) {
    routingContext.reroute("/out/css/output.css");
  }

  @Route(path = "redirect", methods = HttpMethod.GET)
  void redirect(RoutingContext rc) {
    final var value = StringUtil.trimFilter(rc.request().getParam("v"));
    //log.info("redirect {}", value);
    if (value == null) {
      rc.response().setStatusCode(404).end();
    } else {
      rc.reroute(value);
    }
  }

}
