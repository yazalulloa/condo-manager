package com.yaz.resource;

import io.quarkus.qute.CheckedTemplate;
import io.quarkus.qute.TemplateInstance;
import io.smallrye.mutiny.Uni;
import jakarta.inject.Inject;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import com.yaz.persistence.domain.Currency;
import com.yaz.persistence.domain.RateQuery;
import com.yaz.persistence.entities.Rate;
import com.yaz.resource.domain.RateTableResponse;
import com.yaz.service.RateService;
import com.yaz.service.SaveNewBcvRate;
import com.yaz.util.DateUtil;
import com.yaz.util.MutinyUtil;
import org.jboss.resteasy.reactive.RestPath;
import org.jboss.resteasy.reactive.RestQuery;


@Path(RateResource.PATH)
@Slf4j
//@Authenticated
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class RateResource {

  public static final String PATH = "/api/rates";
  public static final String DELETE_PATH = PATH + "/";

  private final SaveNewBcvRate saveNewBcvRate;
  private final RateService service;

  @CheckedTemplate
  public static class Templates {

    public static native TemplateInstance rates(RateTableResponse res);
  }


  @GET
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> rates(@RestQuery Long lastId, @RestQuery String date) {

    final var rateQuery = RateQuery.builder()
        .lastId(lastId == null ? 0 : lastId)
        .date(DateUtil.isValidLocalDate(date) ? date : null)
        .build();

    return service.table(rateQuery)
        .map(Templates::rates);
  }

  @DELETE
  @Path("{id}")
  @Produces
  public Uni<Response> delete(
//      @CookieParam("csrf-token") Cookie csrfCookie, @FormParam("csrf-token") String formCsrfToken,
//      @HeaderParam("X-Csrf-Token") String headerCsrfToken,
      @RestPath long id) {

    //log.info("headerCsrfToken {} formCsrfToken {} cookie {}", headerCsrfToken, formCsrfToken, csrfCookie);
    log.info("Deleting {}", id);
    return service.delete(id)
        .map(l -> {
          log.info("Rate delete {} deleted {}", id, l);
          return Response.ok().build();
        });
  }

  @GET
  @Path("bcv-lookup")
  @Produces(MediaType.APPLICATION_JSON)
  public Uni<Response> bcvLookup() {
    return MutinyUtil.toUni(saveNewBcvRate.saveNewRate())
        .onItem()
        .ignore()
        .andSwitchTo(() -> Uni.createFrom().item(Response.noContent().build()));
  }


  @GET
  @Path("last")
  @Produces(MediaType.APPLICATION_JSON)
  public Uni<Rate> rate() {
    return MutinyUtil.toUni(service.last(Currency.USD, Currency.VED));
  }
}
