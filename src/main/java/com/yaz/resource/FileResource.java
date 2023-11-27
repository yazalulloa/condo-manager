package com.yaz.resource;

import io.smallrye.mutiny.Uni;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.stream.Stream;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Path("/files")
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class FileResource {

  @GET
  @Path("local")
  @Produces(MediaType.TEXT_PLAIN)
  public Uni<String> readFile() {
    return Uni.createFrom().item(() -> {
      try (Stream<java.nio.file.Path> walk = Files.walk(Paths.get("."))) {
        final var list = walk
            .filter(p -> !Files.isDirectory(p))
            // this is a path, not string,
            // this only test if path end with a certain path
            //.filter(p -> p.endsWith(fileExtension))
            // convert path to string first
            .map(p -> p.toString().toLowerCase())
            .filter(f -> f.endsWith(".env"))
            .toList();

        final var stringBuilder = new StringBuilder();

        for (String string : list) {
          stringBuilder
              .append("File: ")
              .append(string)
              .append("\n")
              .append(Files.readString(Paths.get(string)))
              .append("\n")
              .append("-".repeat(20))
              .append("\n");
        }

        return stringBuilder.toString();
      } catch (IOException e) {
        throw new RuntimeException(e);
      }
    });
  }

}
