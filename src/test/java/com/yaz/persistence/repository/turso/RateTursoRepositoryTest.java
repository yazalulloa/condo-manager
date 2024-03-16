package com.yaz.persistence.repository.turso;

import com.yaz.persistence.domain.Currency;
import com.yaz.persistence.domain.query.RateQuery;
import com.yaz.persistence.entities.Rate;
import com.yaz.persistence.entities.Rate.Source;
import com.yaz.persistence.repository.turso.client.TursoService;
import com.yaz.util.MutinyUtil;
import com.yaz.util.PagingJsonFile;
import com.yaz.util.RxUtil;
import com.yaz.util.SqlUtil;
import io.quarkus.test.junit.QuarkusTest;
import jakarta.inject.Inject;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;
import org.junit.jupiter.api.Test;

@QuarkusTest
class RateTursoRepositoryTest {

  @Inject
  RateTursoRepository repository;
  @Inject
  TursoService service;

  @Test
  void exists() {
    final var exists = repository.exists(2655678915L).await().indefinitely();
    System.out.println(exists);
  }

  @Test
  void last() {
    final var last = repository.last(Currency.USD, Currency.VED).await().indefinitely();
    System.out.println(last);
  }

  @Test
  void listRows() {
    final var list = repository.listRows(RateQuery.builder().lastId(45).build()).await().indefinitely();
    System.out.println(list);
  }

  @Test
  void save() {
    final var rate = Rate.builder()
        .fromCurrency(Currency.USD)
        .toCurrency(Currency.VED)
        .rate(BigDecimal.valueOf(12.42))
        .dateOfRate(LocalDate.now())
        .source(Source.BCV)
        .build();
    final var optional = repository.save(rate).await().indefinitely();
    System.out.println(optional);
  }

  @Test
  void migrate() {
    final var pagingJsonFile = new PagingJsonFile();

    final var sql = "INSERT INTO rates (from_currency, to_currency, rate, date_of_rate, source, created_at, hash, etag, last_modified) VALUES ";
    final var counter = new AtomicLong(0);

    final var completable = pagingJsonFile.pagingJsonFile(50, "tmp/ps/rates.json.gz", Rate.class, list -> {

      final var values = list.stream()
          .map(rate -> {
            final var params = List.<String>of(
                SqlUtil.escape(rate.fromCurrency().name()),
                SqlUtil.escape(rate.toCurrency().name()),
                rate.rate().toString(),
                SqlUtil.escape(rate.dateOfRate().toString()),
                SqlUtil.escape(rate.source().name()),
                SqlUtil.escape(SqlUtil.SQLITE_DATE_TIME_FORMATTER.format(rate.createdAt())),
                Optional.ofNullable(rate.hash()).map(Object::toString).orElse("null"),
                Optional.ofNullable(rate.etag()).map(SqlUtil::escape).orElse("null"),
                Optional.ofNullable(rate.lastModified()).map(SqlUtil::escape).orElse("null")
            );

            return "(%s)".formatted(String.join(",", params));
          }).collect(Collectors.joining(","));

      final var query = sql + values;

      counter.addAndGet(list.size());

      return RxUtil.toSingle(service.executeQuery(query))
          .ignoreElement();
    });

    MutinyUtil.toUni(completable).await().indefinitely();

    System.out.println(counter.get());
  }
}