package com.yaz.persistence.repository.mysql;

import com.yaz.core.util.SqlUtil;
import com.yaz.persistence.domain.Currency;
import com.yaz.persistence.domain.MySqlQueryRequest;
import com.yaz.persistence.domain.query.RateQuery;
import com.yaz.persistence.domain.query.SortOrder;
import com.yaz.persistence.entities.Rate;
import com.yaz.persistence.repository.mysql.MySqlService.TrxMode;
import io.smallrye.mutiny.Uni;
import io.vertx.mutiny.sqlclient.Row;
import io.vertx.mutiny.sqlclient.RowIterator;
import io.vertx.mutiny.sqlclient.RowSet;
import io.vertx.mutiny.sqlclient.SqlResult;
import io.vertx.mutiny.sqlclient.Tuple;
import io.vertx.sqlclient.impl.ArrayTuple;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicInteger;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
//@LookupIfProperty(name = "app.repository.impl", stringValue = "mysql")
//@Named("mysql")
@ApplicationScoped
@RequiredArgsConstructor
public class RateMySqlRepository {

  private static final String COLLECTION = "rates";
  private static final String SELECT = "SELECT * FROM %s %s ORDER BY id %s LIMIT ?";
  private static final String DELETE_BY_ID = "DELETE FROM %s WHERE id = ?".formatted(COLLECTION);
  private static final String INSERT = """
      INSERT INTO %s (from_currency, to_currency, rate, date_of_rate, source, created_at, hash, etag, last_modified) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      """.formatted(COLLECTION);

  private static final String FULL_INSERT = """
      INSERT IGNORE INTO %s (id, from_currency, to_currency, rate, date_of_rate, source, created_at, hash, etag, last_modified) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      """.formatted(COLLECTION);

  private static final String REPLACE = """
      INSERT IGNORE INTO %s (id, from_currency, to_currency, rate, date_of_rate, source, created_at, hash, etag, last_modified) 
      VALUES (%s)
      """.formatted(COLLECTION, SqlUtil.params(10));
  private static final String LAST = "SELECT * FROM rates WHERE from_currency = ? AND to_currency = ? ORDER BY id DESC LIMIT 1";
  private static final String HASH_EXISTS = "SELECT * FROM rates WHERE hash = ? LIMIT 1";

  private final MySqlService mySqlService;


  public Uni<Long> count() {
    return mySqlService.totalCount(COLLECTION);
  }


  public Uni<Integer> delete(long id) {

    return mySqlService.request(DELETE_BY_ID, Tuple.of(id))
        .map(SqlResult::rowCount);
  }

  private Rate from(Row row) {
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
        SELECT.formatted(COLLECTION, stringBuilder.isEmpty() ? "" : "WHERE " + stringBuilder, query.sortOrder()),
        params);

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

    final var list = new ArrayList<MySqlQueryRequest>();
    list.add(MySqlQueryRequest.normal(INSERT, params));
    list.add(MySqlQueryRequest.normal("SELECT LAST_INSERT_ID()"));

    return mySqlService.transaction(TrxMode.SEQUENTIALLY, list)
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


  public Uni<Optional<Rate>> last(Currency fromCurrency, Currency toCurrency) {
    return mySqlService.request(LAST, Tuple.of(fromCurrency.name(), toCurrency.name()))
        .map(rowSet -> SqlUtil.toOptional(rowSet, this::from));
  }


  public Uni<Boolean> exists(long hash) {

    return mySqlService.request(HASH_EXISTS, Tuple.of(hash))
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

