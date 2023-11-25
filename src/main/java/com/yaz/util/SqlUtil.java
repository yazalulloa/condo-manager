package com.yaz.util;

import io.reactivex.rxjava3.core.Maybe;
import io.vertx.core.json.Json;
import io.vertx.core.json.JsonObject;
import io.vertx.mutiny.sqlclient.Row;
import io.vertx.mutiny.sqlclient.RowSet;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class SqlUtil {

  private SqlUtil() {
  }

  public static String params(int size) {
    return Stream.generate(() -> "?").limit(size)
        .collect(Collectors.joining(","));
  }

  public static <T> List<T> toList(RowSet<Row> rows, Function<Row, T> function) {
    final var list = new ArrayList<T>(rows.size());

    for (Row row : rows) {
      list.add(function.apply(row));
    }

    return list;
  }

  public static <T> List<T> toList(RowSet<Row> rows, Class<T> clazz) {

    return toList(rows, row -> {
      final var json = row.toJson().encode();
      return Json.decodeValue(json, clazz);
    });
  }

  public static void print(RowSet<Row> rowRowSet) {
    log.info("number of the affected rows {} number of rows retrieved {}", rowRowSet.rowCount(),
        rowRowSet.size());
    for (Row row : rowRowSet) {
      log.info("ROW {}", row.toJson());
    }
  }

  public static List<JsonObject> toJsonObject(RowSet<Row> rows) {
    final var list = new ArrayList<JsonObject>();
    for (Row row : rows) {
      final var json = row.toJson();
      list.add(json);
    }
    return list;
  }

  public static <T> Maybe<T> parseOne(RowSet<Row> rows, Class<T> clazz) {
    final var iterator = rows.iterator();

    if (!iterator.hasNext()) {
      return Maybe.empty();
    }

    final var row = iterator.next();
    final var json = row.toJson().encode();
    final var obj = Json.decodeValue(json, clazz);
    return Maybe.just(obj);
  }
}
