package com.yaz.api.resource;

import com.yaz.core.service.entity.OidcDbTokenService;
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
  private final OidcDbTokenService tokenService;

  @Priority(0)
  @Route(path = "/login.html", methods = HttpMethod.GET)
  public void login(RoutingContext rc) {

    for (Cookie cookie : rc.request().cookies()) {
      final var name = cookie.getName();
      if (name.endsWith("auth_session")) {
        final var value = cookie.getValue();
        rc.response().removeCookie(name);
        tokenService.delete(value)
            .subscribe().with(
                i -> log.debug("Deleted token: {} {} {}", name, value, i),
                e -> log.error("ERROR deleting token: {} {}", name, value, e));
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
