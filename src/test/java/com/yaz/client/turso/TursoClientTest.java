package com.yaz.client.turso;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.yaz.core.client.turso.TursoClient;
import com.yaz.core.client.turso.request.TursoQuery;
import com.yaz.persistence.domain.query.SortOrder;
import com.yaz.core.service.entity.RateService;
import com.yaz.core.util.MutinyUtil;
import com.yaz.core.util.RxUtil;
import com.yaz.core.util.SqlUtil;
import io.quarkus.test.junit.QuarkusTest;
import io.reactivex.rxjava3.core.Completable;
import io.smallrye.mutiny.Uni;
import io.vertx.core.json.Json;
import io.vertx.core.json.JsonObject;
import jakarta.inject.Inject;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.eclipse.microprofile.rest.client.inject.RestClient;
import org.junit.jupiter.api.Test;

@Slf4j
@QuarkusTest
class TursoClientTest {

  @Inject
  @RestClient
  TursoClient tursoClient;
  @Inject
  RateService rateService;



  @Test
  void version() {
    Uni.combine().all()
        .unis(
            tursoClient.health().invoke(str -> log.info("health {}", str)),
            tursoClient.version().invoke(str -> log.info("version {}", str)),
            tursoClient.v2().invoke(str -> log.info("v2 {}", str)),
            tursoClient.v3().invoke(str -> log.info("v3 {}", str)),
            tursoClient.v3Protobuf().invoke(str -> log.info("v3Protobuf {}", str))
//            ,tursoClient.queryV3().invoke(str -> log.info("queryV3 {}", str))
        )
        .asTuple()
        .await()
        .indefinitely();
  }

  @Test
  void selectRates() {

    final var tursoQuery = TursoQuery.simple("select * from rates");

    final var string = Json.encode(tursoQuery);

    System.out.println(string);

    final var response = tursoClient.query(tursoQuery).await().indefinitely();
    final var entity = response.readEntity(String.class);
    System.out.println(new JsonObject(entity).encodePrettily());

  }

  @Test
  void migrate() {

    final var sql = "INSERT INTO rates (from_currency, to_currency, rate, date_of_rate, source, created_at, hash, etag, last_modified) VALUES ";

    final var pagingProcessor = rateService.pagingProcessor(30, SortOrder.ASC);

    Function<String, String> escapeStr = s -> "'" + s + "'";

    final var completable = RxUtil.paging(pagingProcessor, list -> {

      final var values = list.stream()
          .map(rate -> {
            final var params = List.<String>of(
                escapeStr.apply(rate.fromCurrency().name()),
                escapeStr.apply(rate.toCurrency().name()),
                rate.rate().toString(),
                escapeStr.apply(rate.dateOfRate().toString()),
                escapeStr.apply(rate.source().name()),
                escapeStr.apply(SqlUtil.SQLITE_DATE_TIME_FORMATTER.format(rate.createdAt())),
                Optional.ofNullable(rate.hash()).map(Object::toString).orElse("null"),
                Optional.ofNullable(rate.etag()).map(escapeStr).orElse("null"),
                Optional.ofNullable(rate.lastModified()).map(escapeStr).orElse("null")
            );

            return "(%s)".formatted(String.join(",", params));
          }).collect(Collectors.joining(","));

      final var query = sql + values;

      final var tursoQuery = TursoQuery.simple(query);

      return MutinyUtil.single(tursoClient.query(tursoQuery))
          .flatMapCompletable(response -> {
            final var entity = response.readEntity(String.class);
            System.out.println(new JsonObject(entity).encodePrettily());

            return Completable.complete();
          });
    });

    completable.blockingAwait();

  }


}