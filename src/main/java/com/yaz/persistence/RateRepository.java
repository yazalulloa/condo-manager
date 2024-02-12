package com.yaz.persistence;

import io.smallrye.mutiny.Uni;
import io.vertx.mutiny.sqlclient.Row;
import io.vertx.mutiny.sqlclient.RowIterator;
import io.vertx.mutiny.sqlclient.RowSet;
import io.vertx.mutiny.sqlclient.SqlResult;
import io.vertx.mutiny.sqlclient.Tuple;
import io.vertx.sqlclient.impl.ArrayTuple;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicInteger;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import com.yaz.persistence.domain.Currency;
import com.yaz.persistence.domain.MySqlQueryRequest;
import com.yaz.persistence.domain.query.RateQuery;
import com.yaz.persistence.domain.query.SortOrder;
import com.yaz.persistence.entities.Rate;
import com.yaz.util.SqlUtil;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class RateRepository {

  private static final String COLLECTION = "rates";
  private static final String SELECT = "SELECT * FROM %s %s ORDER BY id DESC LIMIT ?";
  private static final String DELETE_BY_ID = "DELETE FROM %s WHERE id = ?".formatted(COLLECTION);
  private static final String INSERT = """
      INSERT INTO %s (from_currency, to_currency, rate, date_of_rate, source, created_at, hash, etag, last_modified) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      """.formatted(COLLECTION);

  private static final String FULL_INSERT = """
      INSERT IGNORE INTO %s (id, from_currency, to_currency, rate, date_of_rate, source, created_at, hash, etag, last_modified) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      """.formatted(COLLECTION);

  private static final String REPLACE = """
      REPLACE INTO %s (id, from_currency, to_currency, rate, date_of_rate, source, created_at, hash, etag, last_modified) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      """.formatted(COLLECTION);
  private static final String LAST = "SELECT * FROM rates WHERE from_currency = ? AND to_currency = ? ORDER BY id DESC LIMIT 1";
  private static final String HASH_EXISTS = "SELECT * FROM rates WHERE hash = ? LIMIT 1";

  private final MySqlService mySqlService;

  public Uni<Long> count() {
    return mySqlService.totalCount(COLLECTION);
  }

  public Uni<Integer> delete(long id) {

    return mySqlService.request(MySqlQueryRequest.normal(DELETE_BY_ID, Tuple.of(id)))
        .map(SqlResult::rowCount);
  }

  public Rate from(Row row) {
    return Rate.builder()
        .id(row.getLong("id"))
        .fromCurrency(Currency.valueOf(row.getString("from_currency")))
        .toCurrency(Currency.valueOf(row.getString("to_currency")))
        .rate(row.getBigDecimal("rate"))
        .dateOfRate(row.getLocalDate("date_of_rate"))
        .source(Rate.Source.valueOf(row.getString("source")))
        .createdAt(row.getLocalDateTime("created_at"))
        .hash(row.getLong("hash"))
        .etag(row.getString("etag"))
        .lastModified(row.getString("last_modified"))
        .build();
  }

  public Uni<List<Rate>> listRows(RateQuery query) {
    final var stringBuilder = new StringBuilder();

    final var tupleSize = new AtomicInteger(1);
    final var shouldSetAnd = new AtomicBoolean(false);

    final var lastIdOptional = Optional.of(query.lastId())
        .filter(l -> l > 0);

    lastIdOptional
        .ifPresent(str -> {
          final var direction = query.sortOrder() == SortOrder.DESC ? "<" : ">";
          stringBuilder.append(" id ").append(direction).append(" ?");
          tupleSize.incrementAndGet();
          shouldSetAnd.set(true);
        });

    Optional.ofNullable(query.date())
        .ifPresent(str -> {

          if (shouldSetAnd.get()) {
            stringBuilder.append(SqlUtil.AND);
          }

          stringBuilder.append(" date_of_rate <= ?");
          tupleSize.incrementAndGet();
          shouldSetAnd.set(true);
        });

    final var params = new ArrayTuple(tupleSize.get());

    lastIdOptional.ifPresent(params::addValue);
    Optional.ofNullable(query.date()).ifPresent(params::addValue);
    params.addValue(query.limit());

    final var queryRequest = MySqlQueryRequest.normal(
        SELECT.formatted(COLLECTION, stringBuilder.isEmpty() ? "" : "WHERE " + stringBuilder), params);

    return mySqlService.request(queryRequest)
        .map(rows -> SqlUtil.toList(rows, this::from));
  }

  public Uni<RowSet<Row>> fullSave(List<Rate> rates) {
    final var tuples = rates.stream()
        .map(this::fullTuple)
        .toList();

    final var mySqlBatch = MySqlQueryRequest.batch(FULL_INSERT, tuples);

    return mySqlService.request(mySqlBatch);
  }

  private Tuple fullTuple(Rate rate) {
    final var params = new ArrayTuple(10);
    params.addValue(rate.id());
    rateTuple(rate, params);
    return Tuple.newInstance(params);
  }

  private void rateTuple(Rate rate, ArrayTuple params) {
    params.addValue(rate.fromCurrency().name());
    params.addValue(rate.toCurrency().name());
    params.addValue(rate.rate());
    params.addValue(rate.dateOfRate());
    params.addValue(rate.source().name());
    params.addValue(rate.createdAt());
    params.addValue(rate.hash());
    params.addValue(rate.etag());
    params.addValue(rate.lastModified());
  }

  public Uni<Optional<Long>> save(Rate rate) {

    final var params = new ArrayTuple(9);
    rateTuple(rate, params);

    final var queryRequest = MySqlQueryRequest.normal(INSERT, params);

    final var list = new ArrayList<MySqlQueryRequest>();
    list.add(queryRequest);
    list.add(MySqlQueryRequest.normal("SELECT LAST_INSERT_ID()"));

    return mySqlService.transaction(list)
//        .onItem()
//        .invoke(rows -> {
//          for (RowSet<Row> rowRowSet : rows) {
//            SqlUtil.print(rowRowSet);
//          }
//        })
        .map(rowSets -> {

          return rowSets.stream()
              .filter(rowSet -> rowSet.size() > 0)
              .findFirst()
              .map(RowSet::iterator)
              .filter(RowIterator::hasNext)
              .map(RowIterator::next)
              .map(row -> row.getLong("LAST_INSERT_ID()"));
        });
  }

  public Uni<RowSet<Row>> last(Currency fromCurrency, Currency toCurrency) {
    final var queryRequest = MySqlQueryRequest.normal(LAST, Tuple.of(fromCurrency.name(), toCurrency.name()));
    return mySqlService.request(queryRequest);
  }

  public Uni<Boolean> exists(Long hash) {
    final var queryRequest = MySqlQueryRequest.normal(HASH_EXISTS, Tuple.of(hash));

    return mySqlService.request(queryRequest)
        .map(RowSet::iterator)
        .map(RowIterator::hasNext);
  }

  public Uni<Integer> replace(Collection<Rate> rates) {

    final var tuples = rates.stream().map(this::fullTuple)
        .toList();

    final var batch = MySqlQueryRequest.batch(REPLACE, tuples);
    return mySqlService.request(batch)
        .map(SqlResult::rowCount);
  }
}

