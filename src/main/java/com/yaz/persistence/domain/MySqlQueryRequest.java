package com.yaz.persistence.domain;

import io.vertx.mutiny.sqlclient.Tuple;
import io.vertx.sqlclient.impl.ArrayTuple;
import java.util.Collections;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;
import lombok.experimental.Accessors;


@Builder(toBuilder = true)
@Accessors(fluent = true)
@ToString
@Getter
@AllArgsConstructor
@EqualsAndHashCode
public class MySqlQueryRequest {

  private final Type type;
  private final String query;
  private final List<Tuple> params;

  public static MySqlQueryRequest batch(String query, List<Tuple> params) {
    return new MySqlQueryRequest(Type.BATCH, query, params);
  }

  public static MySqlQueryRequest normal(String query) {
    return new MySqlQueryRequest(Type.NORMAL, query, Collections.emptyList());
  }

  public static MySqlQueryRequest normal(String query, ArrayTuple tuple) {
    return normal(query, Tuple.newInstance(tuple));
  }

  public static MySqlQueryRequest normal(String query, Tuple tuple) {
    return new MySqlQueryRequest(Type.NORMAL, query, Collections.singletonList(tuple));
  }

  public enum Type {
    BATCH, NORMAL
  }
}
