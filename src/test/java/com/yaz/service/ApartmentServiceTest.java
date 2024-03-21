package com.yaz.service;

import com.yaz.persistence.entities.Apartment;
import com.yaz.resource.domain.request.ApartmentRequest;
import com.yaz.util.RandomUtil;
import io.quarkus.test.junit.QuarkusTest;
import jakarta.inject.Inject;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import org.junit.jupiter.api.Test;

@QuarkusTest
class ApartmentServiceTest {

  @Inject
  ApartmentService apartmentService;

  @Test
  void insert() {

    final var apartment = Apartment.builder()
        .buildingId("TEST")
        .number(RandomUtil.getRandNumb(6))
        .name("test")
        .aliquot(RandomUtil.randomBigDecimal(2, 1))
        .emails(Stream.generate(() -> RandomUtil.randomStr(6) + "@gmail.com")
            .limit(RandomUtil.randomInt(1, 10))
            .collect(Collectors.toSet()))
        .build();

    final var i = apartmentService.insert(apartment).await().indefinitely();
    System.out.println(i);
  }

  @Test
  void update() {
    final var apartment = new ApartmentRequest();
    apartment.setBuildingId("TEST");
    apartment.setNumber("3245");
    apartment.setName(RandomUtil.randomStr(8));
    apartment.setAliquot(RandomUtil.randomBigDecimal(2, 1));
    apartment.setEmails(Stream.generate(() -> RandomUtil.randomStr(6) + "@gmail.com")
        .limit(RandomUtil.randomInt(1, 10))
        .collect(Collectors.toSet()));

    final var i = apartmentService.update(apartment).await().indefinitely();
    System.out.println(i);
  }

}