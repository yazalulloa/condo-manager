package com.yaz.util;

import org.junit.jupiter.api.Test;

class RandomUtilTest {

  @Test
  void randomStr() {
    final var str = RandomUtil.randomStr(64);
    System.out.println(str);

    assert str.length() == 64;
  }
}