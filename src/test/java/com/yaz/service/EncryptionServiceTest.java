package com.yaz.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.yaz.core.service.EncryptionService;
import com.yaz.core.util.DateUtil;
import com.yaz.core.util.StringUtil;
import com.yaz.persistence.entities.ExtraCharge.Keys;
import io.quarkus.test.junit.QuarkusTest;
import io.vertx.core.json.Json;
import io.vertx.core.json.JsonObject;
import jakarta.inject.Inject;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.UUID;
import java.util.stream.IntStream;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;

@QuarkusTest
@Slf4j
class EncryptionServiceTest {

  @Inject
  EncryptionService service;

  @Test
  void checkAll() {

    final var keys = Keys.builder()
        .parentReference("ANTONIETA")
        .id(1)
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
    final var epochSecond = DateUtil.epochSecond();
    final var uuid = UUID.randomUUID();
    final var userId = epochSecond + uuid.toString();

//    var current = userId;
//    String idStart;
//
//    while (idStart != null) {
//      final var substring = current.substring(0, current.length() - 2);
//
//    }
//      System.out.println(service.encrypt(userId));
//    }

    System.out.println(epochSecond);
    System.out.println(uuid);
    System.out.println(userId);
    encryptAndPrint(userId);
    encryptAndPrint(epochSecond + "1");
    encryptAndPrint(epochSecond + "");
    encryptAndPrint(uuid.toString());
    encryptAndPrint("1");
  }

  void encryptAndPrint(String str) {
    final var encrypt = service.encrypt(str);

    System.out.printf("%s original: %s %s %s%n", encrypt.length(), str.length(), str, encrypt);

  }

  @Test
  void findId() {
    final var userId = DateUtil.epochSecond() + UUID.randomUUID().toString();
    final var stringBuilder = new StringBuilder(userId);

    while (!stringBuilder.isEmpty()) {
      stringBuilder.deleteCharAt(stringBuilder.length() - 1);

      if (stringBuilder.length() < 64) {
        encryptAndPrint(stringBuilder.toString());
      }
    }
  }

  @Test
  void decrypt() {
    final var decrypted = service.decrypt(
        "Kc2SEj3u5jCB9PoHkevcf4dbZaC4IoX7lh0itsHyWhMlJAODYBLktF20xepyKwqeCdAK3OdUMxyU93mwwYTDHoNG2Pk=@*!:dzv_WRJ7quzjfJdIdI7YRA==");

    System.out.println(decrypted);
  }

  @Test
  void stream() {
    IntStream.range(1, 200)
        .forEach(i -> {

          var j = 0;
          final var jsonObject = new JsonObject();

          while (j < i) {
            j++;
            jsonObject.put("key" + j, "value" + j + "-" + UUID.randomUUID());
          }

          final var str = jsonObject.encode();

          printV(i, str.length(), service.encryptObj(str).length());
          printV(i, str.length(), StringUtil.deflate(str).length());
          log.info("-".repeat(10));
        });


  }

  private void printV(int keys, int startValue, int endValue) {
    final var diff = endValue - startValue;

    final var percent = BigDecimal.valueOf(diff)
        .divide(BigDecimal.valueOf(startValue), 2, RoundingMode.HALF_UP)
        .multiply(BigDecimal.valueOf(100));

    log.info("keys {} start {} end {} diff {} percent {}", keys, startValue, endValue, diff,
        percent);
  }

}