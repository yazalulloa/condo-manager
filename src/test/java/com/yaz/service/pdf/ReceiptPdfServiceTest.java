package com.yaz.service.pdf;

import static org.junit.jupiter.api.Assertions.*;

import io.quarkus.test.junit.QuarkusTest;
import jakarta.inject.Inject;
import org.junit.jupiter.api.Test;

@QuarkusTest
class ReceiptPdfServiceTest {

  @Inject
  ReceiptPdfService receiptPdfService;

   @Test
  void zipDownload() {
     receiptPdfService.zipDownload("KORAL", 76)
         .await().indefinitely();
  }

}