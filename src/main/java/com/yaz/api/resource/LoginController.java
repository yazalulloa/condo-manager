package com.yaz.api.resource;

import com.yaz.core.service.entity.OidcDbTokenService;
import com.yaz.persistence.entities.User;
import io.quarkiverse.renarde.security.ControllerWithUser;
import io.quarkiverse.renarde.security.RenardeSecurity;
import io.quarkus.qute.CheckedTemplate;
import io.quarkus.qute.TemplateInstance;
import io.smallrye.mutiny.Uni;
import io.vertx.core.http.Cookie;
import io.vertx.ext.web.RoutingContext;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Path("Login")
@RequiredArgsConstructor
public class LoginController extends ControllerWithUser<User> {

  //  private final Template login;
  private final OidcDbTokenService tokenService;
  private final RenardeSecurity security;

//  @Priority(0)
//  @Route(path = "/login.html", methods = HttpMethod.GET)
//  public void login(RoutingContext rc) {
//
//    for (Cookie cookie : rc.request().cookies()) {
//      final var name = cookie.getName();
//      if (name.endsWith("auth_session")) {
//        final var value = cookie.getValue();
//        rc.response().removeCookie(name);
//        tokenService.delete(value)
//            .subscribe().with(
//                i -> log.debug("Deleted token: {} {} {}", name, value, i),
//                e -> log.error("ERROR deleting token: {} {}", name, value, e));
//      }
//    }
//
//    rc.next();
//  }

//  @GET
//  @NoCache
//  @Path("/login.html")
//  @Produces(MediaType.TEXT_HTML)
//  public TemplateInstance get() {
//    return login.instance();
//  }

  @CheckedTemplate
  static class Templates {

    public static native TemplateInstance login();
  }

  @GET
  public Uni<TemplateInstance> login(RoutingContext rc) {
    log.info("LoginController.login");
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
    return Uni.createFrom().item(Templates::login);
  }
}
