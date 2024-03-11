package com.yaz.client;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.yaz.persistence.domain.query.SortOrder;
import com.yaz.service.RateService;
import com.yaz.util.RxUtil;
import io.quarkus.test.junit.QuarkusTest;
import io.reactivex.rxjava3.core.Completable;
import jakarta.inject.Inject;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;
import org.junit.jupiter.api.Test;

@QuarkusTest
class BcvClientServiceTest {

  @Inject
  BcvClientService service;

  @Test
  void head() {

    final var response = service.head().blockingGet();
    System.out.println();
    System.out.println("METADATA");
    response.getMetadata().forEach((k, v) -> System.out.println(k + " : " + v));

    System.out.println("\nHEADERS");
    response.getHeaders().forEach((k, v) -> System.out.println(k + " : " + v));

    assertEquals(200, response.getStatus());
  }

}