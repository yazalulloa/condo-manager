package com.yaz.persistence;

import com.yaz.persistence.domain.MySqlQueryRequest;
import io.micrometer.core.annotation.Timed;
import io.smallrye.mutiny.Multi;
import io.smallrye.mutiny.Uni;
import io.vertx.mutiny.mysqlclient.MySQLPool;
import io.vertx.mutiny.sqlclient.Row;
import io.vertx.mutiny.sqlclient.RowSet;
import io.vertx.mutiny.sqlclient.SqlClient;
import io.vertx.sqlclient.impl.ArrayTuple;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Singleton
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class MySqlService {

  private static final String TOTAL_COUNT = "SELECT count(*) as total_count FROM %s";

  private final MySQLPool pool;

  private Uni<RowSet<Row>> executeQuery(SqlClient sqlClient, MySqlQueryRequest request) {
    //log.info("SQL_REQUEST {} PARAMS {}", request.query(), request.params());
    final var preparedQuery = sqlClient.preparedQuery(request.query());

    if (request.type() == MySqlQueryRequest.Type.NORMAL) {
      if (request.params() != null && !request.params().isEmpty()) {
        final var tuple = request.params().get(0);
        return preparedQuery.execute(tuple);
      }

      return preparedQuery.execute();
    }

    return preparedQuery.executeBatch(request.params());
  }

  public Uni<RowSet<Row>> request(String sql) {
    return request(MySqlQueryRequest.normal(sql));
  }

  @Timed(value = "mysql.request", description = "A measure of how long it takes to execute a query")
  public Uni<RowSet<Row>> request(MySqlQueryRequest request) {

    return executeQuery(pool, request)
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

  public Uni<List<RowSet<Row>>> transaction(List<MySqlQueryRequest> requests) {

    return pool.withTransaction(sqlConnection -> {

      return Multi.createFrom().iterable(requests)
          .onItem()
          .transformToUni(request -> executeQuery(sqlConnection, request)
              .onFailure()
              .invoke(throwable -> log.error("SQL_REQUEST_ERROR {}", request.query(), throwable)))
          .concatenate()
          .collect()
          .asList();

    });
  }

  public Uni<RowSet<Row>> request(String query, ArrayTuple tuple) {
    return request(MySqlQueryRequest.normal(query, tuple));
  }
}
