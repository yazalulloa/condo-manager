package com.yaz.core.service.entity;

import static org.junit.jupiter.api.Assertions.*;

import com.yaz.core.util.RandomUtil;
import com.yaz.persistence.domain.Currency;
import com.yaz.persistence.domain.request.ExtraChargeCreateRequest;
import com.yaz.persistence.entities.ExtraCharge.Apt;
import com.yaz.persistence.entities.ExtraCharge.Type;
import io.quarkus.test.junit.QuarkusTest;
import io.smallrye.mutiny.Multi;
import jakarta.inject.Inject;
import java.util.List;
import java.util.stream.Stream;
import org.junit.jupiter.api.Test;

@QuarkusTest
class ExtraChargeServiceTest {

  @Inject
  ApartmentService apartmentService;
  @Inject
  ExtraChargeService service;

  @Test
  void create() {
    final var building = "TEST";
    final var apts = apartmentService.aptByBuildings(building).await().indefinitely();

    final var stream = Stream.generate(() -> ExtraChargeCreateRequest.builder()
            .parentReference(building)
            .buildingId(building)
            .type(Type.BUILDING)
            .description("Description " + RandomUtil.randomIntStr(3))
            .amount(RandomUtil.randomBigDecimal(4, 2).doubleValue())
            .currency(RandomUtil.randomFromArray(Currency.VALUES))
            .active(RandomUtil.bool())
            .apartments(apts.stream().map(Apt::number).filter(b -> RandomUtil.bool()).toList())
            .build())
        .limit(RandomUtil.randomInt(3, 20));

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