package com.yaz.core.client.turso.request;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.Data;

@Data
public class TursoQuery {

  private List<RequestsItem> requests;


  public static TursoQuery simple(String sql, Arg... args) {
    final var arguments = Optional.ofNullable(args)
        .filter(a -> a.length > 0)
        .map(List::of)
        .orElse(null);

    return oneQuery(sql, arguments);
  }

  public static TursoQuery oneQuery(String sql, List<Arg> args) {
    final var tursoQuery = new TursoQuery();
    tursoQuery.setRequests(new ArrayList<>());
    final var execute = new RequestsItem("execute", new Stmt(sql, args));
    tursoQuery.getRequests().add(execute);
    tursoQuery.getRequests().add(new RequestsItem("close"));
    return tursoQuery;
  }


}