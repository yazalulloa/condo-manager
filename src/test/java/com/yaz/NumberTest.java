package com.yaz;

import org.junit.jupiter.api.Test;

public class NumberTest {

  @Test
  void test() {
    var i = 3;

    final var r = (i++) * (i++);

    System.out.println(r);
    System.out.println(i);
  }
}
