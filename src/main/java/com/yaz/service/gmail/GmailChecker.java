package com.yaz.service.gmail;

import com.google.api.client.auth.oauth2.TokenResponseException;
import com.yaz.helper.VertxHelper;
import com.yaz.persistence.entities.EmailConfig;
import com.yaz.service.entity.EmailConfigService;
import com.yaz.util.DateUtil;
import com.yaz.util.RxUtil;
import io.reactivex.rxjava3.core.Completable;
import io.reactivex.rxjava3.core.Maybe;
import io.reactivex.rxjava3.core.Observable;
import io.reactivex.rxjava3.core.Single;
import io.reactivex.rxjava3.schedulers.Schedulers;
import io.vertx.rxjava3.core.Vertx;
import io.vertx.rxjava3.core.buffer.Buffer;
import io.vertx.rxjava3.core.file.FileSystem;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collection;
import java.util.HashSet;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class GmailChecker {

  private final Vertx vertx;
  private final VertxHelper vertxHelper;
  private final GmailHelper helper;
  private final EmailConfigService emailConfigService;

  private FileSystem fileSystem() {
    return vertx.fileSystem();
  }

  private Path dirPath(String userId) {
    return Paths.get(GmailHelper.DIR, userId);
  }

  private Path filePath(String userId) {
    return dirPath(userId).resolve("StoredCredential");
  }

  public Completable checkAll() {
    final var ids = new HashSet<String>();
    return RxUtil.paging(emailConfigService.pagingProcessor(1), list -> {
          return Observable.fromIterable(list)
              .flatMapCompletable(emailConfigUser -> {
                ids.add(emailConfigUser.emailConfig().userId());

                if (emailConfigUser.shouldGetNewOne()) {
                  return Completable.complete();
                }

                final var emailConfig = emailConfigUser.emailConfig();
                return check(emailConfig.userId(), emailConfig.hash())
                    .doOnError(throwable -> log.error("ERROR with config {}", emailConfig.userId(), throwable))
                    .onErrorComplete();
              });
        })
        .doOnComplete(() -> log.info("CHECK_ALL_DONE {}", ids.size()))
        .andThen(Completable.defer(() -> deleteNotFound(ids)));
  }

  private Completable deleteNotFound(Collection<String> list) {

    return vertx.fileSystem()
        .readDir(GmailHelper.DIR)
        .flatMapObservable(Observable::fromIterable)
        .filter(s -> list.stream().noneMatch(s::endsWith))
        .doOnNext(s -> log.info("DELETE {}", s))
        .doOnNext(s -> helper.clearFlow(s, false))
        .flatMapCompletable(s -> vertx.fileSystem().deleteRecursive(s, true));

  }


  public Completable check(String userId, long hash) {

    return fileCheck(hash, userId)
        .andThen(Completable.defer(() -> {

          final var credential = helper.credential(userId);

          return RxUtil.completable(helper.testCredential(credential))
              .toSingleDefault(Optional.<Throwable>empty())
              .doOnError(throwable -> {

                if (!(throwable instanceof TokenResponseException)) {
                  log.error("Error while testing credential", throwable);
                }
              })
              .onErrorReturn(Optional::of)
              .flatMapCompletable(optError -> {
                return vertxHelper.crc32(filePath(userId).toString())
                    .flatMapCompletable(currentHash -> {
                      if (currentHash == hash && optError.isEmpty()) {
                        return emailConfigService.updateLastCheck(userId, credential.getRefreshToken() != null,
                            credential.getExpirationTimeMilliseconds());
                      }

                      return fileSystem().readFile(filePath(userId).toString())
                          .doOnError(throwable -> log.error("Error while reading file", throwable))
                          .map(buffer -> {

                            return EmailConfig.builder()
                                .userId(userId)
                                .file(buffer.getBytes())
                                .fileSize(buffer.length())
                                .hash(currentHash)
                                .active(true)
                                .isAvailable(optError.isEmpty())
                                .hasRefreshToken(credential.getRefreshToken() != null)
                                .expiresIn(credential.getExpirationTimeMilliseconds())
                                .lastCheckAt(DateUtil.utcLocalDateTime())
                                .updatedAt(DateUtil.utcLocalDateTime())
                                .stacktrace(optError.map(Throwable::getMessage).orElse(null))
                                .build();
                          })
                          .map(emailConfigService::update)
                          .flatMapCompletable(RxUtil::completable);
                    });
              });
        }))
        .subscribeOn(Schedulers.io());
  }


  public Completable fileCheck(long hash, String userId) {
    final var dirPath = Paths.get(GmailHelper.DIR, userId);
    final var filePath = dirPath.resolve("StoredCredential");
    //final var filePath = Paths.get(GmailHelper.DIR, userId, "StoredCredential");
    return fileSystem().exists(filePath.toString())
        .flatMapMaybe(bool -> {

          if (bool) {
            return vertxHelper.crc32(filePath.toString())
                .map(h -> h == hash)
                .flatMapMaybe(b -> {
                  if (b) {
                    return Maybe.just(Optional.<Long>empty());
                  }

                  return fileSystem().delete(filePath.toString())
                      .andThen(Maybe.empty());

                });
          }

          return Maybe.empty();
        })
        .switchIfEmpty(Single.defer(() -> {

          helper.clearFlow(userId, false);

          return writeFile(userId, filePath.toString(), dirPath.toString())
              .andThen(fileSystem().exists(filePath.toString()))
//              .doOnSuccess(aBoolean -> {
//                log.info("Vertx File exists {} {}", aBoolean, filePath);
//
//                fileSystem().exists(filePath.toString())
//                    .doOnSuccess(aBoolean1 -> log.info("Vertx File exists 2 {} {}", aBoolean1, filePath))
//                    .subscribe();
//
//                log.info("Files exists {} {}", Files.exists(filePath), filePath);
//
//
//              })
              .ignoreElement()
              //.andThen(vertxHash(filePath.toString()))
              .toSingleDefault(1L)
              .map(Optional::of);
        }))
        .ignoreElement();
  }

  public Completable writeFile(String userId, String filePath, String dirPath) {
    return emailConfigService.getFile(userId)
        .flatMapCompletable(file -> {
          return fileSystem().mkdirs(dirPath)
              .andThen(fileSystem().writeFile(filePath, Buffer.buffer(file)));
        });
  }
}
