package com.yaz.api.resource;

import io.quarkus.qute.Template;
import io.quarkus.qute.TemplateInstance;
import io.quarkus.vertx.web.Route;
import io.quarkus.vertx.web.Route.HttpMethod;
import io.vertx.core.http.Cookie;
import io.vertx.ext.web.RoutingContext;
import jakarta.annotation.Priority;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jboss.resteasy.reactive.NoCache;

@Slf4j
@RequiredArgsConstructor
@Path("")
public class LoginController {

  private final Template login;

  @Priority(0)
  @Route(path = "/login.html", methods = HttpMethod.GET)
  public void login(RoutingContext rc) {
    //log.info("login.html");
    for (Cookie cookie : rc.request().cookies()) {
      final var name = cookie.getName();
      if (name.endsWith("auth_session")) {
        log.info("Removing cookie: {}", name);
        rc.response().removeCookie(name);
      }
    }

    rc.next();
  }

  @GET
  @NoCache
  @Path("/login.html")
  @Produces(MediaType.TEXT_HTML)
  public TemplateInstance get() {
    return login.instance();
  }
}
