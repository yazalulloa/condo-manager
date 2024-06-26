package com.yaz.util;

import com.yaz.core.util.ConvertUtil;
import com.yaz.core.util.DateUtil;
import java.util.UUID;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class UUIDTest {

  @Test
  void check() {
    System.out.println(UUID.fromString("b12e7a20-82e2-4091-bf45-0bb107c7b8d4"));
  }

  @Test
  void telegramId() {

    final var epochSecond = DateUtil.epochSecond();
    final var uuid = UUID.randomUUID();
    final var userId = epochSecond + uuid.toString();

    System.out.println(userId);
    System.out.println("UUID:" + uuid);
    System.out.println("epochSecond:" + epochSecond);
    final var formatId = ConvertUtil.formatUserId(userId);
    System.out.println(formatId);
    System.out.println(formatId.length());
    final var userId1 = ConvertUtil.getUserId(formatId);
    System.out.println(userId1);
    Assertions.assertEquals(userId, userId1);
  }

  @Test
  void ids() {


    final var epochSecond = DateUtil.epochSecond();
    final var epochMilli = DateUtil.epochMilli();
    final var uuid = UUID.randomUUID().toString();

    System.out.println(epochSecond + uuid);
    System.out.println(epochMilli + uuid);

  }
}
