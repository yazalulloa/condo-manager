package com.yaz.persistence.repository.turso;

import com.yaz.client.turso.response.TursoResponse;
import com.yaz.client.turso.response.TursoResponse.Row;
import com.yaz.persistence.domain.Currency;
import com.yaz.persistence.domain.query.RateQuery;
import com.yaz.persistence.domain.query.SortOrder;
import com.yaz.persistence.entities.Rate;
import com.yaz.persistence.repository.RateRepository;
import com.yaz.util.SqlUtil;
import io.quarkus.arc.lookup.LookupIfProperty;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@LookupIfProperty(name = "app.repository.impl", stringValue = "turso")
//@Named("turso")
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class RateTursoRepository implements RateRepository {

  private static final String COLLECTION = "rates";
  private static final String SELECT = "SELECT * FROM rates %s ORDER BY id %s LIMIT %s";
  private static final String DELETE_BY_ID = "DELETE FROM rates WHERE id = %s";
  private static final String LAST = "SELECT * FROM rates WHERE from_currency = '%s' AND to_currency = '%s' ORDER BY id DESC LIMIT 1";
  private static final String HASH_EXISTS = "SELECT id FROM rates WHERE hash = %s LIMIT 1";
  private static final String INSERT = "INSERT INTO rates (from_currency, to_currency, rate, date_of_rate, source, hash, etag, last_modified) VALUES (%s) returning id";

  private final TursoService tursoService;

  @Override
  public Uni<Long> count() {
    return tursoService.count("id", COLLECTION);
  }

  @Override
  public Uni<Integer> delete(long id) {
    return tursoService.executeQuery(DELETE_BY_ID.formatted(id))
        .map(TursoResponse::affectedRows);
  }

  @Override
  public Uni<List<Rate>> listRows(RateQuery query) {

    final var whereParams = new ArrayList<String>();

    Optional.of(query.lastId())
        .filter(l -> l > 0)
        .ifPresent(lastId -> {

          final var direction = query.sortOrder() == SortOrder.DESC ? "<" : ">";
          whereParams.add("id %s %d".formatted(direction, lastId));
        });

    Optional.ofNullable(query.date())
        .map(String::trim)
        .filter(s -> !s.isEmpty())
        .map("date_of_rate <= '%s'"::formatted)
        .ifPresent(whereParams::add);

    var whereClause = String.join(" AND ", whereParams);
    if (!whereClause.isEmpty()) {
      whereClause = " WHERE " + whereClause;
    }

    final var sql = SELECT.formatted(whereClause, query.sortOrder(), query.limit());

    return tursoService.executeQuery(sql)
        .map(TursoResponse::values)
        .map(rows -> SqlUtil.toList(rows, this::from));
  }

  @Override
  public Uni<Optional<Long>> save(Rate rate) {

    final var params = Stream.of(
            rate.fromCurrency().name(),
            rate.toCurrency().name(),
            rate.rate(),
            rate.dateOfRate(),
            rate.source().name(),
            rate.hash(),
            rate.etag(),
            rate.lastModified()
        )
        .map(SqlUtil::escape)
        .collect(Collectors.joining(","));

    final var sql = INSERT.formatted(params);

    return tursoService.executeQuery(sql)
        .map(TursoResponse::values)
        .map(rows -> {
          if (rows.isEmpty()) {
            return Optional.empty();
          } else {
            return Optional.ofNullable(rows.getFirst())
                .map(row -> row.getLong("id"));
          }
        });
  }

  private Rate from(Row row) {
    return Rate.builder()
        .id(row.getLong("id"))
        .fromCurrency(row.getEnum("from_currency", Currency::valueOf))
        .toCurrency(row.getEnum("to_currency", Currency::valueOf))
        .rate(row.getBigDecimal("rate"))
        .dateOfRate(row.getLocalDate("date_of_rate"))
        .source(row.getEnum("source", Rate.Source::valueOf))
        .createdAt(row.getLocalDateTime("created_at"))
        .description(row.getString("description"))
        .hash(row.getLong("hash"))
        .etag(row.getString("etag"))
        .lastModified(row.getString("last_modified"))
        .build();
  }

  @Override
  public Uni<Optional<Rate>> last(Currency fromCurrency, Currency toCurrency) {
    return tursoService.executeQuery(LAST.formatted(fromCurrency, toCurrency))
        .map(TursoResponse::values)
        .map(values -> {

          if (values.isEmpty()) {
            return Optional.empty();
          }

          return Optional.ofNullable(from(values.getFirst()));
        });
  }

  @Override
  public Uni<Boolean> exists(long hash) {
    return tursoService.executeQuery(HASH_EXISTS.formatted(hash))
        .map(res -> {

          return res.firstRow()
              .map(row -> row.getFirst() != null)
              .orElse(false);
        });
  }
}
