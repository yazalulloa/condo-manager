package com.yaz.core.service.csv;

import io.reactivex.rxjava3.core.Observable;
import io.reactivex.rxjava3.core.Single;
import io.vertx.rxjava3.core.Vertx;
import java.nio.file.Paths;
import java.time.Month;
import java.util.Arrays;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;


@Slf4j
public abstract class ReceiptParserAbstractImpl implements ReceiptParser {


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

          return parse(path)
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
          .map(MONTHS_MAP::get)
          .filter(Objects::nonNull)
          .map(Month::getValue)
          .collect(Collectors.toCollection(LinkedHashSet::new));

    }

    return Optional.ofNullable(MONTHS_MAP.get(str))
        .stream()
        .map(Month::getValue)
        .collect(Collectors.toCollection(LinkedHashSet::new));
  }
}
