package com.yaz.util;

import java.util.Optional;

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
}
