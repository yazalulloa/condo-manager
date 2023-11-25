package com.yaz.resource;

import io.quarkus.vertx.web.Route;
import io.vertx.ext.web.RoutingContext;

public class StaticReactiveRoutes {



  @Route(path = "index.js", methods = Route.HttpMethod.GET)
  void indexJs(RoutingContext routingContext) {
    routingContext.reroute("/out/js/index.js");
  }

  @Route(path = "output.css", methods = Route.HttpMethod.GET)
  void cssFile(RoutingContext routingContext) {
    routingContext.reroute("/out/css/output.css");
  }

}
