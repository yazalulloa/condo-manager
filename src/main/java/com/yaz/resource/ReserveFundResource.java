package com.yaz.resource;

import com.yaz.service.ReserveFundService;
import io.smallrye.mutiny.Uni;
import jakarta.inject.Inject;
import jakarta.validation.constraints.NotBlank;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jboss.resteasy.reactive.RestPath;

@Path(ReserveFundResource.PATH)
@Slf4j
//@Authenticated
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class ReserveFundResource {

  public static final String PATH = "/api/reserve_funds";
  public static final String DELETE_PATH = PATH + "/";

  private final ReserveFundService service;

  @DELETE
  @Path("{buildingId}/{id}")
  public Uni<Response> delete(@NotBlank @RestPath String buildingId, @NotBlank @RestPath String id) {
    return service.delete(buildingId, id)
        .replaceWith(Response.ok().build());
  }
}
