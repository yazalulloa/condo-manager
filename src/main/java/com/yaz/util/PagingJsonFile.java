package com.yaz.util;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonToken;
import io.reactivex.rxjava3.core.Completable;
import io.reactivex.rxjava3.core.Flowable;
import io.reactivex.rxjava3.functions.Function;
import io.reactivex.rxjava3.functions.Supplier;
import io.reactivex.rxjava3.processors.BehaviorProcessor;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Collection;
import java.util.LinkedList;
import java.util.List;
import java.util.zip.GZIPInputStream;


public class PagingJsonFile {


  public <T> List<T> listFromParser(JsonParser jsonParser, int pageSize, Function<JsonParser, T> function)
      throws Throwable {

    final var list = new LinkedList<T>();

    while (true) {
      final var token = jsonParser.nextToken();

      if (token == null) {
        break;
      }

      if (JsonToken.START_OBJECT.equals(token)) {
        list.add(function.apply(jsonParser));
      }

      if (list.size() == pageSize) {
        break;
      }

    }

    return list;
  }

  public <T> Completable pagingJsonFile(Function<JsonParser, T> function, JsonParser jsonParser,
      int pageSize,
      Function<Collection<T>, Completable> collectionCompletableFunction) {
    return Completable.defer(() -> {
      Supplier<List<T>> supplier = () -> listFromParser(jsonParser, pageSize, function);

      final var processor = BehaviorProcessor.createDefault(supplier.get());

      return processor.flatMap(list -> collectionCompletableFunction.apply(list).andThen(Flowable.just(list)))
          .doOnNext(list -> {
            if (list.size() == pageSize) {
              processor.onNext(supplier.get());
            } else {
              processor.onComplete();
            }
          })
          .ignoreElements()
          .doOnTerminate(jsonParser::close)
          ;
    });
  }

  public <T> Completable pagingJsonFile(int pageSize, InputStream inputStream,
      Class<T> clazz,
      Function<Collection<T>, Completable> collectionCompletableFunction) {
    return Completable.defer(() -> {

      final var mapper = JacksonUtil.getObjectMapper();
      final var jsonParser = mapper.getFactory().createParser(inputStream);
      final var reader = mapper.readerFor(clazz);
      return pagingJsonFile(reader::readValue, jsonParser, pageSize, collectionCompletableFunction);
    });
  }

  public <T> Completable pagingJsonFile(int pageSize, String fileName,
      Class<T> clazz,
      Function<Collection<T>, Completable> collectionCompletableFunction) {
    return Completable.defer(() -> {
      final var mapper = JacksonUtil.getObjectMapper();
      final var stream = new GZIPInputStream(new FileInputStream(fileName));
      final var jsonParser = mapper.getFactory().createParser(stream);
      final var reader = mapper.readerFor(clazz);
      return pagingJsonFile(reader::readValue, jsonParser, pageSize, collectionCompletableFunction);
    });
  }
}
