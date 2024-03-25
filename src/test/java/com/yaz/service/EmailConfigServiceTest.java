package com.yaz.service;

import static org.junit.jupiter.api.Assertions.*;

import com.yaz.persistence.domain.EmailConfigUser;
import com.yaz.persistence.domain.query.EmailConfigQuery;
import com.yaz.persistence.entities.EmailConfig;
import io.quarkus.test.junit.QuarkusTest;
import jakarta.inject.Inject;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;

@QuarkusTest
@Slf4j
class EmailConfigServiceTest {

  @Inject
  EmailConfigService service;



  @Test
  void sizecheck() {
    final var list = service.list(EmailConfigQuery.builder().build()).await().indefinitely();

    list.forEach(emailConfigUser -> {
      final var emailConfig = emailConfigUser.emailConfig();

      final var length = emailConfig.file().length;
      final var fileSize = emailConfig.fileSize();

      log.info("length: {}, fileSize: {}", length, fileSize);
    });
  }
}