package com.yaz.util;

import java.time.ZonedDateTime;
import org.junit.jupiter.api.Test;

public class DateTest {

  @Test
  void date() {
    final var parsed = ZonedDateTime.parse("2024-02-21T16:04:33.151+01:00");

    System.out.println(DateUtil.formatVe(parsed));
  }

}
