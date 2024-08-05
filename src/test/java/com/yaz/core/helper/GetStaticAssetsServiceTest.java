package com.yaz.core.helper;

import static org.junit.jupiter.api.Assertions.*;

import io.vertx.rxjava3.core.Vertx;
import java.util.List;
import java.util.stream.Stream;
import org.junit.jupiter.api.Test;

class GetStaticAssetsServiceTest {

  @Test
  void print() {
    final var list = new GetStaticAssetsService(Vertx.vertx()).staticAssets().blockingGet();

    list.stream()
        .filter(str -> !str.equals("/index.html"))
        .map(str -> {

          if (str.startsWith("/assets") || str.startsWith("/components")) {
            return str;
          }


          if (str.endsWith("/index.html")) {
            return "stc/" + str.substring(0, str.length() - 10);
          }

          return str;
        })
        .map("<link rel=\"prefetch\" href=\"/%s\"/>"::formatted)
        .forEach(System.out::println);
  }

}