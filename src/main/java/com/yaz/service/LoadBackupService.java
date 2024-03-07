package com.yaz.service;

import com.yaz.mongo.MongoApartment;
import com.yaz.persistence.ApartmentRepository;
import com.yaz.persistence.BuildingRepository;
import com.yaz.persistence.RateRepository;
import com.yaz.persistence.entities.Apartment;
import com.yaz.persistence.entities.Building;
import com.yaz.persistence.entities.Rate;
import com.yaz.util.PagingJsonFile;
import com.yaz.util.RxUtil;
import io.reactivex.rxjava3.core.Completable;
import io.reactivex.rxjava3.core.Observable;
import io.reactivex.rxjava3.schedulers.Schedulers;
import io.vertx.mutiny.core.Vertx;
import io.vertx.mutiny.sqlclient.SqlResult;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.function.Consumer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.compress.archivers.ArchiveEntry;
import org.apache.commons.compress.archivers.tar.TarArchiveInputStream;
import org.apache.commons.compress.compressors.gzip.GzipCompressorInputStream;
import org.apache.commons.compress.utils.IOUtils;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class LoadBackupService {

  private final Vertx vertx;
  private final BuildingRepository buildingRepository;
  private final ApartmentRepository apartmentRepository;
  private final RateRepository rateRepository;
  private final PagingJsonFile pagingJsonFile = new PagingJsonFile();

  public Completable load() {

    return Completable.defer(() -> {
          final var path = "/home/yaz/Downloads/cm-backup.tar.gz";
          final var temPath = "tmp/";
          final var tempPaths = Paths.get(temPath);

          Files.createDirectories(tempPaths);

          try (var stream = Files.walk(tempPaths)) {

            stream
                .sorted(Comparator.reverseOrder())
                .map(Path::toFile)
                .forEach(File::delete);
          }

          Files.createDirectories(tempPaths);

          final var archiveInputStream = new TarArchiveInputStream(
              new GzipCompressorInputStream(new BufferedInputStream(new FileInputStream(path))));

          ArchiveEntry entry;
          final var completables = new ArrayList<Completable>();

          Consumer<Completable> addToList = (completable) -> {
            completables.add(completable.subscribeOn(Schedulers.io()));
          };
          while ((entry = archiveInputStream.getNextEntry()) != null) {
            final var name = entry.getName();

            final var fileName = temPath + name;

            try (OutputStream o = Files.newOutputStream(new File(fileName).toPath())) {
              IOUtils.copy(archiveInputStream, o);
            }
            log.info(name);

            switch (name) {
              case "buildings.json.gz": {
                final var completable = pagingJsonFile.pagingJsonFile(100, fileName, Building.class, list -> {

                      return Observable.fromIterable(list)
                          .toList()
                          .map(buildingRepository::insertIgnore)
                          .flatMap(RxUtil::single)
                          .map(SqlResult::rowCount)
                          .doOnSuccess(i -> log.info("BUILDINGS INSERTED: {}", i))
                          .ignoreElement();

                    })
                    .doOnComplete(() -> log.info("BUILDINGS COMPLETED"))
                    .doOnError(throwable -> log.error("ERROR BUILDINGS", throwable));
                addToList.accept(completable);
              }
              break;
              case "apartments.json.gz": {
                final var completable = pagingJsonFile.pagingJsonFile(100, fileName, MongoApartment.class, list -> {

                  log.info("INSERTING APARTMENTS SIZE: {}", list.size());
                      return Observable.fromIterable(list)
                          .map(apt -> Apartment.builder()
                              .buildingId(apt.apartmentId().buildingId())
                              .number(apt.apartmentId().number())
                              .name(apt.name())
                              .aliquot(apt.amountToPay())
                              .emails(apt.emails())
                              .build())
                          .toList()
                          .map(apartmentRepository::insertOnUpdate)
                          .retry(3)
                          .flatMap(RxUtil::single)
                          .doOnSuccess(i -> log.info("APARTMENTS INSERTED: {}", i))
                          .ignoreElement();

                    })
                    .doOnComplete(() -> log.info("APARTMENTS COMPLETED"))
                    .doOnError(throwable -> log.error("ERROR APARTMENTS", throwable));

                addToList.accept(completable);
              }
              break;
              case "rates.json.gz": {
                final var completable = pagingJsonFile.pagingJsonFile(100, fileName, Rate.class, list -> {

                      return RxUtil.single(rateRepository.replace(list))
                          .map(SqlResult::rowCount)
                          .doOnSuccess(i -> log.info("RATES INSERTED: {}", i))
                          .ignoreElement();

                    })
                    .doOnComplete(() -> log.info("RATES COMPLETED"))
                    .doOnError(throwable -> log.error("ERROR RATES", throwable));

                addToList.accept(completable);
              }
              break;
            }
          }

          return Completable.merge(completables);
        })
        .doOnError(throwable -> log.error("ERROR", throwable))
        .subscribeOn(Schedulers.io());
  }
}
