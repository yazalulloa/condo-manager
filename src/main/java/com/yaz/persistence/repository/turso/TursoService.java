package com.yaz.persistence.repository.turso;

import com.yaz.client.turso.RequestsItem;
import com.yaz.client.turso.Stmt;
import com.yaz.client.turso.TursoClient;
import com.yaz.client.turso.TursoQuery;
import com.yaz.client.turso.response.ResultsItem;
import com.yaz.client.turso.response.TursoResponse;
import io.micrometer.core.annotation.Timed;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.eclipse.microprofile.rest.client.inject.RestClient;

@Slf4j
@ApplicationScoped
public class TursoService {

  private static final String TOTAL_COUNT = "SELECT COUNT(%s) as total_count FROM %s";
  private final TursoClient client;

  public TursoService(@RestClient TursoClient client) {
    this.client = client;
  }

  public Uni<TursoResponse> sqliteTables() {
    return executeQuery("SELECT name FROM sqlite_master");
  }

  @Timed(value = "turso.query.request", description = "[Turso] A measure of how long it takes to execute a query")
  public Uni<TursoResponse> executeQuery(TursoQuery query) {
    return client.query(query)
        .map(response -> {
          if (response.getStatus() != 200) {
            final var errorBody = response.readEntity(String.class);

            final var msg = "Error executing query: %s%n%s %s".formatted(query, response.getStatus(), errorBody);
            throw new RuntimeException(msg);
          }

          return response.readEntity(TursoResponse.class);
        })
        .onFailure()
        .invoke(throwable -> log.error("Failed to execute query: %s".formatted(query), throwable))
        .map(response -> {
          final var results = response.results();
          if (results != null && !results.isEmpty()) {
            final var errors = results.stream()
                .map(ResultsItem::error)
                .filter(Objects::nonNull)
                .map(error -> "Code: %s Message: %s".formatted(error.code(), error.message()))
                .collect(Collectors.joining("\n"));

            if (!errors.isEmpty()) {
              throw new RuntimeException("Error executing query: %n%s%n%s".formatted(query, errors));
            }
          }

          return response;
        });
  }

  public Uni<TursoResponse> executeQuery(String sql) {
    return executeQuery(simpleQuery(sql));
  }

  public TursoQuery simpleQuery(String sql) {
    final var tursoQuery = new TursoQuery();
    tursoQuery.setRequests(new ArrayList<>());
    final var execute = new RequestsItem("execute", new Stmt(sql));
    tursoQuery.getRequests().add(execute);
    tursoQuery.getRequests().add(new RequestsItem("close"));
    return tursoQuery;
  }

  public Uni<Long> count(String column, String table) {

    final var query = TOTAL_COUNT.formatted(column, table);

    return executeQuery(simpleQuery(query))
        .map(response -> response.results().getFirst().response().result().rows().getFirst().getFirst().value())
        .map(Long::parseLong);
  }
  public Uni<TursoResponse> executeQueries(List<String> queries) {
    final var tursoQuery = new TursoQuery();
    tursoQuery.setRequests(new ArrayList<>());

    queries.stream().map(Stmt::new).map(stmt -> new RequestsItem("execute", stmt)).forEach(tursoQuery.getRequests()::add);
    tursoQuery.getRequests().add(new RequestsItem("close"));
    return executeQuery(tursoQuery);
  }
}
