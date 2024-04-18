package com.yaz;

import com.yaz.core.reflection.NativeRegistration;
import io.quarkus.runtime.annotations.RegisterForReflection;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import org.junit.jupiter.api.Test;
import org.reflections.Reflections;
import org.reflections.scanners.SubTypesScanner;
import org.reflections.util.ClasspathHelper;
import org.reflections.util.ConfigurationBuilder;
import org.reflections.util.FilterBuilder;

public class PrintNativeRegistration {

  @Test
  void print() throws IOException {
    final var classes = NativeRegistration.class.getAnnotation(RegisterForReflection.class)
        .targets();
    final var serializationConfig = new JsonObject(
        Files.readString(Paths.get("native-config/native-image/serialization-config.json")));
    final var reflectConfig = new JsonArray(
        Files.readString(Paths.get("native-config/native-image/reflect-config.json")));
    final var wsTursoClasses = classesFromPackage("com.yaz.persistence.repository.turso.client.ws");

    final var set = Stream.concat(
            Stream.concat(
                Arrays.stream(classes).map(Class::getName),
                wsTursoClasses.stream()
            ),
            Stream.concat(
                serializationConfig.getJsonArray("types").stream()
                    .map(JsonObject.class::cast)
                    .map(j -> j.getString("name")),
                reflectConfig.stream()
                    .map(JsonObject.class::cast)
                    .map(j -> j.getString("name"))
                    .filter(str -> str.startsWith("com.google.") || str.startsWith("org.openxmlformats.")
                    || str.startsWith("org.apache."))
            )
        )
        .map(str -> {
          final var i = str.indexOf('$');
          if (i > 0) {
            return str.substring(0, i);
          }

          return str;
        })
        .map(s -> s + ".class")
        .collect(Collectors.toSet())
        .stream()
        .sorted()
        .collect(Collectors.joining(",\n"));

    System.out.println(set);

//    System.out.println("serialization-config: " + serializationConfig.encodePrettily());
//    System.out.println("reflect-config: " + reflectConfig.encodePrettily());
  }

  public static Set<String> classesFromPackage(String packagePath) {
    Reflections reflections =
        new Reflections(new ConfigurationBuilder()
            .filterInputsBy(new FilterBuilder().includePackage(packagePath))
            .setUrls(ClasspathHelper.forPackage(packagePath))
            .setScanners(new SubTypesScanner(false)));

    return reflections.getAllTypes();
  }
}
