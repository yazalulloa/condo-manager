package com.yaz.service;

import static org.junit.jupiter.api.Assertions.*;

import io.quarkus.test.junit.QuarkusTest;
import jakarta.inject.Inject;
import org.junit.jupiter.api.Test;

@QuarkusTest
class EmailConfigServiceTest {

  @Inject
  EmailConfigService service;


  @Test
  void checkAll() {
    service.checkAll().blockingAwait();
  }
}