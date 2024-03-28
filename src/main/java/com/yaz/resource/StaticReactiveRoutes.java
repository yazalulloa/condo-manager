package com.yaz.resource;

import io.quarkus.vertx.web.Route;
import io.quarkus.vertx.web.RouteFilter;
import io.vertx.ext.web.RoutingContext;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.Priorities;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerResponseContext;
import java.net.URI;
import java.util.Set;
import lombok.extern.slf4j.Slf4j;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.jboss.resteasy.reactive.server.ServerRequestFilter;
import org.jboss.resteasy.reactive.server.ServerResponseFilter;

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

    if (path.equals("/receipts")) {
     rc.next();
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
      final var newRoute = path + ".html";
      //log.info("reroute {}", newRoute);
      rc.reroute(newRoute);
      return;
    }
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

//  @ServerResponseFilter(priority = Priorities.AUTHENTICATION)
//  public void getFilter(ContainerResponseContext responseContext) {
//    Object entity = responseContext.getEntity();
//    log.info("response entity {}", entity);
//
//    if (responseContext.getLocation() != null) {
//      URI location = responseContext.getLocation();
//      log.info("response location {}", location);
//    }
//  }

}
