package com.yaz.core.bcv;


import com.yaz.core.service.csv.PoiUtil;
import com.yaz.core.util.DateUtil;
import com.yaz.core.util.FileUtil;
import com.yaz.persistence.domain.Currency;
import com.yaz.persistence.entities.Rate;
import com.yaz.persistence.entities.Rate.Source;
import io.reactivex.rxjava3.core.Completable;
import io.reactivex.rxjava3.core.Observable;
import io.reactivex.rxjava3.core.Single;
import io.vertx.core.file.OpenOptions;
import io.vertx.rxjava3.core.MultiMap;
import io.vertx.rxjava3.core.Vertx;
import io.vertx.rxjava3.core.file.AsyncFile;
import io.vertx.rxjava3.ext.web.client.HttpResponse;
import jakarta.enterprise.context.ApplicationScoped;
import java.io.File;
import java.io.FileInputStream;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Sheet;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Attribute;


@Slf4j
@ApplicationScoped
@RequiredArgsConstructor
//@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class BcvHistoricService {

  private static volatile Single<Rate> currentRateSingle;

  private static final String DIR = "tmp/bcv/";
  private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy hh:mm a");
  private static final DateTimeFormatter LOCAL_DATE_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy");

  private final Vertx vertx;
  private final AlternateBcvClient client;

  public Single<String> lastFile() {
    return client.get("/estadisticas/tipo-cambio-de-referencia-smc")
        .map(HttpResponse::bodyAsString)
        .map(html -> {
          final var document = Jsoup.parse(html);
          final var section = document.getElementById("block-system-main");

          if (section == null) {
            log.error("Section not found");
            throw new IllegalStateException("Section not found");
          }

          final var links = section.getElementsByTag("a");
          if (links.isEmpty()) {
            log.error("No links found");
            throw new IllegalStateException("No links found");
          }

          final var first = links.first();

          if (first == null) {
            log.error("First link not found");
            throw new IllegalStateException("First link not found");
          }

          final var value = first.attribute("href").getValue();

          if (value.isEmpty()) {
            log.error("First link value not found");
            throw new IllegalStateException("First link value not found");
          }

          if (!value.endsWith(".xls")) {
            log.error("First link value not an xls file");
            throw new IllegalStateException("First link value not an xls file");
          }

          return value;
        });
  }

  public Single<BcvCheck> bcvCheck() {
    return lastFile()
        .flatMap(client::headAbs)
        .map(res -> new BcvCheck(res.getHeader("ETag"), res.getHeader("Last-Modified")));
  }

  private Completable createDir(String path) {
    return vertx.fileSystem().exists(path)
        .flatMapCompletable(bool -> {
          if (bool) {
            log.debug("Dir exists {}", path);
            return Completable.complete();
          }
          log.debug("Dir does not exist {}", path);
          return vertx.fileSystem().mkdirs(path)
              .andThen(createDir(path));
        });
  }

  public Completable createFile(String path) {

    return vertx.fileSystem().open(path, new OpenOptions().setWrite(true).setCreate(true))
        .flatMapCompletable(AsyncFile::close)
        .doOnError(throwable -> log.error("FAIL_TO_OPEN_FILE {} {}", path, throwable.getMessage()))
        //.retryWhen(RetryWithDelay.retry(0, 1000, TimeUnit.MILLISECONDS))
        .onErrorComplete();
  }

  private Single<Rate> getCurrentRateSingle() {
    return createDir(DIR)
        .andThen(lastFile())
        .flatMap(url -> {

          final var path = DIR + url.substring(url.lastIndexOf("/") + 1);
          return createDir(DIR)
              .andThen(createFile(path))
              .andThen(client.download(path, url))
              .flatMap(res -> {
                final var headers = res.headers();
                final var fileInfo = new FileInfo(path, url, headers.get("ETag"), headers.get("Last-Modified"),
                    headers);

                return parseWorkbook(fileInfo, true);
              })
              .doAfterTerminate(() -> vertx.getDelegate().fileSystem().delete(path));
        })
        .map(Result::rates)
        .map(List::getFirst)
        .doAfterTerminate(() -> currentRateSingle = null);
  }

  public Single<Rate> currentRate() {

    if (currentRateSingle == null) {
      log.debug("Current rate is null");
      currentRateSingle = getCurrentRateSingle().cache();
    }

    return currentRateSingle;
  }

  public Single<List<String>> fileLinks() {
    return client.get("/estadisticas/tipo-cambio-de-referencia-smc")
        .map(HttpResponse::bodyAsString)
        .map(this::pages)
        .flatMap(set -> {

          return Observable.fromIterable(set)
              .filter(s -> s.startsWith("/estadisticas"))
              .flatMapSingle(client::get)
              .map(HttpResponse::bodyAsString)
              .map(this::pages)
              .flatMap(Observable::fromIterable)
              .toList()
              .map(s -> {
                set.addAll(s);
                return set;
              });

        })
        .flatMapObservable(Observable::fromIterable)
        .filter(str -> str.endsWith(".xls"))
        .toList();
  }

  public Completable headFileLinks() {
    return fileLinks()
        .flatMapObservable(Observable::fromIterable)
        .flatMapCompletable(url -> {
          return client.headAbs(url)
              .doOnSuccess(res -> {
                final var headers = new HashMap<String, String>();
                headers.put("ETag", res.getHeader("ETag"));
                headers.put("Last-Modified", res.getHeader("Last-Modified"));
                log.info("HEAD {} headers\n{}", url, res.headers());

              })
              .ignoreElement();
        });
  }

  private Completable cleanDir() {
    return vertx.fileSystem().mkdirs(DIR)
        .andThen(vertx.fileSystem().readDir(DIR))
        .flatMapObservable(Observable::fromIterable)
        .flatMapCompletable(vertx.fileSystem()::delete);
  }

  public Single<List<Rate>> historicRates() {

    return Single.zip(cleanDir().toSingleDefault(true), fileLinks(), (b, links) -> links)
        .flatMapObservable(Observable::fromIterable)
        .filter(str -> str.endsWith(".xls"))
        .flatMapSingle(str -> {

          final var path = DIR + str.substring(str.lastIndexOf("/") + 1);
          return client.download(path, str)
              .map(res -> {
                final var headers = res.headers();
                return new FileInfo(path, str, headers.get("ETag"), headers.get("Last-Modified"), headers);
              });
        })
        .flatMapSingle(this::parseWorkbook)
//        .reduce((result, result2) -> {
//          final var rates = Stream.concat(result.rates.stream(), result2.rates.stream()).toList();
//          return new Result(result.sheets + result2.sheets, result.ratesFound + result2.ratesFound, rates);
//        })
        .map(Result::rates)
        .flatMap(Observable::fromIterable)
        .sorted(Comparator.comparing(Rate::createdAt))
        .toList()
        .flatMap(list -> cleanDir().toSingleDefault(list));
  }

  @Builder
  private record FileInfo(
      String path,
      String url,
      String etag,
      String lastModified,
      MultiMap headers
  ) {

  }

  public Single<List<Rate>> parseRates() {
    return vertx.fileSystem().readDir(DIR)
        .flatMapObservable(Observable::fromIterable)
        .flatMapSingle(path -> {
          final var fileInfo = FileInfo.builder().path(path).build();
          return parseWorkbook(fileInfo);
        })
        .map(Result::rates)
        .flatMap(Observable::fromIterable)
        .toList();
  }

  private Single<Result> parseWorkbook(FileInfo fileInfo) {
    return parseWorkbook(fileInfo, false);
  }

  private Single<Result> parseWorkbook(FileInfo fileInfo, boolean first) {

    final var path = fileInfo.path();
    return Single.fromCallable(() -> {
      var counter = 0;
      var expected = 0;

      final var rates = new ArrayList<Rate>();

      final var file = new File(path);
      final var hashFile = FileUtil.hashFile(file);
      try (final var workbook = new HSSFWorkbook(new FileInputStream(file))) {
        log.debug("Reading workbook {} {}", path, workbook.getNumberOfSheets());
        expected += workbook.getNumberOfSheets();
        for (Sheet sheet : workbook) {
          final var sheetName = sheet.getSheetName();
          log.debug("Sheet name: {}", sheetName);

          final var date = PoiUtil.cellToString(sheet.getRow(0).getCell(6));

          final var createdAt = (date.endsWith("M") ? LocalDateTime.from(DATE_TIME_FORMATTER.parse(date))
              : LocalDateTime.parse(date))
              .atZone(DateUtil.VE_ZONE);

          final var dateStr = sheet.getRow(4).getCell(3).getStringCellValue();
          final var dateOfRateStr = dateStr.substring(dateStr.indexOf(":") + 1).trim();
          final var dateOfRate = LocalDate.parse(dateOfRateStr, LOCAL_DATE_FORMATTER);

          final var rateRow = sheet.getRow(14);
          final var currency = rateRow.getCell(1).getStringCellValue();
          assert currency.equals("USD");
          final var rate = rateRow.getCell(6).getNumericCellValue();

          rates.add(Rate.builder()
              .fromCurrency(Currency.valueOf(currency))
              .toCurrency(Currency.VED)
              .rate(BigDecimal.valueOf(rate))
              .dateOfRate(dateOfRate)
              .source(Source.BCV)
              .createdAt(createdAt.withZoneSameInstant(ZoneOffset.UTC).toLocalDateTime())
              .hash(hashFile)
              .etag(fileInfo.etag())
              .lastModified(fileInfo.lastModified())
              .build());

          if (first) {
            break;
          }
        }

      }

      return new Result(expected, counter, rates);
    }).doOnError(throwable -> log.error("Error parsing workbook {}", path, throwable));
  }

  private record Result(int sheets, int ratesFound, List<Rate> rates) {

  }

  private Set<String> pages(String html) {

    final var document = Jsoup.parse(html);
    final var section = document.getElementById("block-system-main");

    if (section == null) {
      log.error("Section not found");
      return Collections.emptySet();
    }

    final var links = section.getElementsByTag("a");

    return links.stream().map(element -> element.attribute("href"))
        .map(Attribute::getValue)
        .collect(Collectors.toCollection(LinkedHashSet::new));
  }
}
