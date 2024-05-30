package com.yaz.core.bcv;

import com.yaz.core.service.entity.RateService;
import com.yaz.core.util.MutinyUtil;
import com.yaz.persistence.entities.Rate;
import io.quarkus.test.junit.QuarkusTest;
import io.vertx.core.json.Json;
import jakarta.inject.Inject;
import java.util.Comparator;
import org.junit.jupiter.api.Test;

@QuarkusTest
class BcvHistoricServiceTest {

  @Inject
  BcvHistoricService bcvHistoricService;

  @Inject
  RateService rateService;

  @Test
  void parseRates() {
    final var rates = bcvHistoricService.parseRates().blockingGet();

    rates.stream().sorted(Comparator.comparing(Rate::createdAt).reversed())
        .map(Json::encode)
        .forEach(System.out::println);
  }

  @Test
  void historicRates() {
    final var rates = bcvHistoricService.historicRates().blockingGet();

    rates.forEach(System.out::println);
  }

  @Test
  void saveRates() {
    final var rates = bcvHistoricService.historicRates()
        .map(rateService::insert)
        .flatMap(MutinyUtil::single)
        .blockingGet();

    System.out.println(rates);
  }

  @Test
  void headFileLinks() {
    bcvHistoricService.headFileLinks().blockingAwait();
  }

  @Test
  void fileLinks() {
    bcvHistoricService.fileLinks().blockingGet().forEach(System.out::println);
  }
}