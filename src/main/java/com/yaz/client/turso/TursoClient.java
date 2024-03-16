package com.yaz.client.turso;

import com.yaz.client.turso.request.TursoQuery;
import io.smallrye.mutiny.Uni;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

@RegisterRestClient(configKey = "turso-db")
public interface TursoClient {

  @GET
  @Path("health")
  Uni<Response> health();

  @GET
  @Path("version")
  Uni<Response> version();

  @POST
  @Path("/v2/pipeline")
  @Produces(MediaType.APPLICATION_JSON)
  @Consumes(MediaType.APPLICATION_JSON)
  Uni<Response> query(TursoQuery query);


}
