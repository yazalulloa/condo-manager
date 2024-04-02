package com.yaz.service;

import com.yaz.service.gmail.GmailChecker;
import io.quarkus.test.junit.QuarkusTest;
import jakarta.inject.Inject;
import org.junit.jupiter.api.Test;


@QuarkusTest
class GmailCheckerTest {

  @Inject
  GmailChecker gmailChecker;

  @Test
  void checkAll() {
    gmailChecker.checkAll().blockingAwait();
  }

}