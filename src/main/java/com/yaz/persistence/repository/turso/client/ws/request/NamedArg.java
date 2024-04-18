package com.yaz.persistence.repository.turso.client.ws.request;

import java.time.LocalDate;

public record NamedArg(String name, Value value) {

  public static NamedArg nullV(String name) {
    return new NamedArg(name, Value.nullV());
  }

  public static NamedArg integer(String name, String value) {
    return new NamedArg(name, Value.integer(value));
  }

  public static NamedArg number(String name, Number value) {
    return new NamedArg(name, Value.number(value));
  }

  public static NamedArg text(String name, String value) {
    return new NamedArg(name, Value.text(value));
  }

  public static NamedArg text(String name, LocalDate localDate) {
    return new NamedArg(name, Value.text(localDate));
  }

  public static <T extends Enum<T>> NamedArg enumV(String name, T value) {
    return new NamedArg(name, Value.enumV(value));
  }

  public static NamedArg blob(String name, byte[] value) {
    return new NamedArg(name, Value.blob(value));
  }

  public static NamedArg blob(String name, String value) {
    return new NamedArg(name, Value.blob(value));
  }

  public static NamedArg bool(String name, Boolean value) {
    return new NamedArg(name, Value.bool(value));
  }

}
