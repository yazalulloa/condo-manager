package com.yaz.core.client.turso;

import com.yaz.core.client.turso.request.TursoQuery;
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
  Uni<String> health();

  @GET
  @Path("version")
  Uni<String> version();

  @GET
  @Path("v2")
  Uni<String> v2();

  @GET
  @Path("v3")
  Uni<String> v3();

  @GET
  @Path("v3-protobuf")
  Uni<String> v3Protobuf();

  @POST
  @Path("v3/pipeline")
  Uni<String> queryV3();

  @POST
  @Path("/v2/pipeline")
  @Produces(MediaType.APPLICATION_JSON)
  @Consumes(MediaType.APPLICATION_JSON)
  Uni<Response> query(TursoQuery query);


}
