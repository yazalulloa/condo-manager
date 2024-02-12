package com.yaz.resource;

import io.quarkus.vertx.web.Route;
import io.quarkus.vertx.web.RouteFilter;
import io.vertx.ext.web.RoutingContext;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.Set;
import lombok.extern.slf4j.Slf4j;
import org.eclipse.microprofile.config.inject.ConfigProperty;

@Slf4j
@ApplicationScoped
public class StaticReactiveRoutes {

  private final Set<String> nextPaths;

  @Inject
  public StaticReactiveRoutes(
      @ConfigProperty(name = "app.management.path") String managementPath) {
    this.nextPaths = Set.of(managementPath, "/api", "/rpc");
  }

  @RouteFilter()
    //  (1)
  void rerouteStatic(RoutingContext rc) {
    final var path = rc.request().path();

    if (path.equals("/") || path.isEmpty()) {
      rc.reroute("/index");
      return;
    }

    final var indexOfDot = path.lastIndexOf(".");
    final var count = path.chars().filter(ch -> ch == '/').count();

    final var isNexPath = nextPaths.stream()
        .map(path::startsWith)
        .reduce(Boolean::logicalOr)
        .orElse(false);

    if (isNexPath) {
      //log.info("early_next {}", path);
      rc.next();
      return;
    }

    if (indexOfDot == -1 && count == 1) {
      rc.reroute(path + ".html");
      return;
    }
   // log.info("next route");
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

}
