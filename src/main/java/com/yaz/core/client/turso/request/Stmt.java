package com.yaz.core.client.turso.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@AllArgsConstructor
public class Stmt {

  private String sql;
  private List<Arg> args;

  public static Stmt simple(String sql) {
    return new Stmt(sql, null);
  }
}