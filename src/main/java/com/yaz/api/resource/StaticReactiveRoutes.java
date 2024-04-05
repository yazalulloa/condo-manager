package com.yaz.api.resource;

import com.yaz.core.util.StringUtil;
import io.quarkus.vertx.web.Param;
import io.quarkus.vertx.web.Route;
import io.quarkus.vertx.web.Route.HttpMethod;
import io.quarkus.vertx.web.RouteFilter;
import io.vertx.ext.web.RoutingContext;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.Response.Status;
import java.util.Set;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.eclipse.microprofile.config.inject.ConfigProperty;

@Slf4j
@ApplicationScoped
public class StaticReactiveRoutes {

  public static final String BUILDING_EDIT = "/buildings/edit";

  private final Set<String> nextPaths;

  @Inject
  public StaticReactiveRoutes(
      @ConfigProperty(name = "app.management.path") String managementPath) {
    this.nextPaths = Set.of(managementPath, "/api", "/rpc", "/redirect", BUILDING_EDIT);
  }

  @RouteFilter()
    //  (1)
  void rerouteStatic(RoutingContext rc) {

    final var path = rc.request().path();

    if (path.equals("/") || path.isEmpty()) {
      rc.next();
      return;
    }

    final var isNexPath = nextPaths.stream()
        .map(path::startsWith)
        .reduce(Boolean::logicalOr)
        .orElse(false);

    if (isNexPath || path.endsWith(".js") || path.endsWith(".css") || path.endsWith(".svg") || path.endsWith(".png")
        || path.endsWith(".ico")) {
      //log.info("early_next {}", path);
      rc.next();
      return;
    }

    log.info("path {}", path);

    if (path.endsWith(".html")) {
      rc.next();
      return;
    }

    final var hxCurrentUrl = rc.request().getHeader("Hx-Current-Url");
    //log.info("hxCurrentUrl {}", hxCurrentUrl);
    if (hxCurrentUrl == null) {
      rc.reroute("/index.html");
      return;
    }

    if (path.endsWith("/")) {
      rc.reroute(path + "index.html");
      return;
    }

//    final var indexOfDot = path.lastIndexOf(".");
//    final var count = path.chars().filter(ch -> ch == '/').count();
//
//    if (indexOfDot == -1 && count == 1) {
//      final var newRoute = path + ".html";
//      //log.info("reroute {}", newRoute);
//      rc.reroute(newRoute);
//      return;
//    }

//    if (hxCurrentUrl == null &&
//        !(path.endsWith(".js") || path.endsWith(".css") || path.endsWith(".svg") || path.endsWith(".png") || path.endsWith(".ico"))) {
//      rc.reroute("/");
//      return;
//    }
    //log.info("next route");
    /*if (indexOfDot == -1 && !path.startsWith(managementPath)
        && (count == 1 || !path.startsWith("/api"))) {
      rc.reroute(path + ".html");
      return;
    }*/
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

  @Route(path = BUILDING_EDIT + "/:building", methods = Route.HttpMethod.GET)
  void edit(@Param String building, RoutingContext routingContext) {
    final var hxCurrentUrl = routingContext.request().getHeader("Hx-Current-Url");
    final var str = StringUtil.trimFilter(building);
    log.info("edit {} hxCurrentUrl {}", str, hxCurrentUrl);
    if (str == null) {
      routingContext.redirect("/buildings");
    } else if (hxCurrentUrl == null) {
      routingContext.reroute("/index.html");
    } else if (str.equals("index.html")) {
      routingContext.next();
    } else {
      log.info("edit reroute");
      routingContext.reroute("/buildings/edit/index.html");
    }
  }

  @Route(path = "/receipts/pdfs/:id", methods = Route.HttpMethod.GET)
  void receiptPdfs(@Param String id, RoutingContext routingContext) {
    final var str = StringUtil.trimFilter(id);
    if (str == null) {
      routingContext.redirect("/receipts");
    } else if (id.equals("index.html")) {
      routingContext.next();
    } else {
      routingContext.reroute("/receipts/pdfs/index.html");
    }
  }

  @Route(path = "redirect", methods = HttpMethod.GET)
  void redirect(RoutingContext rc) {
    final var value = StringUtil.trimFilter(rc.request().getParam("v"));
    log.info("redirect {}", value);
    if (value == null) {
      rc.response().setStatusCode(404).end();
    } else {
      final var count = StringUtils.countMatches(value, "/");
      log.info("count {}", count);
      if (count > 1) {
        rc.redirect(value);
      } else {
        rc.reroute(value);
      }


//      rc.response().setStatusCode(Status.PERMANENT_REDIRECT.getStatusCode());
//      rc.redirect(value);
    }
  }

}
