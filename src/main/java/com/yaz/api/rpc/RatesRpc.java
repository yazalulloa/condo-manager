package com.yaz.api.rpc;

import com.yaz.api.domain.response.RateTableItem;
import com.yaz.api.resource.RateResource;
import com.yaz.api.resource.fragments.Fragments;
import com.yaz.core.service.SaveNewBcvRate;
import com.yaz.core.service.entity.RateService;
import com.yaz.core.util.DateUtil;
import com.yaz.core.util.MutinyUtil;
import com.yaz.persistence.domain.query.RateQuery;
import com.yaz.persistence.entities.Rate;
import io.quarkus.qute.TemplateInstance;
import io.smallrye.mutiny.Uni;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import java.util.Collection;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jboss.resteasy.reactive.RestQuery;

@Slf4j
@Path("/rpc/rates")
@RequiredArgsConstructor
public class RatesRpc {

  private final RateService service;
  private final VertxFileSystemExample vertxFileSystemExample;
  private final SaveNewBcvRate saveNewBcvRate;

  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public Uni<RateRes> rates(@RestQuery Long lastId, @RestQuery String date) {

    final var rateQuery = RateQuery.builder()
        .lastId(lastId == null ? 0 : lastId)
        .date(DateUtil.isValidLocalDate(date) ? date : null)
        .build();

    return service.table(rateQuery, RateResource.PATH)
        .map(table -> {
          final var results = table.results().stream()
              .map(RateTableItem::rate)
              .toList();

          return RateRes.builder()
              .totalCount(table.totalCount())
              .results(results)
              .build();
        });
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
  @Path("/data")
  @Produces(MediaType.TEXT_PLAIN)
  public String data() {
    return vertxFileSystemExample.data();
  }

  @Data
  @Builder
  public static class RateRes {

    private final long totalCount;
    private final Collection<Rate> results;
  }

}
