package com.yaz.persistence.repository.turso;

import com.yaz.persistence.repository.turso.client.TursoService;
import io.quarkus.test.junit.QuarkusTest;
import io.vertx.core.json.Json;
import jakarta.inject.Inject;
import org.junit.jupiter.api.Test;

@QuarkusTest
class TursoServiceTest {

  @Inject
  TursoService service;

  @Test
  void count() {
    final var count = service.count("id","rates").await().indefinitely();

    System.out.println(count);
  }

  @Test
  void selectCount() {

    final var response = service.executeQuery("SELECT count(*) as total_count FROM %s".formatted("rates")).await()
        .indefinitely();

    System.out.println(Json.encodePrettily(response));
  }

  @Test
  void selectRates() {

    final var response = service.executeQuery("SELECT * FROM %s LIMIT 2".formatted("rates")).await()
        .indefinitely();

    System.out.println(Json.encodePrettily(response));
  }

  @Test
  void lastRowId() {

    final var response = service.executeQuery("SELECT last_insert_rowid() as last_id").await().indefinitely();
    System.out.println(Json.encodePrettily(response));
  }


}