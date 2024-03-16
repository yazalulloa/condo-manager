package com.yaz.util;

import java.math.BigDecimal;
import java.security.SecureRandom;
import java.util.Random;

public class RandomUtil {

  private static Random INSTANCE;
  public static final char[] CHARS = "abcdefghjkmnpqrstuvwxyzABCDEFGHIJKMNPQRSTUVWXYZ".toCharArray();
  public static final char[] ALPHANUMERIC = "abcdefghjkmnpqrstuvwxyzABCDEFGHIJKMNPQRSTUVWXYZ0123456789".toCharArray();
  public static final char[] NUMERIC = "1234567890".toCharArray();
  public static final char[] HEXADECIMAL = "0123456789ABCDEF".toCharArray();
  private static final int DEFAULT_LENGTH = 6;

  private static final long UNSIGNED_LONG_19_MIN = 1000000000000000000L;
  private static final int UNSIGNED_INT_10_MIN = 1000000000;

  public static String getID() {
    return getID(DEFAULT_LENGTH, Type.ALPHANUMERIC);
  }

  public static String getID(int length, Type type) {
    return switch (type) {
      case CHARS -> generate(length, CHARS);
      case NUMERIC -> generate(length, NUMERIC);
      case ALPHANUMERIC -> generate(length, ALPHANUMERIC);
      case HEXADECIMAL -> generate(length, HEXADECIMAL);
    };
  }

  public static Random getInstance() {
    if (INSTANCE != null) {
      return INSTANCE;
    }

    synchronized (RandomUtil.class) {
      if (INSTANCE != null) {
        return INSTANCE;
      }

      INSTANCE = new SecureRandom(new SecureRandom().generateSeed(20));
      return INSTANCE;
    }
  }

  public static String generateIdAlphanumeric(int length) {
    return generate(length, ALPHANUMERIC);
  }

  public static String getRandNumb(int length) {
    return generate(length, NUMERIC);
  }

  public static String generate(int length, char[] array) {
    StringBuilder sb = new StringBuilder();
    for (int i = 0; i < length; i++) {
      char c = array[getInstance().nextInt(array.length)];
      sb.append(c);
    }
    return sb.toString();
  }

  public static int randomInt() {
    return getInstance().nextInt();
  }

  public static int randomInt(int i) {
    final int max = 1 + Short.MAX_VALUE - Short.MIN_VALUE;
    return getInstance().nextInt(Math.min(i, max));
  }

  public static int randomInt(int min, int max) {
    return getInstance().nextInt(max - min) + min;
  }

  public static String randomStr(int size) {
    int leftLimit = 48; // numeral '0'
    int rightLimit = 122; // letter 'z'

    return getInstance().ints(leftLimit, rightLimit + 1)
        .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
        .limit(size)
        .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
        .toString();
  }

  public static String randomIntStr(int size) {
    int leftLimit = 48; // numeral '0'
    int rightLimit = 57; // letter '9'

    return getInstance().ints(leftLimit, rightLimit + 1)
        .filter(i -> (i >= 48 && i <= 57))
        .limit(size)
        .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
        .toString();
  }

  public static BigDecimal randomBigDecimal(int integer, int fraction) {
    return new BigDecimal(randomIntStr(integer) + "." + randomIntStr(fraction));
  }

  public static long unsignedLong19() {
    return getInstance().nextLong(UNSIGNED_LONG_19_MIN, Long.MAX_VALUE);
  }

  public static int unsignedInt10() {
    return getInstance().nextInt(UNSIGNED_INT_10_MIN, Integer.MAX_VALUE);
  }

  public enum Type {
    ALPHANUMERIC, HEXADECIMAL, NUMERIC, CHARS
  }
}
