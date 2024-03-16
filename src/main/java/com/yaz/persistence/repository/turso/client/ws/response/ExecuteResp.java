package com.yaz.persistence.repository.turso.client.ws.response;

import com.yaz.persistence.repository.turso.client.ws.request.Value;
import io.vertx.core.json.JsonObject;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;

public record ExecuteResp(String type, StmtResult result) implements Response {

  public Row[] rows() {
    final var rows = result.rows();
    if (rows == null || rows.length == 0) {
      return new Row[0];
    }

    final var cols = result.cols();

    final var list = new Row[rows.length];
    for (int i = 0; i < rows.length; i++) {
      final var map = new HashMap<String, Value>();
      for (int j = 0; j < cols.length; j++) {
        map.put(cols[j].name(), rows[i][j]);
      }
      list[i] = new Row(map);
    }

    return list;
  }

  public record Row(Map<String, Value> map) {

    public Optional<Value> value(String name) {
      return Optional.ofNullable(map.get(name));
    }

    public Float getFloat(String name) {
      return value(name).map(Value::asFloat).orElse(null);
    }

    public Long getLong(String name) {
      return value(name).map(Value::asLong).orElse(null);
    }

    public <T extends Enum<T>> T getEnum(String name, Function<String, T> function) {
      return value(name).map(Value::asString).map(function).orElse(null);
    }

    public BigDecimal getBigDecimal(String name) {
      return value(name).map(Value::asBigDecimal).orElse(null);
    }

    public LocalDate getLocalDate(String name) {
      return value(name).map(Value::asString).map(LocalDate::parse).orElse(null);
    }

    public LocalDateTime getLocalDateTime(String name) {

      return value(name)
          .map(Value::asLocalDateTime)
          .orElse(null);
    }

    public String getString(String name) {
      return value(name).map(Value::asString).orElse(null);
    }

    public JsonObject getJsonObject(String name) {
      return Optional.ofNullable(getString(name)).map(JsonObject::new).orElse(null);
    }

    public byte[] getByteArray(String name) {
      return Optional.ofNullable(getString(name)).map(String::getBytes).orElse(null);
    }

    public boolean getBoolean(String name) {
      return Optional.ofNullable(map.get(name))
          .map(Value::asBool)
          .orElse(false);
    }

    public byte[] getBlob(String name) {

      return Optional.ofNullable(map.get(name))
          .map(Value::base64)
          .map(Base64.getDecoder()::decode)
          .orElse(null);
    }
  }
}
