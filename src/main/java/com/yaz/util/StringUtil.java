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
}
