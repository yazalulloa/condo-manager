package com.yaz.persistence.repository.turso;

import com.yaz.core.util.SqlUtil;
import com.yaz.core.util.StringUtil;
import com.yaz.persistence.domain.Currency;
import com.yaz.persistence.domain.query.RateQuery;
import com.yaz.persistence.domain.query.SortOrder;
import com.yaz.persistence.entities.Rate;
import com.yaz.persistence.repository.RateRepository;
import com.yaz.persistence.repository.turso.client.TursoWsService;
import com.yaz.persistence.repository.turso.client.ws.request.Stmt;
import com.yaz.persistence.repository.turso.client.ws.request.Value;
import com.yaz.persistence.repository.turso.client.ws.response.ExecuteResp.Row;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
//@LookupIfProperty(name = "app.repository.impl", stringValue = "turso")
//@Named("turso")
@ApplicationScoped
@RequiredArgsConstructor
public class RateTursoRepository implements RateRepository {

  private static final String COLLECTION = "rates";
  private static final String SELECT = "SELECT * FROM %s %s ORDER BY id %s LIMIT ?";
  private static final String DELETE_BY_ID = "DELETE FROM %s WHERE id = ?".formatted(COLLECTION);
  private static final String LAST = "SELECT * FROM %s WHERE from_currency = ? AND to_currency = ? ORDER BY id DESC LIMIT 1".formatted(
      COLLECTION);
  private static final String HASH_EXISTS = "SELECT id FROM %s WHERE hash = ? LIMIT 1".formatted(COLLECTION);

  private static final String INSERT_BULK = """
      INSERT INTO %s (from_currency, to_currency, rate, date_of_rate, source, created_at, hash, etag, last_modified) VALUES %s
      """;

  private static final String INSERT = """
      INSERT INTO %s (from_currency, to_currency, rate, date_of_rate, source, hash, etag, last_modified) VALUES (%s) returning id
      """.formatted(COLLECTION, SqlUtil.params(8));

  private static final String READ = "SELECT * FROM %s WHERE id = ?".formatted(COLLECTION);

  private final TursoWsService tursoWsService;

  @Override
  public Uni<Long> count() {
    return tursoWsService.count("id", COLLECTION);
  }

  @Override
  public Uni<Integer> delete(long id) {

    return tursoWsService.executeQuery(Stmt.stmt(DELETE_BY_ID, Value.number(id)))
        .map(executeResp -> executeResp.result().rowCount());
  }

  @Override
  public Uni<List<Rate>> listRows(RateQuery query) {

    final var whereParams = new ArrayList<String>(2);
    final var values = new ArrayList<Value>(2);

    Optional.of(query.lastId())
        .filter(l -> l > 0)
        .ifPresent(lastId -> {

          final var direction = query.sortOrder() == SortOrder.DESC ? "<" : ">";
          whereParams.add("id %s ?".formatted(direction));
          values.add(Value.number(lastId));
        });

    final var date = StringUtil.trimFilter(query.date());

    if (date != null) {
      whereParams.add("date_of_rate <= ?");
      values.add(Value.text(date));
    }

    var whereClause = String.join(" AND ", whereParams);
    if (!whereClause.isEmpty()) {
      whereClause = " WHERE " + whereClause;
    }

    values.add(Value.number(query.limit()));
    final var sql = SELECT.formatted(COLLECTION, whereClause, query.sortOrder());
    return tursoWsService.selectQuery(sql, values, this::from);
  }

  @Override
  public Uni<Optional<Long>> save(Rate rate) {

    final var stmt = Stmt.stmt(INSERT, Value.enumV(rate.fromCurrency()), Value.enumV(rate.toCurrency()),
        Value.number(rate.rate()), Value.text(rate.dateOfRate()), Value.enumV(rate.source()), Value.number(rate.hash()),
        Value.text(rate.etag()), Value.text(rate.lastModified()));
    return tursoWsService.selectOne(stmt, row -> row.getLong("id"));
  }


  @Override
  public Uni<Integer> insert(Collection<Rate> rates) {
    final var values = new Value[rates.size() * 9];

    var i = 0;
    for (Rate rate : rates) {
      values[i++] = Value.enumV(rate.fromCurrency());
      values[i++] = Value.enumV(rate.toCurrency());
      values[i++] = Value.number(rate.rate());
      values[i++] = Value.text(rate.dateOfRate());
      values[i++] = Value.enumV(rate.source());
      values[i++] = Value.text(rate.createdAt());
      values[i++] = Value.number(rate.hash());
      values[i++] = Value.text(rate.etag());
      values[i++] = Value.text(rate.lastModified());
    }

    final var sql = INSERT_BULK.formatted(COLLECTION, SqlUtil.valuesParams(9, rates.size()));

    return tursoWsService.executeQuery(sql, values)
        .map(executeResp -> executeResp.result().rowCount());
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
    return tursoWsService.selectOne(Stmt.stmt(LAST, Value.enumV(fromCurrency), Value.enumV(toCurrency)), this::from);
  }

  @Override
  public Uni<Boolean> exists(long hash) {
    return tursoWsService.selectOne(Stmt.stmt(HASH_EXISTS, Value.number(hash)), row -> row.getLong("id") != null)
        .map(opt -> opt.orElse(false));
  }

  @Override
  public Uni<Boolean> exists(BigDecimal rate, LocalDate dateOfRate) {
    final var sql = "SELECT id FROM %s WHERE rate = ? AND date_of_rate = ? LIMIT 1".formatted(COLLECTION);
    return tursoWsService.exists(Stmt.stmt(sql, Value.number(rate), Value.text(dateOfRate)));
  }

  @Override
  public Uni<Optional<Rate>> read(long id) {
    return tursoWsService.selectOne(Stmt.stmt(READ.formatted(COLLECTION), Value.number(id)), this::from);
  }
}
