package com.yaz.util;

import java.time.ZonedDateTime;
import java.util.UUID;
import org.junit.jupiter.api.Test;

public class DateTest {

  @Test
  void date() {
    final var parsed = ZonedDateTime.parse("2024-02-21T16:04:33.151+01:00");

    System.out.println(DateUtil.formatVe(parsed));
  }

  @Test
  void date2() {
    final var string = DateUtil.epochSecond() + UUID.randomUUID().toString();

    System.out.println(string);
    System.out.println(string.length());
  }

}
