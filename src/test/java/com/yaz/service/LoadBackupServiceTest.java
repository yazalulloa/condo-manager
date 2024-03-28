package com.yaz.service;

import static org.junit.jupiter.api.Assertions.*;

import io.quarkus.test.junit.QuarkusTest;
import jakarta.inject.Inject;
import org.junit.jupiter.api.Test;


@QuarkusTest
class LoadBackupServiceTest {

  @Inject
  LoadBackupService service;

  @Test
  void load() {
    service.load().blockingAwait();
  }

}