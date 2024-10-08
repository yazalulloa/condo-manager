package com.yaz.api.resource;

import com.yaz.core.util.RandomUtil;
import com.yaz.core.util.StringUtil;
import io.quarkus.runtime.StartupEvent;
import io.quarkus.vertx.web.Route;
import io.quarkus.vertx.web.Route.HttpMethod;
import io.quarkus.vertx.web.RouteFilter;
import io.vertx.core.Vertx;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.handler.StaticHandler;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Observes;
import jakarta.inject.Inject;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.eclipse.microprofile.config.inject.ConfigProperty;

@Slf4j
@ApplicationScoped
public class StaticReactiveRoutes {

  public static final String TMP_STATIC_PATH = "tmp/stc/" + RandomUtil.randomIntStr(6) + "/";
  public static final String BUILDING_EDIT = "/buildings/edit/";
  public static final String RECEIPT_EDIT = "/receipts/edit/";
  public static final String RECEIPT_PDF_VIEW = "/receipts/pdfs/";
  public static final String RECEIPT_NEW_FILE = "/receipts/new_file/";
  public static final String EMAIL_CONFIGS_ERROR = "/email_configs/error/";
  private static final String INDEX_HTML = "index.html";
  private static final String[] DEEP_LINKING_ROUTES = {BUILDING_EDIT, RECEIPT_EDIT, RECEIPT_PDF_VIEW, RECEIPT_NEW_FILE,
      EMAIL_CONFIGS_ERROR};
  private static final String[] FILES_EXTENSIONS = {".html", ".js", ".css", ".svg", ".png", ".ico", ".mjs"};

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
    final var uri = rc.request().uri();

    if (path.equals("/")
        || path.isEmpty()) {
      log.debug("path first {}", path);
      rc.next();
      return;
    }

    if (isFileExtension(path)) {
      log.debug("Is file extension {}", path);
      rc.next();
      return;
    }

    log.debug("path {} uri {}", path, uri);
    final var authSession = rc.request().cookies().stream()
        .anyMatch(cookie -> cookie.getName().contains("auth_session"));

    if (isNextPath(path)) {

      if (authSession || !path.startsWith("/api")) {
        log.debug("is authSession {} {}", path, uri);
        rc.next();
      } else {
        log.debug("Redirecting to login.html {} {}", path, uri);
        rc.response()
            .putHeader("HX-Redirect", "/login.html")
            .end();
      }

      return;
    }

    if (path.startsWith("/stc/")) {

      var newPath = path.replace("/stc/", "/");
      if (path.endsWith("/")) {
        newPath += INDEX_HTML;
      }
      //log.debug("Returning STC {}", newPath);
      rc.reroute(newPath);
      return;
    }

    //log.debug("path {}", path);

    final var purpose = rc.request().getHeader("purpose");
    final var hxCurrentUrl = rc.request().getHeader("Hx-Current-Url");
    //log.debug("hxCurrentUrl {}", hxCurrentUrl);

    if (hxCurrentUrl == null && (purpose == null || !purpose.equals("prefetch"))) {
      log.error("hxCurrentUrl is null {}", path);
      rc.reroute("/" + INDEX_HTML);
      return;
    }

    if (purpose == null || !purpose.equals("prefetch")) {
      for (var route : DEEP_LINKING_ROUTES) {
        if (path.startsWith(route)) {
          final var id = path.substring(route.length());
          if (StringUtils.isEmpty(id)) {
            rc.response().setStatusCode(404).end();
            return;
          }
          rc.reroute(route + INDEX_HTML);
          return;
        }
      }
    }

    if (path.endsWith("/")) {
      rc.reroute(path + INDEX_HTML);
      return;
    }

//    if (authSession && path.equals("/oauth2/authorization/google")) {
//      rc.response()
//          .putHeader("HX-Redirect", "/")
//          .end();
//      return;
//    }

    if (path.equals("/oauth2/authorization/google") || path.equals("/signed_in")) {
      if (authSession) {
        log.debug("Redirecting to / {} {}", path, uri);
        rc.response()
            .putHeader("HX-Redirect", "/")
            .end();
        return;
      }

      log.debug("is not authSession {} {}", path, uri);
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

    if (value == null) {
      log.debug("redirect 404 {}", rc.request().uri());
      rc.response().setStatusCode(404).end();
    } else {
      log.debug("reroute {}", value);
      rc.reroute(value);
    }
  }

  void installRoute(@Observes StartupEvent startupEvent, Vertx vertx, Router router) {
    vertx.fileSystem().mkdirs(TMP_STATIC_PATH);

    router.route()
        .path("/" + TMP_STATIC_PATH + "*")
        .handler(ctx -> {
          ctx.response().putHeader("Cache-Control", "must-revalidate, max-age=0");
          ctx.next();
        })
        .handler(StaticHandler.create(TMP_STATIC_PATH)
                .setCachingEnabled(true)
                .setFilesReadOnly(false)
//            .setCacheEntryTimeout(1)
//            .setMaxCacheSize(1)
        );
  }

}
