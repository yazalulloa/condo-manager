package com.yaz.core.helper;

import static org.junit.jupiter.api.Assertions.*;

import io.vertx.rxjava3.core.Vertx;
import java.util.List;
import org.junit.jupiter.api.Test;

class GetStaticAssetsServiceTest {

  @Test
  void print() {
    final var list = new GetStaticAssetsService(Vertx.vertx()).staticAssets().blockingGet();

    list.stream()
        .map("<link rel=\"prefetch\" href=\"/%s\"/>"::formatted)
        .forEach(System.out::println);
  }

}