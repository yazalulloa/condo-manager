package com.yaz.persistence;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import com.yaz.persistence.domain.request.ExtraChargeUpdateRequest;
import com.yaz.persistence.entities.ExtraCharge.Apt;
import com.yaz.persistence.repository.mysql.ApartmentMySqlRepository;
import com.yaz.persistence.repository.mysql.ExtraChargeMySqlRepository;
import com.yaz.util.RandomUtil;
import io.quarkus.test.junit.QuarkusTest;
import jakarta.inject.Inject;
import java.time.Duration;
import java.util.Optional;
import java.util.stream.Collectors;
import org.junit.jupiter.api.Test;

@QuarkusTest
class ExtraChargeRepositoryTest {

  @Inject
  ApartmentMySqlRepository apartmentRepository;
  @Inject
  ExtraChargeMySqlRepository repository;


  @Test
  void select() {
    final var list = repository.select("ANTONIETA", "ANTONIETA")
        .await().atMost(Duration.ofSeconds(5));

    System.out.println(list);
    assertNotNull(list);
  }

  @Test
  void read() {
    final var extraCharge = repository.read("ANTONIETA", "ANTONIETA", "11eedbe8-97b8-0690-8fee-d229547576d5")
        .await().atMost(Duration.ofSeconds(5));

    System.out.println(extraCharge);
    assertNotNull(extraCharge);
  }

  @Test
  void update() {
    final var aptList = apartmentRepository.aptByBuildings("ANTONIETA").await().atMost(Duration.ofSeconds(5));

    final var extraCharge = repository.read("ANTONIETA", "ANTONIETA", "11eedbe8-97b8-0690-8fee-d229547576d5")
        .map(Optional::get).await().atMost(Duration.ofSeconds(5));

    final var random = RandomUtil.getInstance();
    final var updateRequest = ExtraChargeUpdateRequest.builder()
        .buildingId(extraCharge.buildingId())
        .secondaryId(extraCharge.secondaryId())
        .id(extraCharge.id())
        .description(extraCharge.description())
        .amount(extraCharge.amount())
        .currency(extraCharge.currency())
        .active(extraCharge.active())
        .apartments(aptList.stream().map(Apt::number)
            .filter(str -> random.nextBoolean() && random.nextBoolean())
            .collect(Collectors.toSet()))
        .build();

    System.out.println("apartments = " + updateRequest.apartments().size());

    final var i = repository.update(updateRequest).await().atMost(Duration.ofSeconds(5));
    System.out.println(i);
  }
}