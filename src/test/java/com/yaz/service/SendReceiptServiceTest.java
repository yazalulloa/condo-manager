package com.yaz.service;

import io.quarkus.test.junit.QuarkusTest;
import jakarta.inject.Inject;
import org.junit.jupiter.api.Test;

@QuarkusTest
class SendReceiptServiceTest {

  @Inject
  SendReceiptService sendReceiptService;

  @Test
  void send() {
    sendReceiptService.sendZip("KORAL", 69).blockingAwait();
  }

}