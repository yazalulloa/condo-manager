package com.yaz.job;

import com.yaz.util.RxUtil;
import io.quarkus.scheduler.Scheduled;
import io.reactivex.rxjava3.core.Completable;
import io.reactivex.rxjava3.core.Observable;
import io.vertx.rxjava3.core.Vertx;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class DeleteTmpDirJob {

  private final Vertx vertx;

  @Scheduled(delay = 5, every = "1H")
  public void deleteDir() {
    deleteDirNow("tmp/receipts");
  }

  public void deleteDirNow(String path) {

    vertx.fileSystem().exists(path)
        .filter(b -> b)
        .flatMapSingle(b -> vertx.fileSystem().readDir(path))
        .flatMapObservable(Observable::fromIterable)
        .flatMapCompletable(this::deleteFile)
        .subscribe(RxUtil.completableObserver(
            () -> {
            },
            t -> {
            }));
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
