package com.yaz.persistence.repository.turso.client.ws.request;

import com.yaz.util.SqlUtil;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Optional;

public record Value(String type, Object value, String base64) {


  public static final String FLOAT_TYPE = "float";
  public static final String INTEGER_TYPE = "integer";
  public static final String NULL_TYPE = "null";
  public static final String TEXT_TYPE = "text";
  public static final String BLOB_TYPE = "blob";


  public static Value nullV() {
    return new Value(NULL_TYPE, null, null);
  }

  public static Value integer(String value) {
    if (value == null) {
      return nullV();
    }

    return new Value(INTEGER_TYPE, value, null);
  }

  public static Value number(Number value) {
    if (value == null) {
      return nullV();
    }

    return new Value(FLOAT_TYPE, value, null);
  }

  public static Value text(String value) {
    if (value == null) {
      return nullV();
    }

    return new Value(TEXT_TYPE, value, null);
  }

  public static Value text(LocalDate localDate) {
    if (localDate == null) {
      return nullV();
    }

    return text(localDate.toString());
  }

  public static <T extends Enum<T>> Value enumV(T value) {
    if (value == null) {
      return nullV();
    }
    return text(value.name());
  }

  public static Value blob(String base64) {
    if (base64 == null) {
      return nullV();
    }

    return new Value(BLOB_TYPE, null, base64);
  }

  public static Value blob(byte[] bytes) {
    if (bytes == null || bytes.length == 0) {
      return nullV();
    }

    return blob(Base64.getEncoder().encodeToString(bytes));
  }

  public static Value bool(Boolean bool) {
    if (bool == null) {
      return nullV();
    }

    return integer(bool ? "1" : "0");
  }

  public static Value text(LocalDateTime localDateTime) {
    if (localDateTime == null) {
      return nullV();
    }
    final var text = SqlUtil.SQLITE_DATE_TIME_FORMATTER.format(localDateTime);

    return text(text);
  }


  public Long asLong() {
    if (type().equals(FLOAT_TYPE)) {
      return ((Number) value()).longValue();
    }

    if (type().equals(INTEGER_TYPE)) {
      return Long.parseLong((String) value());
    }

    if (type().equals(NULL_TYPE)) {
      return null;
    }

    throw new IllegalStateException("Not a long value " + type() + " " + value() + " " + base64());
  }

  public Integer asInt() {
    if (type().equals(FLOAT_TYPE)) {
      return ((Number) value()).intValue();
    }

    if (type().equals(INTEGER_TYPE)) {
      return Integer.parseInt((String) value());
    }

    if (type().equals(NULL_TYPE)) {
      return null;
    }

    throw new IllegalStateException("Not an int value " + type() + " " + value() + " " + base64());
  }

  public Float asFloat() {
    if (type().equals(FLOAT_TYPE)) {
      return ((Number) value()).floatValue();
    }

    if (type().equals(INTEGER_TYPE)) {
      return Float.valueOf((String) value());
    }

    if (type().equals(NULL_TYPE)) {
      return null;
    }

    throw new IllegalStateException("Not a float value " + type() + " " + value() + " " + base64());
  }

  public Double asDouble() {
    if (type().equals(FLOAT_TYPE)) {
      return ((Number) value()).doubleValue();
    }

    if (type().equals(INTEGER_TYPE)) {
      return Double.valueOf((String) value());
    }

    if (type().equals(NULL_TYPE)) {
      return null;
    }

    throw new IllegalStateException("Not a double value " + type() + " " + value() + " " + base64());
  }

  public BigDecimal asBigDecimal() {
    if (type().equals(FLOAT_TYPE)) {
      return (BigDecimal) value();
    }

    if (type().equals(INTEGER_TYPE)) {
      return new BigDecimal((String) value());
    }

    if (type().equals(NULL_TYPE)) {
      return null;
    }

    throw new IllegalStateException("Not a big decimal value " + type() + " " + value() + " " + base64());
  }

  public String asString() {
    if (type().equals(TEXT_TYPE) || type().equals(BLOB_TYPE)) {
      return (String) value();
    }

    if (type().equals(NULL_TYPE)) {
      return null;
    }

    throw new IllegalStateException("Not a string value " + type() + " " + value() + " " + base64());
  }

  public LocalDateTime asLocalDateTime() {
    return Optional.ofNullable(asString())
        .map(SqlUtil.SQLITE_DATE_TIME_FORMATTER::parse)
        .map(LocalDateTime::from)
        .orElse(null);
  }
  public Boolean asBool() {
    if (type().equals(INTEGER_TYPE)) {
      return "1".equals(value());
    }

    if (type().equals(TEXT_TYPE)) {
      return "true".equals(value());
    }

    if (type().equals(NULL_TYPE)) {
      return null;
    }

    throw new IllegalStateException("Not a boolean value " + type() + " " + value() + " " + base64());
  }


}
