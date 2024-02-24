package com.yaz.resource;

import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerResponseContext;
import jakarta.ws.rs.container.ContainerResponseFilter;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.UriInfo;
import jakarta.ws.rs.ext.Provider;
import io.vertx.core.http.HttpServerRequest;
import java.io.IOException;
import lombok.extern.slf4j.Slf4j;

//@Provider
//@Slf4j
//public class GoogleAuthFilter implements ContainerResponseFilter {
//  @Context
//  UriInfo info;
//
//  @Context
//  HttpServerRequest request;
//  @Override
//  public void filter(ContainerRequestContext requestContext, ContainerResponseContext responseContext)
//      throws IOException {
//    final String method = requestContext.getMethod();
//    final String path = info.getPath();
//    final String address = request.remoteAddress().toString();
//
//    log.info("Request {} {} from IP {}", method, path, address);
//  }
//}
