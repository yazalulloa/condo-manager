package com.yaz;

import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import org.junit.jupiter.api.Test;

public class PrintNativeRegistration {

  @Test
  void print() throws IOException {
    final var serializationConfig = new JsonObject(
        Files.readString(Paths.get("native-config/native-image/serialization-config.json")));
    final var reflectConfig = new JsonArray(Files.readString(Paths.get("native-config/native-image/reflect-config.json")));

    final var set = Stream.concat(
            serializationConfig.getJsonArray("types").stream()
                .map(JsonObject.class::cast)
                .map(j -> j.getString("name")),
            reflectConfig.stream()
                .map(JsonObject.class::cast)
                .map(j -> j.getString("name"))
                .filter(str -> str.startsWith("com.google."))
        )
        .map(str -> {
          final var i = str.indexOf('$');
          if (i > 0) {
            return str.substring(0, i);
          }

          return str;
        })
        .map(s -> s + ".class")
        .sorted()
        .collect(Collectors.joining(",\n"));

    System.out.println(set);

//    System.out.println("serialization-config: " + serializationConfig.encodePrettily());
//    System.out.println("reflect-config: " + reflectConfig.encodePrettily());
  }

}