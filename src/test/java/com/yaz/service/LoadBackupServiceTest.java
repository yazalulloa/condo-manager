package com.yaz.service;

import com.yaz.core.service.LoadBackupService;
import io.quarkus.test.junit.QuarkusTest;
import jakarta.inject.Inject;
import org.junit.jupiter.api.Test;


@QuarkusTest
class LoadBackupServiceTest {

  @Inject
  LoadBackupService service;

  @Test
  void load() {
    //service.load().blockingAwait();
  }

}