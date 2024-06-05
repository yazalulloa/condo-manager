package com.yaz.api.resource;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;
import static org.junit.jupiter.api.Assertions.*;

import io.quarkus.test.junit.QuarkusTest;
import io.quarkus.test.security.TestSecurity;
import io.reactivex.rxjava3.core.Observable;
import io.reactivex.rxjava3.core.Single;
import io.reactivex.rxjava3.schedulers.Schedulers;
import java.util.function.Supplier;
import java.util.stream.Stream;
import org.junit.jupiter.api.Test;

@QuarkusTest
class RateResourceTest {

  @Test
  @TestSecurity(authorizationEnabled = false)
  void bcvLookUp() {
    final var path = "/api/rates/bcv-lookup";

    Supplier<Single<Long>> supplier = () -> Single.fromSupplier(() -> {
          System.out.println("Sending");

          final var millis = System.currentTimeMillis();
          given()
              .when().get(path)
              .then()
              .statusCode(200);

          final var diff = System.currentTimeMillis() - millis;

          return diff;
        })
        .doOnTerminate(() -> System.out.println("Terminated"))
        .subscribeOn(Schedulers.io());

    final var stream = Stream.generate(supplier).limit(10).toList();

    final var validatableResponses = Single.merge(stream)
        .toList()
        .blockingGet();

    System.out.println(validatableResponses);
  }

}