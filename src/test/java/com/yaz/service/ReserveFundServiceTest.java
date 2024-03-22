package com.yaz.service;


import com.yaz.persistence.entities.Expense;
import com.yaz.persistence.entities.ReserveFund;
import com.yaz.persistence.entities.ReserveFund.Type;
import com.yaz.util.DateUtil;
import com.yaz.util.RandomUtil;
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
            .type(RandomUtil.bool() ? Type.FIXED_PAY : Type.PERCENTAGE)
            .expenseType(RandomUtil.bool() ? Expense.Type.COMMON : Expense.Type.UNCOMMON)
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