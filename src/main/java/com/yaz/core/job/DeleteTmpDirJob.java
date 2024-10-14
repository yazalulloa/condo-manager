package com.yaz.core.job;

import com.yaz.core.util.MutinyUtil;
import io.quarkus.scheduler.Scheduled;
import io.reactivex.rxjava3.core.Completable;
import io.reactivex.rxjava3.core.Observable;
import io.smallrye.mutiny.Uni;
import io.vertx.rxjava3.core.Vertx;
import jakarta.enterprise.context.ApplicationScoped;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor
public class DeleteTmpDirJob {

  private final Vertx vertx;

  @Scheduled(delay = 5, every = "1H")
  Uni<Void> deleteDir() {
//    if (true) {
//      return Uni.createFrom().voidItem();
//    }

    return deleteDirNow("tmp/receipts");
  }

  Uni<Void> deleteDirNow(String path) {

    final var completable = vertx.fileSystem().exists(path)
        .filter(b -> b)
        .flatMapSingle(b -> vertx.fileSystem().readDir(path))
        .flatMapObservable(Observable::fromIterable)
        .flatMapCompletable(this::deleteFile);

    return MutinyUtil.toUni(completable);
  }

  private Completable deleteFile(String file) {
    return vertx.fileSystem().props(file)
        .flatMapCompletable(fileProps -> {
          final var lastAccessTime = fileProps.lastAccessTime();
          final var diff = ChronoUnit.HOURS.between(Instant.ofEpochMilli(lastAccessTime), Instant.now());

          if (diff <= 1) {
            return Completable.complete();
          }
          return vertx.fileSystem().deleteRecursive(file, true)
              .doOnComplete(() -> log.info("FILE_DELETED: {}", file))
              .doOnError(t -> log.error("FAILED_TO_DELETE {}", file))
              .onErrorComplete();

        });
  }
}
