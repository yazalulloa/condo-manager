package com.yaz.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.yaz.persistence.entities.ExtraCharge;
import com.yaz.persistence.entities.ExtraCharge.Keys;
import com.yaz.util.DateUtil;
import io.quarkus.test.junit.QuarkusTest;
import io.vertx.core.json.Json;
import io.vertx.core.json.JsonObject;
import jakarta.inject.Inject;
import java.security.GeneralSecurityException;
import java.util.UUID;
import org.junit.jupiter.api.Test;

@QuarkusTest
class EncryptionServiceTest {

  @Inject
  EncryptionService service;

  @Test
  void checkAll() {

    final var keys = Keys.builder()
        .buildingId("ANTONIETA")
        .secondaryId("ANTONIETA")
        .id(UUID.randomUUID().toString())
        .build();

    final var str = Json.encode(keys);

    final var encrypt = service.encrypt(str);
    final var decrypt = service.decrypt(encrypt);

    final var value = Json.decodeValue(decrypt, Keys.class);

    System.out.println(encrypt);
    System.out.println(decrypt);
    System.out.println(value);
    assertEquals(str, decrypt);
    assertEquals(keys, value);

  }

  @Test
  void encrypt() {

    System.out.println(service.encrypt(DateUtil.epochSecond() + UUID.randomUUID().toString()));
  }

}