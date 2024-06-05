package com.yaz.api.resource;

import com.yaz.api.domain.response.RateTableResponse;
import com.yaz.api.resource.fragments.Fragments;
import com.yaz.core.service.EncryptionService;
import com.yaz.core.service.SaveNewBcvRate;
import com.yaz.core.service.entity.RateService;
import com.yaz.core.util.DateUtil;
import com.yaz.core.util.MutinyUtil;
import com.yaz.persistence.domain.Currency;
import com.yaz.persistence.domain.query.RateQuery;
import com.yaz.persistence.entities.Rate;
import io.quarkus.qute.CheckedTemplate;
import io.quarkus.qute.TemplateInstance;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.Dependent;
import jakarta.inject.Inject;
import jakarta.validation.constraints.NotBlank;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.io.File;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jboss.resteasy.reactive.RestPath;
import org.jboss.resteasy.reactive.RestQuery;
import org.jboss.resteasy.reactive.RestResponse;
import org.jboss.resteasy.reactive.RestResponse.ResponseBuilder;


@Path(RateResource.PATH)
@Slf4j
//@Authenticated
@RequiredArgsConstructor
public class RateResource {

  public static final String PATH = "/api/rates";
  public static final String DELETE_PATH = PATH + "/";

  private final SaveNewBcvRate saveNewBcvRate;
  private final RateService service;
  private final EncryptionService encryptionService;

  @CheckedTemplate
  public static class Templates {

    public static native TemplateInstance rates(RateTableResponse res);

    public static native TemplateInstance counters(long totalCount);

    public static native TemplateInstance options(RateTableResponse res);
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
  public Uni<TemplateInstance> rates(@RestQuery String nextPage, @RestQuery String date) {

    final var lastId = Optional.ofNullable(nextPage)
        .map(String::trim)
        .filter(s -> !s.isEmpty())
        .map(encryptionService::decrypt)
        .map(Long::parseLong)
        .orElse(0L);

    final var rateQuery = RateQuery.builder()
        .lastId(lastId)
        .date(DateUtil.isValidLocalDate(date) ? date : null)
        .build();

    return service.table(rateQuery, RateResource.PATH)
        .map(Templates::rates);
  }

  @DELETE
  @Path("{str}")
  @Produces
  public Uni<TemplateInstance> delete(
//      @CookieParam("csrf-token") Cookie csrfCookie, @FormParam("csrf-token") String formCsrfToken,
//      @HeaderParam("X-Csrf-Token") String headerCsrfToken,
      @RestPath @NotBlank String str) {

    //log.info("headerCsrfToken {} formCsrfToken {} cookie {}", headerCsrfToken, formCsrfToken, csrfCookie);
    final var id = Long.parseLong(encryptionService.decrypt(str));
    return service.delete(id)
        .replaceWith(counters());
  }

  @GET
  @Path("bcv-lookup")
  @Produces(MediaType.APPLICATION_JSON)
  public Uni<TemplateInstance> bcvLookup() {
    log.info("INIT_BCV_LOOKUP");
    return MutinyUtil.toUni(saveNewBcvRate.saveNewRate())
        .onItem().invoke(res -> log.info("BCV LOOKUP {}", res))
        .map(result -> result.state().name())
        .map(Fragments::rateInfo)
        //.replaceWith(Response.noContent().build())
        ;
  }


  @GET
  @Path("last")
  @Produces(MediaType.APPLICATION_JSON)
  public Uni<Rate> rate() {
    return MutinyUtil.toUni(service.last(Currency.USD, Currency.VED));
  }

  @GET
  @Path("download")
  public Response redirectToDownload() {
    return Response.ok()
        .header("HX-Redirect", "/api/rates/file")
        .build();
  }

  @GET
  @Path("file")
  @Produces(MediaType.MULTIPART_FORM_DATA)
  public Uni<RestResponse<File>> downloadFile() {
    return MutinyUtil.toUni(service.downloadFile())
        .map(file -> ResponseBuilder.ok(file.path())
            .header("Content-Disposition", "attachment; filename=" + file.fileName())
            .build());
  }

  @GET
  @Path("options")
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> options(@RestQuery String nextPage) {

    final var lastId = Optional.ofNullable(nextPage)
        .map(String::trim)
        .filter(s -> !s.isEmpty())
        .map(encryptionService::decrypt)
        .map(Long::parseLong)
        .orElse(0L);

    final var rateQuery = RateQuery.builder()
        .lastId(lastId)
        .build();

    return service.table(rateQuery, "/api/rates/options")
        .map(Templates::options);
  }

}
