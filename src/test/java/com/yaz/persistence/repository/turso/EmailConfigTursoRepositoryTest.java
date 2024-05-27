package com.yaz.persistence.repository.turso;

import static org.junit.jupiter.api.Assertions.assertFalse;

import com.yaz.persistence.domain.query.EmailConfigQuery;
import io.quarkus.test.junit.QuarkusTest;
import jakarta.inject.Inject;
import org.junit.jupiter.api.Test;

@QuarkusTest
class EmailConfigTursoRepositoryTest {

  @Inject
  EmailConfigTursoRepository repository;

  @Test
  void exists() {
    assertFalse(repository.exists("1").await().indefinitely());
  }

  @Test
  void select() {
    final var list = repository.select(EmailConfigQuery.builder().build()).await().indefinitely();
    System.out.println(list);
  }
}