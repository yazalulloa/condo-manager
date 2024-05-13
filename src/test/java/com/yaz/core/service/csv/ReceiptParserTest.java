package com.yaz.core.service.csv;

import com.yaz.persistence.entities.Expense;
import io.quarkus.test.junit.QuarkusTest;
import io.vertx.core.json.Json;
import jakarta.inject.Inject;
import java.nio.file.Paths;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;

@QuarkusTest
@Slf4j
class ReceiptParserTest {

  @Inject
  ReceiptParser receiptParser;

  @Test
  void parseDir() {

    final var receipts = receiptParser.parseDir("/home/yaz/Downloads")
        .blockingGet();

    receipts.forEach(csvReceipt -> {
      for (Expense expense : csvReceipt.expenses()) {
        if (expense.reserveFund()) {
          log.info("Recibos con reserva: {}", csvReceipt);
          break;
        }
      }
    });

    //log.info("Recibos: {}", Json.encode(receipts));
    log.info("Recibos: {}", receipts.size());

//    final var path = Paths.get("/home/yaz/Downloads");
//
//    for (File file : path.toFile().listFiles()) {
//      if (file.getName().endsWith(".xlsx")) {
//        try {
//          final var csvReceipt = receiptParser.parse(file.getName(), file.toPath())
//              .blockingGet();
//
//          log.info("Recibo: {} \n{}", file.getName(), Json.encode(csvReceipt));
//        } catch (Exception e) {
//          log.error("Error parsing file: {}", file.getName(), e);
//        }
//      }
//
//    }
  }

  @Test
  void parse() {
    final var receipt = receiptParser.parse(Paths.get("/home/yaz/Downloads/TULIPANES FACTURA  SEP23 YAZAL.xlsx"))
        .blockingGet();

    log.info("{}", Json.encodePrettily(receipt));
  }

}