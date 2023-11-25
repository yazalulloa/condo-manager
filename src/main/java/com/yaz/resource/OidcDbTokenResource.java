package com.yaz.resource;

import io.quarkus.qute.CheckedTemplate;
import io.quarkus.qute.TemplateInstance;
import io.quarkus.security.Authenticated;
import io.smallrye.mutiny.Uni;
import jakarta.inject.Inject;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import com.yaz.persistence.domain.OidcDbTokenQueryRequest;
import com.yaz.resource.domain.OidcDbTokenTableResponse;
import com.yaz.service.OidcDbTokenService;
import org.jboss.resteasy.reactive.RestPath;
import org.jboss.resteasy.reactive.RestQuery;

@Slf4j
@Authenticated
@Path(OidcDbTokenResource.PATH)
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class OidcDbTokenResource {

  public static final String PATH = "/api/oidc_tokens";
  public static final String DELETE_PATH = PATH + "/";
  public static final String GRID_PATH = PATH + "/grid";

  private final OidcDbTokenService service;

  @CheckedTemplate
  public static class Templates {

    public static native TemplateInstance grid(OidcDbTokenTableResponse res);

    public static native TemplateInstance counters(long totalCount);
  }

  @GET
  @Path("grid")
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> grid(@RestQuery String lastId) {

    final var apartmentQuery = OidcDbTokenQueryRequest.builder()
        .lastId(lastId)
        .build();

    return service.tableResponse(apartmentQuery)
        .map(Templates::grid);
  }

  @GET
  @Path("counters")
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> counters() {
    return service.count()
        .map(Templates::counters);
  }

  @DELETE
  @Path("{id}")
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> delete(@RestPath String id) {

    log.info("Deleting {}", id);
    return service.delete(id)
        .invoke(l -> log.info("OidcDbToken delete {} deleted {}", id, l))
        .replaceWith(counters());
  }
}
