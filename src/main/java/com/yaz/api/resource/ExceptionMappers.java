package com.yaz.api.resource;

import io.quarkus.security.AuthenticationCompletionException;
import io.quarkus.security.UnauthorizedException;
import jakarta.ws.rs.NotFoundException;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.core.UriInfo;
import java.net.URI;
import java.net.URISyntaxException;
import lombok.extern.slf4j.Slf4j;
import org.jboss.resteasy.reactive.RestResponse;
import org.jboss.resteasy.reactive.server.ServerExceptionMapper;

@Slf4j
public class ExceptionMappers {

  @ServerExceptionMapper
  public RestResponse<String> mapException(UriInfo uriInfo, UnauthorizedException x) throws URISyntaxException {
    final var path = uriInfo.getPath();

    if (path.startsWith("/api")) {
      final var response = RestResponse.ok("");
      response.getHeaders().add("HX-Redirect", "/login.html");
      return response;
    }
    log.info("{}", uriInfo.getAbsolutePath());
    //return RestResponse.status(Response.Status.NOT_FOUND, "Unknown cheese: " + x.name);
    log.info("UnauthorizedException: " + x.getMessage());
    return RestResponse.temporaryRedirect(new URI("/login.html?redirect_to=" + path));
  }

  @ServerExceptionMapper
  public RestResponse<String> mapException(UriInfo uriInfo, AuthenticationCompletionException x) {
    //log.info("AuthenticationCompletionException {}", uriInfo.getAbsolutePath());
    final var response = RestResponse.ok("");
    response.getHeaders().add("HX-Redirect", "/login.html");
    return response;
  }

  @ServerExceptionMapper
  public RestResponse<String> mapException(UriInfo uriInfo, ContainerRequestContext requestContext, NotFoundException x)
      throws URISyntaxException {

    if (uriInfo.getPath().equals("/favicon.ico")
        || uriInfo.getPath().equals("/robots.txt")
        || uriInfo.getPath().equals("/login.html")) {
      return RestResponse.status(404, "Not Found");
    }

    final var principal = requestContext.getSecurityContext().getUserPrincipal();

    if (principal != null) {
      return RestResponse.temporaryRedirect(new URI("/"));
    }

    log.info("uriInfo.getPath(): " + uriInfo.getPath());

    log.error("NotFoundException: {}", x.getMessage());

    return RestResponse.temporaryRedirect(new URI("/login.html"));
  }
}
