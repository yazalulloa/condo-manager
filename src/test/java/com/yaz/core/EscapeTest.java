package com.yaz.core;

import org.apache.commons.text.StringEscapeUtils;
import org.junit.jupiter.api.Test;

public class EscapeTest {

  @Test
  void test() {
    final var str = "El intrépido capitán Ramón Pérez, con su brújula en mano, dirigió intrépidamente la pequeña embarcación a través de la tempestuosa tormenta.";
    final var escapeHtml4 = StringEscapeUtils.escapeHtml4(str);
    final var escapeEcmaScript = StringEscapeUtils.escapeEcmaScript(str);
    final var escapeXml11 = StringEscapeUtils.escapeXml11(str);

    System.out.println("Original: " + str);
    System.out.println("Html4: " + escapeHtml4);
    System.out.println("EcmaScript: " + escapeEcmaScript);
    System.out.println("Xml11: " + escapeXml11);

    assert str.equals(escapeHtml4);
    assert str.equals(escapeEcmaScript);
    assert str.equals(escapeXml11);
  }

}
