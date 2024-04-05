package com.yaz.core.client;

import io.smallrye.mutiny.Uni;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.HEAD;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

@RegisterRestClient(configKey = "bcv-api")
public interface RestBcvClient {

  @GET
  @Produces(MediaType.TEXT_HTML)
  Uni<Response> getBcv();


  @HEAD
  @Produces(MediaType.TEXT_HTML)
  Uni<Response> headBcv();
}
