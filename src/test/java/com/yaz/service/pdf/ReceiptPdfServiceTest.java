package com.yaz.service.pdf;

import com.yaz.core.service.pdf.ReceiptPdfService;
import io.quarkus.test.junit.QuarkusTest;
import jakarta.inject.Inject;
import org.junit.jupiter.api.Test;

@QuarkusTest
class ReceiptPdfServiceTest {

  @Inject
  ReceiptPdfService receiptPdfService;

   @Test
  void zipDownload() {
     receiptPdfService.zipDownload("ANTONIETA", 92)
         .await().indefinitely();
  }

}