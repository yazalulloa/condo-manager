package com.yaz.service;

import static org.junit.jupiter.api.Assertions.*;

import com.yaz.domain.BcvUsdRateResult;
import io.quarkus.test.junit.QuarkusTest;
import jakarta.inject.Inject;
import org.junit.jupiter.api.Test;

@QuarkusTest
class SaveNewBcvRateTest {
  @Inject
  SaveNewBcvRate saveNewBcvRate;
  @Test
  void saveNewRate() {

    final var result = saveNewBcvRate.saveNewRate().blockingGet();
    System.out.println(result);
  }

}