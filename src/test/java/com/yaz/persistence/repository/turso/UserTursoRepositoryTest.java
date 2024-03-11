package com.yaz.persistence.repository.turso;

import static org.junit.jupiter.api.Assertions.*;

import io.quarkus.test.junit.QuarkusTest;
import jakarta.inject.Inject;
import org.junit.jupiter.api.Test;

@QuarkusTest
class UserTursoRepositoryTest {

  @Inject
  UserTursoRepository repository;

  @Test
  void updateLastLoginAt() {
    final var id = "1710035336157c4cdb-c74d-494d-9d50-d6521a913658";
    final var updated = repository.updateLastLoginAt(id).await().indefinitely();
    assertTrue(updated > 0);
  }
}