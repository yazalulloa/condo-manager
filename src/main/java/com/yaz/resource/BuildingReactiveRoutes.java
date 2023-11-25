package com.yaz.resource;

import io.quarkus.vertx.web.Param;
import io.quarkus.vertx.web.Route;
import io.vertx.ext.web.RoutingContext;
import jakarta.enterprise.context.ApplicationScoped;
import com.yaz.util.StringUtil;

@ApplicationScoped
public class BuildingReactiveRoutes {

  public static final String EDIT_PATH = "/buildings/edit/";

  @Route(path = EDIT_PATH + ":building", methods = Route.HttpMethod.GET)
  void edit(@Param String building, RoutingContext routingContext) {
    final var str = StringUtil.trimFilter(building);
    if (str == null) {
      routingContext.redirect("/buildings");
    } else {
      routingContext.reroute("/buildings/edit.html");
    }
  }
}
