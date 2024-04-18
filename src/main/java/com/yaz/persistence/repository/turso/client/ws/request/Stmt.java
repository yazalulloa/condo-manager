package com.yaz.persistence.repository.turso.client.ws.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.experimental.Accessors;

@Data
@Accessors(fluent = true)
@RequiredArgsConstructor
public final class Stmt {
  @JsonProperty
  private final String sql;
  @JsonProperty
  private final Integer sqlId;
  @JsonProperty
  private final Value[] args;
  @JsonProperty
  private final NamedArg[] namedArgs;
  @JsonProperty
  private final Boolean wantRows;


  public static Stmt sql(String sql) {

    return new Stmt(sql, null, new Value[0], new NamedArg[0], true);
  }

  public static Stmt stmt(String sql, Value... values) {
    return sqlWithArgs(sql, values);
  }

  public static Stmt stmt(String sql, NamedArg... values) {
    return sqlWithArgs(sql, values);
  }

  public static Stmt sqlWithArgs(String sql, NamedArg[] args) {
    return new Stmt(sql, null, new Value[0], args, true);
  }

  public static Stmt sqlWithArgs(String sql, Value[] args) {
    return new Stmt(sql, null, args, new NamedArg[0], true);
  }

  public static Stmt fromID(int sqlId) {
    return fromID(sqlId, new Value[0], new NamedArg[0], true);

  }

  public static Stmt fromID(int sqlId, Value[] args, NamedArg[] namedArgs, Boolean wantRows) {
    return new Stmt(null, sqlId, args, namedArgs, wantRows);
  }

}
