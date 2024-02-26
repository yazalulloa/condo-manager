package com.yaz.resource;

import com.yaz.persistence.domain.Currency;
import com.yaz.persistence.domain.query.RateQuery;
import com.yaz.persistence.entities.Rate;
import com.yaz.resource.domain.response.RateTableResponse;
import com.yaz.service.RateService;
import com.yaz.service.SaveNewBcvRate;
import com.yaz.util.DateUtil;
import com.yaz.util.MutinyUtil;
import io.quarkus.qute.CheckedTemplate;
import io.quarkus.qute.TemplateInstance;
import io.quarkus.security.identity.SecurityIdentity;
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
  @Inject
  SecurityIdentity identity;

  @CheckedTemplate
  public static class Templates {

    public static native TemplateInstance rates(RateTableResponse res);

    public static native TemplateInstance counters(long totalCount);
  }

  @GET
  @Path("counters")
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> counters() {
    return service.count()
        .map(Templates::counters);
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
  public Uni<TemplateInstance> delete(
//      @CookieParam("csrf-token") Cookie csrfCookie, @FormParam("csrf-token") String formCsrfToken,
//      @HeaderParam("X-Csrf-Token") String headerCsrfToken,
      @RestPath long id) {

    //log.info("headerCsrfToken {} formCsrfToken {} cookie {}", headerCsrfToken, formCsrfToken, csrfCookie);

    return service.delete(id)
        .replaceWith(counters());
  }

  @GET
  @Path("bcv-lookup")
  @Produces(MediaType.APPLICATION_JSON)
  public Uni<Response> bcvLookup() {
    return MutinyUtil.toUni(saveNewBcvRate.saveNewRate())
        .onItem().invoke(res -> log.info("BCV LOOKUP {}", res))
        .replaceWith(Response.noContent().build());
  }


  @GET
  @Path("last")
  @Produces(MediaType.APPLICATION_JSON)
  public Uni<Rate> rate() {
    return MutinyUtil.toUni(service.last(Currency.USD, Currency.VED));
  }
}
