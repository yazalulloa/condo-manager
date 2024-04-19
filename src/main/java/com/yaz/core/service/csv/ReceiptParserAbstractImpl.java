package com.yaz.core.service.csv;

import io.reactivex.rxjava3.core.Observable;
import io.reactivex.rxjava3.core.Single;
import io.vertx.rxjava3.core.Vertx;
import java.nio.file.Paths;
import java.time.Month;
import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;


@Slf4j
public abstract class ReceiptParserAbstractImpl implements ReceiptParser {

  protected static final Map<String, Month> monthsMap = new HashMap<>();

  static {
    monthsMap.put("ENE", Month.JANUARY);
    monthsMap.put("FEB", Month.FEBRUARY);
    monthsMap.put("MAR", Month.MARCH);
    monthsMap.put("ABR", Month.APRIL);
    monthsMap.put("MAY", Month.MAY);
    monthsMap.put("JUN", Month.JUNE);
    monthsMap.put("JUL", Month.JULY);
    monthsMap.put("AUG", Month.AUGUST);
    monthsMap.put("AGO", Month.AUGUST);
    monthsMap.put("AGOS", Month.AUGUST);
    monthsMap.put("SEP", Month.SEPTEMBER);
    monthsMap.put("OCT", Month.OCTOBER);
    monthsMap.put("NOV", Month.NOVEMBER);
    monthsMap.put("DEC", Month.DECEMBER);
  }

  protected abstract Vertx vertx();

  @Override
  public Single<List<CsvReceipt>> parseDir(String dir) {
    return vertx().fileSystem().readDir(dir)
        .flatMapObservable(Observable::fromIterable)
        .filter(str -> str.endsWith(".xlsx") || str.endsWith(".xls"))
        .map(str -> {
          final var path = Paths.get(str);
          final var fileName = path.getFileName().toString();
          log.info("Parsing file: {}", fileName);

          return parse(fileName, path)
              .map(Optional::of)
              .doOnError(e -> log.error("Error parsing file: {}", fileName, e))
              .onErrorReturnItem(Optional.empty());
        })

        .toList()
        .toFlowable()
        .flatMap(Single::merge)
        .filter(Optional::isPresent)
        .map(Optional::get)
        .toList();
  }

  protected Set<Integer> months(String str) {
    final var split = str.split("/");
    if (split.length > 1) {
      return Arrays.stream(split)
          .map(monthsMap::get)
          .filter(Objects::nonNull)
          .map(Month::getValue)
          .collect(Collectors.toCollection(LinkedHashSet::new));

    }

    return Optional.ofNullable(monthsMap.get(str))
        .stream()
        .map(Month::getValue)
        .collect(Collectors.toCollection(LinkedHashSet::new));
  }
}
