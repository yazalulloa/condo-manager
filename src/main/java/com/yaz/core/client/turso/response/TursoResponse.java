package com.yaz.core.client.turso.response;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.yaz.core.util.SqlUtil;
import io.quarkus.runtime.annotations.RegisterForReflection;
import io.vertx.core.json.JsonObject;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;

@RegisterForReflection
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record TursoResponse(
    String baton,
    String baseUrl,
    List<ResultsItem> results
) {

  public int affectedRows() {

    return Optional.of(results)
        .filter(list -> !list.isEmpty())
        .map(List::getFirst)
        .map(ResultsItem::response)
        .map(Response::result)
        .map(ResponseResult::affectedRowCount)
        .orElse(0);
  }

  public Optional<List<Item>> firstRow() {

    if (results.isEmpty()) {
      return Optional.empty();
    }
    return Optional.ofNullable(results.getFirst())
        .map(ResultsItem::response)
        .map(Response::result)
        .map(ResponseResult::rows)
        .filter(list -> !list.isEmpty())
        .map(List::getFirst);
  }

  public List<Row> values() {

    return Optional.ofNullable(results.getFirst())
        .map(ResultsItem::response)
        .map(Response::result)
        .map(result -> {
          final var rows = result.rows();
          final var values = new ArrayList<Row>(rows.size());

          for (List<Item> list : rows) {

            final var map = new HashMap<String, String>();
            for (int i = 0; i < list.size(); i++) {
              final var item = list.get(i);
              final var name = result.cols().get(i).name();
              map.putIfAbsent(name, item.value());
            }
            values.add(new Row(map));
          }

          return values;

        })
        .orElseGet(() -> new ArrayList<>(0));
  }

  public Result result() {
    return new Result(values());
  }

  @RegisterForReflection
  public record Row(
      Map<String, String> map
  ) {

    public Long getLong(String name) {
      return Optional.ofNullable(map.get(name)).map(Long::parseLong).orElse(null);
    }

    public <T extends Enum<T>> T getEnum(String name, Function<String, T> function) {
      return Optional.ofNullable(map.get(name)).map(function).orElse(null);
    }

    public BigDecimal getBigDecimal(String name) {
      return Optional.ofNullable(map.get(name)).map(BigDecimal::new).orElse(null);
    }

    public LocalDate getLocalDate(String name) {
      return Optional.ofNullable(map.get(name)).map(LocalDate::parse).orElse(null);
    }

    public LocalDateTime getLocalDateTime(String name) {

      return Optional.ofNullable(map.get(name))
          .map(SqlUtil.SQLITE_DATE_TIME_FORMATTER::parse)
          .map(LocalDateTime::from).orElse(null);
    }

    public String getString(String name) {
      return map.get(name);
    }

    public JsonObject getJsonObject(String name) {
      return Optional.ofNullable(getString(name)).map(JsonObject::new).orElse(null);
    }

    public byte[] getByteArray(String name) {
      return Optional.ofNullable(getString(name)).map(String::getBytes).orElse(null);
    }

    public boolean getBoolean(String active) {
      return Optional.ofNullable(map.get(active)).map(str -> Boolean.parseBoolean(str) || "1".equals(str))
          .orElse(false);
    }
  }

  @RegisterForReflection
  public record Result(
      List<Row> rows
  ) {


    public Optional<Row> firstRow() {
      return rows.isEmpty() ? Optional.empty() : Optional.of(rows.getFirst());
    }

    public <T> Optional<T> one(Function<Row, T> function) {
      return firstRow().map(function);
    }
  }


}