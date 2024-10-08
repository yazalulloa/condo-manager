package com.yaz.api.resource;

import io.quarkus.security.AuthenticationCompletionException;
import io.quarkus.security.ForbiddenException;
import io.quarkus.security.UnauthorizedException;
import jakarta.ws.rs.NotFoundException;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.core.UriInfo;
import java.net.URI;
import java.net.URISyntaxException;
import lombok.extern.slf4j.Slf4j;
import org.jboss.resteasy.reactive.RestResponse;
import org.jboss.resteasy.reactive.RestResponse.Status;
import org.jboss.resteasy.reactive.server.ServerExceptionMapper;

@Slf4j
public class ExceptionMappers {

  @ServerExceptionMapper
  public RestResponse<String> forbiddenException(UriInfo uriInfo, ForbiddenException e) {
    log.error("ForbiddenException {}", uriInfo.getAbsolutePath(), e);
    return RestResponse.status(Status.FORBIDDEN);
  }

  @ServerExceptionMapper
  public RestResponse<String> mapException(UriInfo uriInfo, UnauthorizedException x) throws URISyntaxException {
    final var path = uriInfo.getPath();

    if (path.startsWith("/api")) {
      log.info("UnauthorizedException {}", uriInfo.getAbsolutePath(), x);
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
  public RestResponse<String> mapException(UriInfo uriInfo, ContainerRequestContext requestContext,
      AuthenticationCompletionException x)
      throws URISyntaxException {

    final var hxCurrent = requestContext.getHeaders().getFirst("Hx-Current-Url");
    if (hxCurrent != null) {

      log.info("AuthenticationCompletionException {}", uriInfo.getAbsolutePath(), x);
      final var response = RestResponse.ok("");
      response.getHeaders().add("HX-Redirect", "/login.html");
      return response;
    }

    return RestResponse.temporaryRedirect(new URI("/login.html"));
  }

  @ServerExceptionMapper
  public RestResponse<String> mapException(UriInfo uriInfo, ContainerRequestContext requestContext, NotFoundException x)
      throws URISyntaxException {

    if (uriInfo.getPath().equals("/favicon.ico")
        || uriInfo.getPath().equals("/robots.txt")
        || uriInfo.getPath().equals("/login.html")
        || uriInfo.getPath().contains("/examples/")) {
      return RestResponse.status(404, "Not Found");
    }

    final var principal = requestContext.getSecurityContext().getUserPrincipal();

    if (principal != null) {
      log.info("Redirect to / User principal: {}", principal);
      return RestResponse.temporaryRedirect(new URI("/"));
    }

    log.info("uriInfo.getPath(): " + uriInfo.getPath());

    log.error("NotFoundException: {}", x.getMessage());

    return RestResponse.temporaryRedirect(new URI("/login.html"));
  }
}
