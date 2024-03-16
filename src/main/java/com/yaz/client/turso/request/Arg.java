package com.yaz.client.turso.request;

import lombok.Data;

@Data
public class Arg {

  private final String type;
  private final Object value;

  public static Arg integerArg(String value) {
    return new Arg("integer", value);
  }

  public static Arg textArg(String value) {
    return new Arg("text", value);
  }

  public static Arg blobArg(String value) {
    return new Arg("base64", value);
  }

  public static Arg floatArg(Number value) {
    return new Arg("float", value);
  }
}
