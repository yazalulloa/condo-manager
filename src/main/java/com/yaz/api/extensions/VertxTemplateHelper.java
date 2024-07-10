package com.yaz.api.extensions;

import io.smallrye.mutiny.Uni;
import io.vertx.mutiny.core.Vertx;
import io.vertx.mutiny.core.buffer.Buffer;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Named;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@ApplicationScoped
@RequiredArgsConstructor
@Named("vertxTemplateHelper")
@Slf4j
public class VertxTemplateHelper {

  private static final String initialPath = "src/main/resources/META-INF/resources";

  private final Vertx vertx;

  public Uni<String> loadAsset(String path) {
    return vertx.fileSystem().readFile(initialPath + path)
        .map(Buffer::toString)
        .memoize()
        .indefinitely();
  }
}
