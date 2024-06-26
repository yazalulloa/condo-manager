package com.yaz.persistence.repository.mysql;

import com.yaz.persistence.domain.MySqlQueryRequest;
import io.micrometer.core.annotation.Timed;
import io.smallrye.mutiny.Multi;
import io.smallrye.mutiny.Uni;
import io.vertx.mutiny.mysqlclient.MySQLPool;
import io.vertx.mutiny.sqlclient.Row;
import io.vertx.mutiny.sqlclient.RowIterator;
import io.vertx.mutiny.sqlclient.RowSet;
import io.vertx.mutiny.sqlclient.SqlClient;
import io.vertx.mutiny.sqlclient.Tuple;
import io.vertx.sqlclient.impl.ArrayTuple;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.regex.Pattern;
import lombok.extern.slf4j.Slf4j;
import org.eclipse.microprofile.config.inject.ConfigProperty;

@Slf4j
@ApplicationScoped
public class MySqlService {

  private static final String GET_UUID = "SELECT UUID() AS uuid";
  private static final String TOTAL_COUNT = "SELECT count(*) as total_count FROM %s";


  private final MySQLPool pool;
  private final String columnSeparator;
  private final String rowSeparator;
  private final String quotedColumnSeparator;
  private final String quotedRowSeparator;

  @Inject
  public MySqlService(
      MySQLPool pool,
      @ConfigProperty(name = "app.sql.separator.column") String columnSeparator,
      @ConfigProperty(name = "app.sql.separator.row") String rowSeparator) {
    this.pool = pool;
    this.columnSeparator = columnSeparator;
    this.rowSeparator = rowSeparator;
    this.quotedColumnSeparator = Pattern.quote(columnSeparator);
    this.quotedRowSeparator = Pattern.quote(rowSeparator);
  }

  public String columnSeparator() {
    return columnSeparator;
  }

  public String rowSeparator() {
    return rowSeparator;
  }

  public String quotedColumnSeparator() {
    return quotedColumnSeparator;
  }

  public String quotedRowSeparator() {
    return quotedRowSeparator;
  }

  public Uni<String> getUUID() {
    return request(GET_UUID)
        .map(rows -> Optional.of(rows.iterator())
            .filter(RowIterator::hasNext)
            .map(RowIterator::next)
            .map(row -> row.getString("uuid"))
            .orElseThrow(() -> new RuntimeException("UUID not generated by DB")));
  }

  private Uni<RowSet<Row>> executeQuery(SqlClient sqlClient, MySqlQueryRequest request) {
    //log.info("SQL_REQUEST {} PARAMS {}", request.query(), request.params());
    final var preparedQuery = sqlClient.preparedQuery(request.query());

    if (request.type() == MySqlQueryRequest.Type.NORMAL) {
      if (request.params() != null && !request.params().isEmpty()) {
        final var tuple = request.params().getFirst();
        return preparedQuery.execute(tuple);
      }

      return preparedQuery.execute();
    }

    return preparedQuery.executeBatch(request.params());
  }

  public Uni<RowSet<Row>> request(String sql) {
    return request(MySqlQueryRequest.normal(sql));
  }

  @Timed(value = "mysql.request", description = "[MySql] A measure of how long it takes to execute a query")
  public Uni<RowSet<Row>> request(MySqlQueryRequest request) {

    //final var timestamp = System.currentTimeMillis();

    return executeQuery(pool, request)
        //.onItem().invoke(rows -> log.info("SQL_REQUEST {} {}ms", request.query(), System.currentTimeMillis() - timestamp))
        //.onItem().invoke(rows -> log.info("SQL_REQUEST {} {}", request.query(), rows.rowCount()))
        .onFailure()
        .invoke(throwable -> log.error("SQL_REQUEST_ERROR {}", request.query(), throwable));
  }

  public Uni<Long> totalCount(String collection) {

    final var sql = TOTAL_COUNT.formatted(collection);
    return extractLong(MySqlQueryRequest.normal(sql), "total_count");
  }

  public Uni<Long> extractLong(MySqlQueryRequest queryRequest, String field) {
    return request(queryRequest)
        .map(rows -> {
          final var rowIterator = rows.iterator();
          if (rowIterator.hasNext()) {
            final var row = rowIterator.next();
            return Objects.requireNonNull(row.getLong(field), "field " + field + " not found");
          }
          return 0L;
        });
  }

  public Uni<List<RowSet<Row>>> transaction(TrxMode mode, MySqlQueryRequest... requests) {
    return transaction(mode, List.of(requests));
  }

  @Timed(value = "mysql.transaction", description = "[MySql] A measure of how long it takes to execute a transaction")
  public Uni<List<RowSet<Row>>> transaction(TrxMode mode, List<MySqlQueryRequest> requests) {
    return pool.withTransaction(sqlConnection -> {

      var multi = Multi.createFrom().iterable(requests)
          .onItem()
          .transformToUni(request -> {

//            final var timestamp = new AtomicLong();
            return executeQuery(sqlConnection, request)
//                .onSubscription()
//                .invoke(() -> {
//                  timestamp.set(System.currentTimeMillis());
//                  log.info("SUBSCRIBED {}", request.query());
//                })
//                .onTermination()
//                .invoke(() -> log.info("REQUEST {} {}ms", request.query(), System.currentTimeMillis() - timestamp.get()))
                .onFailure()
                .invoke(throwable -> log.error("SQL_REQUEST_ERROR {}", request.query(), throwable));
          });
      Multi<RowSet<Row>> result;
      if (mode == TrxMode.SEQUENTIALLY) {
        result = multi.concatenate();
      } else if (mode == TrxMode.PARALLEL) {
        result = multi.merge();
      } else {
        throw new RuntimeException("Invalid mode " + mode);
      }

      return result
          .collect()
          .asList();
    });
  }

  public Uni<RowSet<Row>> request(String query, ArrayTuple tuple) {
    return request(MySqlQueryRequest.normal(query, tuple));
  }

  public Uni<RowSet<Row>> request(String query, Tuple tuple) {
    return request(MySqlQueryRequest.normal(query, tuple));
  }

  public enum TrxMode {
    SEQUENTIALLY, PARALLEL
  }
}
