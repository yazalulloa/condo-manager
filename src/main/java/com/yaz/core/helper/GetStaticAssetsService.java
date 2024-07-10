package com.yaz.core.helper;

import io.reactivex.rxjava3.core.Observable;
import io.reactivex.rxjava3.core.Single;
import io.vertx.rxjava3.core.Vertx;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.List;
import lombok.RequiredArgsConstructor;

@ApplicationScoped
@RequiredArgsConstructor
public class GetStaticAssetsService {

  private static final String initialPath = "src/main/resources/META-INF/resources";

  private final Vertx vertx;

  public Single<List<String>> staticAssets() {
    return processDir(initialPath)
        .flatMapObservable(Observable::fromIterable)
        .map(str -> str.substring(str.indexOf(initialPath) + initialPath.length() + 1))
        .filter(str ->
            !str.contains("favicon")
                && !str.endsWith(".xml")
                && !str.endsWith(".js")
                && !str.endsWith(".css")
                && !str.endsWith(".webmanifest")
                && !str.startsWith("examples"))
        .toList();
  }

  private Single<List<String>> processDir(String path) {
    return vertx.fileSystem().props(path)
        .flatMap(fileProps -> {
          if (fileProps.isDirectory()) {
            return vertx.fileSystem().readDir(path)
                .flatMapObservable(Observable::fromIterable)
                .flatMapSingle(this::processDir)
                .flatMap(Observable::fromIterable)
                .toList();
          }

          return Single.just(List.of(path));
        });
  }
}
