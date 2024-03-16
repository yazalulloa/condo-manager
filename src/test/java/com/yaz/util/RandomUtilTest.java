package com.yaz.util;

import java.util.stream.Stream;
import org.junit.jupiter.api.Test;

class RandomUtilTest {

  @Test
  void randomStr() {
    final var str = RandomUtil.randomStr(64);
    System.out.println(str);

    assert str.length() == 64;
  }

  @Test
  void unsignedLong19() {

    Stream.generate(RandomUtil::unsignedLong19)
        .limit(100)
        .forEach(System.out::println);
  }

  @Test
  void unsignedInt() {

    Stream.generate(RandomUtil::unsignedInt10)
        .limit(100)
        .forEach(System.out::println);
  }
}