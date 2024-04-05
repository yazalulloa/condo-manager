package com.yaz.core.client;

import io.smallrye.mutiny.Uni;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

@RegisterRestClient(configKey = "management-api")
public interface ManagementClient {

  @GET
  @Path("metrics")
  @Produces(MediaType.TEXT_PLAIN)
  Uni<String> metrics();

  @GET
  @Path("health/ready")
  @Produces(MediaType.APPLICATION_JSON)
  Uni<String> healthCheck();
}
