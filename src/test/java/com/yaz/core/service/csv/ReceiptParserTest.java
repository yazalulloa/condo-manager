package com.yaz.core.service.csv;

import io.quarkus.test.junit.QuarkusTest;
import io.vertx.core.json.Json;
import jakarta.inject.Inject;
import java.io.File;
import java.nio.file.Paths;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;

@QuarkusTest
@Slf4j
class ReceiptParserTest {

  @Inject
  ReceiptParser receiptParser;

  @Test
  void parse() {

    final var path = Paths.get("/home/yaz/Downloads");

    for (File file : path.toFile().listFiles()) {
      if (file.getName().endsWith(".xlsx")) {
        try {
          final var csvReceipt = receiptParser.parse(file.getName(), file.toPath())
              .blockingGet();

          log.info("Recibo: {} \n{}", file.getName(), Json.encode(csvReceipt));
        } catch (Exception e) {
          log.error("Error parsing file: {}", file.getName(), e);
        }
      }

    }
  }

}