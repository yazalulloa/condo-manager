package com.yaz.core;

import com.yaz.core.util.StringUtil;
import org.apache.commons.text.StringEscapeUtils;
import org.junit.jupiter.api.Test;
import org.unbescape.html.HtmlEscape;
import org.unbescape.java.JavaEscape;
import org.unbescape.javascript.JavaScriptEscape;

public class EscapeTest {

  @Test
  void test() {
    final var str = "El intrépido capitán Ramón Pérez Nuñez, con su brújula en mano, dirigió intrépidamente la pequeña embarcación a través de la tempestuosa tormenta.";
    final var escapeHtml4 = StringEscapeUtils.escapeHtml4(str);
    final var escapeEcmaScript = StringEscapeUtils.escapeEcmaScript(str);
    final var escapeXml11 = StringEscapeUtils.escapeXml11(str);
    final var escapeHtml5Xml = HtmlEscape.escapeHtml5Xml(str);
    final var escapeJava = JavaEscape.escapeJava(str);
    final var escapeJavaScript = JavaScriptEscape.escapeJavaScript(str);
    final var escapeJavaScriptMinimal = JavaScriptEscape.escapeJavaScriptMinimal(str);

    System.out.println("Original: " + str);
    System.out.println("Html4: " + escapeHtml4);
    System.out.println("EcmaScript: " + escapeEcmaScript);
    System.out.println("Xml11: " + escapeXml11);
    System.out.println("Html5Xml: " + escapeHtml5Xml);
    System.out.println("Java: " + escapeJava);
    System.out.println("JavaScript: " + escapeJavaScript);
    System.out.println("JavaScriptMinimal: " + escapeJavaScriptMinimal);

    final var escapeInput = StringUtil.escapeInput(str);
    System.out.println("EscapeInput: " + escapeInput);

    assert str.equals(escapeInput);
  }

}
