package com.yaz.core.service.entity;

import com.yaz.core.util.RandomUtil;
import com.yaz.persistence.domain.Currency;
import com.yaz.persistence.entities.Building;
import io.quarkus.test.junit.QuarkusTest;
import io.smallrye.mutiny.Multi;
import jakarta.inject.Inject;
import java.util.Set;
import java.util.stream.Stream;
import org.junit.jupiter.api.Test;

@QuarkusTest
class BuildingServiceTest {

  @Inject
  BuildingService service;


  @Test
  void create() {

    final var stream = Stream.generate(() -> Building.builder()
        .id("test_ " + RandomUtil.randomIntStr(6))
        .name("Building " + RandomUtil.randomIntStr(3))
        .rif(RandomUtil.randomIntStr(10))
        .mainCurrency(RandomUtil.oneRandomFromArray(Currency.VALUES))
        .debtCurrency(RandomUtil.oneRandomFromArray(Currency.VALUES))
        .currenciesToShowAmountToPay(Set.of(RandomUtil.oneRandomFromArray(Currency.VALUES)))
        .fixedPay(RandomUtil.bool())
        .fixedPayAmount(RandomUtil.randomBigDecimal(4, 2))
        .roundUpPayments(RandomUtil.bool())
        .build())
        .limit(5);

    final var list = Multi.createFrom().items(stream)
        .onItem()
        .transformToUni(service::create)
        .merge()
        .collect()
        .asList()
        .await().indefinitely();

    System.out.println(list);




  }
}