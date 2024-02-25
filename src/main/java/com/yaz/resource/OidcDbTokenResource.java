package com.yaz.resource;

import com.yaz.persistence.domain.OidcDbTokenQueryRequest;
import com.yaz.resource.domain.response.OidcDbTokenTableResponse;
import com.yaz.service.OidcDbTokenService;
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

    public static native TemplateInstance tokens(OidcDbTokenTableResponse res);

    public static native TemplateInstance counters(long totalCount);
  }

  @GET
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> tokens(@RestQuery String lastId) {

    final var query = OidcDbTokenQueryRequest.builder()
        .lastId(lastId)
        .build();

    return service.tableResponse(query)
        .map(Templates::tokens);
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
