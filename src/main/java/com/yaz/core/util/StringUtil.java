package com.yaz.core.util;

import io.vertx.core.json.Json;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Optional;
import java.util.UUID;
import java.util.zip.CRC32;
import java.util.zip.DeflaterOutputStream;
import java.util.zip.InflaterOutputStream;
import org.apache.commons.codec.digest.XXHash32;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.text.StringEscapeUtils;
import org.unbescape.html.HtmlEscape;
import org.unbescape.java.JavaEscape;
import org.unbescape.javascript.JavaScriptEscape;

public class StringUtil {

  private StringUtil() {
  }

  public static String replaceNonNumeric(String str) {
    final var builder = new StringBuilder();

    for (int i = 0; i < str.length(); i++) {
      char character = str.charAt(i);

      if (Character.isDigit(character)) {
        builder.append(character);
      }
    }

    return builder.toString();
  }

  public static String trimFilter(String str) {
    return Optional.ofNullable(str)
        .map(String::trim)
        .filter(s -> !s.isEmpty())
        .orElse(null);
  }

  public static String validLocalDate(String str) {
    return Optional.ofNullable(str)
        .map(String::trim)
        .filter(s -> !s.isEmpty())
        .filter(DateUtil::isValidLocalDate)
        .orElse(null);
  }

  public static boolean isValidEmail(String email) {
    if (email == null || email.isEmpty() || email.length() > 320) {
      return false;
    }

    int atIndex = email.indexOf('@');
    int dotIndex = email.lastIndexOf('.');

    // Check if '@' and '.' are present
    if (atIndex <= 0 || dotIndex <= atIndex || dotIndex == email.length() - 1) {
      return false;
    }

    // Check if there are consecutive dots
    if (email.contains("..")) {
      return false;
    }

    // Check if there are spaces at the beginning or end of the email
    if (email.charAt(0) == ' ' || email.charAt(email.length() - 1) == ' ') {
      return false;
    }

    return true;
  }

  public static UUID uuid(String str) {
    try {
      return Optional.ofNullable(str)
          .map(String::trim)
          .filter(s -> !s.isEmpty())
          .map(UUID::fromString)
          .orElse(null);
    } catch (Exception e) {
      return null;
    }
  }

  public static boolean isNumeric(String strNum) {
    if (strNum == null) {
      return false;
    }
    try {
      double d = Double.parseDouble(strNum);
    } catch (NumberFormatException nfe) {
      return false;
    }
    return true;
  }

  public static byte[] deflate(byte[] bytes) throws IOException {

    ByteArrayOutputStream os = new ByteArrayOutputStream();
    try (DeflaterOutputStream dos = new DeflaterOutputStream(os)) {
      dos.write(bytes);
    }
    return os.toByteArray();
  }

  public static byte[] inflate(byte[] bytes) throws IOException {
    ByteArrayOutputStream os = new ByteArrayOutputStream();
    try (OutputStream ios = new InflaterOutputStream(os)) {
      ios.write(bytes);
    }

    return os.toByteArray();
  }

  public static String deflate(String str) {
    try {
      final var bytes = deflate(str.getBytes(StandardCharsets.UTF_8));
      return Base64.getUrlEncoder().encodeToString(bytes);
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  public static String inflate(String str) {
    try {
      final var decode = Base64.getUrlDecoder().decode(str);
      final var decompress = inflate(decode);
      return new String(decompress, StandardCharsets.UTF_8);
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  public static long crc32(String str) {
    final var crc32 = new CRC32();
    crc32.update(ByteBuffer.wrap(str.getBytes(StandardCharsets.UTF_8)));
    return crc32.getValue();
  }

  public static long objHash(Object obj) {
    final var encode = Json.encode(obj);
    return xxHash32(encode);
  }

  public static long xxHash32(String str) {
    final var xxHash32 = new XXHash32();
    xxHash32.update(ByteBuffer.wrap(str.getBytes(StandardCharsets.UTF_8)));
    return xxHash32.getValue();
  }

  public static String escapeInput(String str) {
    return Optional.ofNullable(str)
        .map(String::trim)
        .filter(s -> !s.isEmpty())
        .map(HtmlEscape::escapeHtml5Xml)
        .map(JavaScriptEscape::escapeJavaScriptMinimal)

//        .map(StringEscapeUtils::escapeHtml4)
//        .map(StringEscapeUtils::escapeEcmaScript)
//        .map(StringEscapeUtils::escapeXml11)
        .map(String::trim)
        .filter(s -> !s.isEmpty())
        .orElse(null);
  }

  public static boolean hasNumbers(String input) {
    String result = StringUtils.getDigits(input);
    return result != null && !result.isEmpty();
  }
}
