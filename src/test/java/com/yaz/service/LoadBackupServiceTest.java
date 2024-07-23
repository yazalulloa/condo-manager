package com.yaz.service;

import com.yaz.core.service.LoadBackupService;
import com.yaz.persistence.entities.Rate;
import io.quarkus.test.junit.QuarkusTest;
import jakarta.inject.Inject;
import java.util.List;
import org.junit.jupiter.api.Test;


@QuarkusTest
class LoadBackupServiceTest {

  @Inject
  LoadBackupService service;

  @Test
  void historicRates() {
    final var rates = service.historicRates().blockingGet();

    rates.forEach(rate -> {
      System.out.println("Rate: " + rate.rate() + " " + rate.dateOfRate());
    });
  }

}