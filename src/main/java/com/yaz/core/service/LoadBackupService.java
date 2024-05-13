package com.yaz.core.service;

import com.yaz.core.service.entity.ExtraChargeService;
import com.yaz.core.service.entity.RateService;
import com.yaz.core.service.entity.ReserveFundService;
import com.yaz.core.util.DecimalUtil;
import com.yaz.core.util.MutinyUtil;
import com.yaz.core.util.PagingJsonFile;
import com.yaz.core.util.RxUtil;
import com.yaz.persistence.domain.Currency;
import com.yaz.persistence.domain.request.ExtraChargeCreateRequest;
import com.yaz.persistence.domain.request.ReceiptCreateRequest;
import com.yaz.persistence.entities.Building;
import com.yaz.persistence.entities.Debt;
import com.yaz.persistence.entities.ExtraCharge;
import com.yaz.persistence.entities.ExtraCharge.Apt;
import com.yaz.persistence.entities.ExtraCharge.Type;
import com.yaz.persistence.entities.Rate;
import com.yaz.persistence.entities.Receipt;
import com.yaz.persistence.entities.ReserveFund;
import com.yaz.persistence.mongo.MongoBuilding;
import com.yaz.persistence.mongo.MongoReceipt;
import com.yaz.persistence.mongo.MongoReceipt.MongoExtraCharge;
import com.yaz.persistence.repository.turso.ReceiptRepository;
import io.reactivex.rxjava3.core.Completable;
import io.reactivex.rxjava3.core.Observable;
import io.reactivex.rxjava3.schedulers.Schedulers;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Month;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Comparator;
import java.util.Optional;
import java.util.function.Consumer;
import java.util.stream.Collectors;
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


  private final ReceiptRepository receiptRepository;
  private final RateService rateService;
  private final ReserveFundService reserveFundService;
  private final ExtraChargeService extraChargeService;
  private final PagingJsonFile pagingJsonFile = new PagingJsonFile();


  public Completable load() {

    return Completable.defer(() -> {
          final var path = "/home/yaz/Downloads/cm-backup.tar.gz";
          final var temPath = "tmp/spring/";
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
                final var completable = pagingJsonFile.pagingJsonFile(100, fileName, MongoBuilding.class, list -> {

                      final var buildings = new ArrayList<Building>();
                      final var extraCharges = new ArrayList<ExtraChargeCreateRequest>();
                      final var reserveFunds = new ArrayList<ReserveFund>();

                      for (MongoBuilding building : list) {
                        building.extraCharges().stream()
                            .collect(Collectors.groupingBy(MongoExtraCharge::description))
                            .values().stream()
                            .map(charges -> {
                              final var apts = charges.stream().map(MongoExtraCharge::aptNumber)
                                  .collect(Collectors.toSet());

                              final var extraCharge = charges.getFirst();

                              return ExtraChargeCreateRequest.builder()
                                  .parentReference(building.id())
                                  .buildingId(building.id())
                                  .type(Type.BUILDING)
                                  .description(extraCharge.description())
                                  .amount(extraCharge.amount())
                                  .currency(extraCharge.currency())
                                  .active(true)
                                  .apartments(apts)
                                  .build();
                            })
                            .forEach(extraCharges::add);

                        building.reserveFunds().stream()
                            .map(reserveFund -> {
                              return reserveFund.toBuilder()
                                  .buildingId(building.id())
                                  .build();
                            })
                            .forEach(reserveFunds::add);
                      }

                      final var insertReserveFunds = Observable.fromIterable(reserveFunds)
                          .map(reserveFundService::insert)
                          .flatMapSingle(MutinyUtil::single)
                          .ignoreElements();

                      final var insertExtraCharges = Observable.fromIterable(extraCharges)
                          .map(extraChargeService::create)
                          .flatMapSingle(MutinyUtil::single)
                          .ignoreElements();

                      return Completable.mergeArray(insertExtraCharges, insertReserveFunds);
//                      return Observable.fromIterable(list)
//                          .toList()
//                          .map(buildingRepository.get()::insertIgnore)
//                          .flatMap(RxUtil::single)
//                          .doOnSuccess(i -> log.info("BUILDINGS INSERTED: {}", i))
//                          .ignoreElement();

                    })
                    .doOnComplete(() -> log.info("BUILDINGS COMPLETED"))
                    .doOnError(throwable -> log.error("ERROR BUILDINGS", throwable));
                addToList.accept(completable);
              }
              break;
              case "apartments.json.gz": {

//                final var completable = pagingJsonFile.pagingJsonFile(100, fileName, MongoApartment.class, list -> {
//
//                      log.info("INSERTING APARTMENTS SIZE: {}", list.size());
//                      return Observable.fromIterable(list)
//                          .map(apt -> Apartment.builder()
//                              .buildingId(apt.apartmentId().buildingId())
//                              .number(apt.apartmentId().number())
//                              .name(apt.name())
//                              .aliquot(apt.amountToPay())
//                              .emails(apt.emails())
//                              .build())
//                          .toList()
//                          .map(apartmentRepository.get()::insert)
//                          .retry(3)
//                          .flatMap(RxUtil::single)
//                          .doOnSuccess(i -> log.info("APARTMENTS INSERTED: {}", i))
//                          .ignoreElement();
//
//                    })
//                    .doOnComplete(() -> log.info("APARTMENTS COMPLETED"))
//                    .doOnError(throwable -> log.error("ERROR APARTMENTS", throwable));
//
//                addToList.accept(completable);
              }
              break;
              case "rates.json.gz": {
                final var completable = pagingJsonFile.pagingJsonFile(100, fileName, Rate.class, list -> {

                      return RxUtil.single(rateService.insert(list))
                          .doOnSuccess(i -> log.info("RATES INSERTED: {}", i))
                          .ignoreElement();

                    })
                    .doOnComplete(() -> log.info("RATES COMPLETED"))
                    .doOnError(throwable -> log.error("ERROR RATES", throwable));

                //addToList.accept(completable);
              }
              break;
              case "receipts.json.gz": {
                final var completable = rateService.last(Currency.USD, Currency.VED)
                    .map(Rate::id)
                    .flatMapCompletable(rateId -> {
                      return pagingJsonFile.pagingJsonFile(5, fileName, MongoReceipt.class, list -> {

                        final var receipts = list.stream()
                            .map(mongoReceipt -> {

                              final var expenses = mongoReceipt.expenses().stream()
                                  .filter(expense -> !expense.reserveFund())
                                  .map(expense -> expense.toBuilder()
                                      .buildingId(mongoReceipt.buildingId())
                                      .build())
                                  .toList();

                              final var extraCharges = new ArrayList<ExtraCharge>();

                              for (MongoExtraCharge charge : mongoReceipt.extraCharges()) {

                                final var optional = extraCharges.stream()
                                    .filter(extraCharge -> extraCharge.description().equals(charge.description()))
                                    .findFirst();

                                if (optional.isPresent()) {
                                  final var extraCharge = optional.get();
                                  extraCharge.apartments().add(new Apt(charge.aptNumber(), null));
                                } else {
                                  final var apts = new ArrayList<Apt>();
                                  apts.add(new Apt(charge.aptNumber(), null));
                                  extraCharges.add(ExtraCharge.builder()
                                      .parentReference(mongoReceipt.buildingId())
                                      .buildingId(mongoReceipt.buildingId())
                                      .type(Type.RECEIPT)
                                      .description(charge.description())
                                      .amount(charge.amount())
                                      .currency(Optional.ofNullable(charge.currency()).orElse(Currency.USD))
                                      .active(true)
                                      .apartments(apts)
                                      .build());
                                }

                              }

                              final var debts = mongoReceipt.debts().stream()
                                  .filter(debt -> {

                                    return debt.receipts() > 0
                                        || (debt.amount() != null && DecimalUtil.greaterThanZero(debt.amount()))
                                        || (debt.previousPaymentAmount() != null && DecimalUtil.greaterThanZero(
                                        debt.previousPaymentAmount()));
                                  })
                                  .map(debt -> Debt.builder()
                                      .buildingId(mongoReceipt.buildingId())
                                      .aptNumber(debt.aptNumber())
                                      .receipts(debt.receipts())
                                      .amount(debt.amount())
                                      .months(
                                          Optional.ofNullable(debt.months()).stream().flatMap(Collection::stream).map(
                                              Month::getValue).collect(Collectors.toSet()))
                                      .previousPaymentAmount(debt.previousPaymentAmount())
                                      .previousPaymentAmountCurrency(debt.previousPaymentAmountCurrency())
                                      .build())
                                  .toList();

                              final var receipt = Receipt.builder()
                                  .buildingId(mongoReceipt.buildingId())
                                  .year(mongoReceipt.year())
                                  .month(mongoReceipt.month().getValue())
                                  .date(mongoReceipt.date())
                                  .rateId(rateId)
                                  .sent(mongoReceipt.sent())
                                  .lastSent(mongoReceipt.lastSent())
                                  .createdAt(mongoReceipt.createdAt())
                                  .build();

                              return ReceiptCreateRequest.builder()
                                  .receipt(receipt)
                                  .expenses(expenses)
                                  .extraCharges(extraCharges)
                                  .debts(debts)
                                  .build();
                            })
                            .toList();

                        return Observable.fromIterable(receipts)
                            .map(receiptRepository::insert)
                            .flatMapSingle(RxUtil::single)
                            .doOnNext(i -> log.info("RECEIPTS ROWS: {}", i.sum()))
                            .ignoreElements();

                      });
                    });
                // addToList.accept(completable);
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
