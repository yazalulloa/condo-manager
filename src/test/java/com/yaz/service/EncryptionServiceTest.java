package com.yaz.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.yaz.core.service.EncryptionService;
import com.yaz.persistence.entities.ExtraCharge.Keys;
import com.yaz.core.util.DateUtil;
import io.quarkus.test.junit.QuarkusTest;
import io.vertx.core.json.Json;
import jakarta.inject.Inject;
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
        "rsI7-APGjzvHmX2xQkqMDc7Xsyx7qlK7VWcNsr3aHnpqDaVf8QOE4mtWN0_QZB4kn1Y=$*@$&JjM58Dx_YAK16RawbjJjmQ==");

    System.out.println(decrypted);
  }


}