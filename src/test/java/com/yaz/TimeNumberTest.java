package com.yaz;

import org.junit.jupiter.api.Test;

public class TimeNumberTest {

  @Test
  void test() {
    final var currentTimeMillis = System.currentTimeMillis();
    final var str = String.valueOf(currentTimeMillis);
    final var substring = str.substring(str.length() - String.valueOf(Integer.MAX_VALUE).length());
    final var seed = Integer.parseInt(substring);

    System.out.println(currentTimeMillis);
    System.out.println(Integer.MAX_VALUE);
    System.out.println(substring);
    System.out.println(Integer.parseInt(substring));
  }

}
