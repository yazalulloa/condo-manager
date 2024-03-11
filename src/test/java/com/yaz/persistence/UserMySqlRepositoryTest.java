package com.yaz.persistence;

import static org.junit.jupiter.api.Assertions.*;

import com.yaz.persistence.domain.query.UserQuery;
import com.yaz.persistence.repository.mysql.UserMySqlRepository;
import io.quarkus.test.junit.QuarkusTest;
import jakarta.inject.Inject;
import org.junit.jupiter.api.Test;

@QuarkusTest
class UserMySqlRepositoryTest {

  @Inject
  UserMySqlRepository userMySqlRepository;

  @Test
  void count() {
    final var count = userMySqlRepository.count().await().indefinitely();
    System.out.println(count);
    assertTrue(count > 0);
  }

  @Test
  void select() {
    final var list = userMySqlRepository.select(UserQuery.builder().build()).await().indefinitely();
    System.out.println(list);
    assertTrue(list != null);
  }

}