package com.yaz.service;


import com.yaz.persistence.domain.ExpenseType;
import com.yaz.persistence.entities.ReserveFund;
import com.yaz.persistence.domain.ReserveFundType;
import com.yaz.core.service.entity.ReserveFundService;
import com.yaz.core.util.DateUtil;
import com.yaz.core.util.RandomUtil;
import io.quarkus.test.junit.QuarkusTest;
import io.smallrye.mutiny.Multi;
import jakarta.inject.Inject;
import java.util.UUID;
import java.util.stream.Stream;
import org.junit.jupiter.api.Test;

@QuarkusTest
class ReserveFundServiceTest {

  @Inject
  ReserveFundService service;

  @Test
  void insert() {
    final var stream = Stream.generate(() -> ReserveFund.builder()
            .buildingId("TEST")
            .id(DateUtil.epochSecond() + UUID.randomUUID().toString())
            .name("Test " + RandomUtil.randomIntStr(6))
            .fund(RandomUtil.randomBigDecimal(4, 2))
            .expense(RandomUtil.randomBigDecimal(4, 2))
            .pay(RandomUtil.randomBigDecimal(4, 2))
            .active(RandomUtil.bool())
            .type(RandomUtil.bool() ? ReserveFundType.FIXED_PAY : ReserveFundType.PERCENTAGE)
            .expenseType(RandomUtil.bool() ? ExpenseType.COMMON : ExpenseType.UNCOMMON)
            .addToExpenses(RandomUtil.bool())
            .build())
        .limit(RandomUtil.randomInt(3, 20));

    final var list = Multi.createFrom().items(stream)
        .onItem()
        .transformToUni(service::insert)
        .merge()
        .collect()
        .asList()
        .await().indefinitely();

    final var rows = list.stream().reduce(Integer::sum).orElse(0);
    System.out.println(rows);

  }

}