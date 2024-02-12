package com.yaz.resource.rpc;

import com.yaz.persistence.domain.query.RateQuery;
import com.yaz.persistence.entities.Rate;
import com.yaz.resource.domain.response.RateTableResponse.Item;
import com.yaz.service.RateService;
import com.yaz.util.DateUtil;
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
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class RatesRpc {

  private final RateService service;

  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public Uni<RateRes> rates(@RestQuery Long lastId, @RestQuery String date) {

    final var rateQuery = RateQuery.builder()
        .lastId(lastId == null ? 0 : lastId)
        .date(DateUtil.isValidLocalDate(date) ? date : null)
        .build();

    return service.table(rateQuery)
        .map(table -> {
          final var results = table.getResults().stream()
              .map(Item::getRate)
              .toList();

          return RateRes.builder()
              .totalCount(table.getTotalCount())
              .results(results)
              .build();
        });
  }

  @Data
  @Builder
  public static class RateRes {

    private final long totalCount;
    private final Collection<Rate> results;
  }

}
