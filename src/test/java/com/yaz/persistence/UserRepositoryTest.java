package com.yaz.persistence;

import static org.junit.jupiter.api.Assertions.*;

import com.yaz.persistence.domain.query.UserQuery;
import io.quarkus.test.junit.QuarkusTest;
import jakarta.inject.Inject;
import org.junit.jupiter.api.Test;

@QuarkusTest
class UserRepositoryTest {

  @Inject
  UserRepository userRepository;

  @Test
  void count() {
    final var count = userRepository.count().await().indefinitely();
    System.out.println(count);
    assertTrue(count > 0);
  }

  @Test
  void select() {
    final var list = userRepository.select(UserQuery.builder().build()).await().indefinitely();
    System.out.println(list);
    assertTrue(list != null);
  }

}