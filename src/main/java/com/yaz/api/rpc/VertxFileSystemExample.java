package com.yaz.api.rpc;

import io.vertx.core.Vertx;
import io.vertx.rxjava3.core.buffer.Buffer;
import io.vertx.rxjava3.core.file.FileSystem;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.util.Random;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class VertxFileSystemExample {

  public static final char[] ALPHANUMERIC = "abcdefghjkmnpqrstuvwxyzABCDEFGHIJKMNPQRSTUVWXYZ0123456789".toCharArray();

  private final Vertx vertx;

  public String data() {
    final var secureRandom = new SecureRandom();

    final var fileSystem = FileSystem.newInstance(vertx.fileSystem());

    final var filePath = "tmp/test.txt";

    final var data = generate(secureRandom, 1300, ALPHANUMERIC);

    return fileSystem.deleteRecursive(filePath, true)
        .andThen(fileSystem.writeFile(filePath, Buffer.buffer(data.getBytes(StandardCharsets.UTF_8))))
        .andThen(fileSystem.exists(filePath))
        .doOnSuccess(aBoolean -> log.info("Vertx File exists {}", aBoolean))
        .ignoreElement()
        .andThen(fileSystem.readFile(filePath))
        .blockingGet()
        .toString();
  }

  public static String generate(Random random, int length, char[] array) {
    final var sb = new StringBuilder();
    for (int i = 0; i < length; i++) {
      char c = array[random.nextInt(array.length)];
      sb.append(c);
    }
    return sb.toString();
  }
}
