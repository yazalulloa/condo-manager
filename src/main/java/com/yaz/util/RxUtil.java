package com.yaz.util;

import io.reactivex.rxjava3.annotations.NonNull;
import io.reactivex.rxjava3.core.Completable;
import io.reactivex.rxjava3.core.CompletableObserver;
import io.reactivex.rxjava3.core.Flowable;
import io.reactivex.rxjava3.core.Maybe;
import io.reactivex.rxjava3.core.Observer;
import io.reactivex.rxjava3.core.Single;
import io.reactivex.rxjava3.core.SingleObserver;
import io.reactivex.rxjava3.disposables.Disposable;
import io.reactivex.rxjava3.functions.Action;
import io.reactivex.rxjava3.functions.Consumer;
import io.reactivex.rxjava3.functions.Function;
import io.reactivex.rxjava3.processors.BehaviorProcessor;
import io.smallrye.mutiny.Uni;
import io.smallrye.mutiny.converters.uni.UniRx3Converters;
import io.vertx.core.json.Json;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import java.util.List;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class RxUtil {

  public static <T> Observer<T> observer(
      @NonNull Consumer<Disposable> disposableConsumer,
      @NonNull Consumer<? super T> onNext,
      @NonNull Consumer<? super Throwable> onError,
      @NonNull Action onComplete) {
    return new Observer<T>() {
      @Override
      public void onSubscribe(@NonNull Disposable d) {
        try {
          disposableConsumer.accept(d);
        } catch (Throwable e) {
          throw new RuntimeException(e);
        }
      }

      @Override
      public void onNext(@NonNull T t) {
        try {
          onNext.accept(t);
        } catch (Throwable e) {
          throw new RuntimeException(e);
        }
      }

      @Override
      public void onError(@NonNull Throwable e) {
        try {
          onError.accept(e);
        } catch (Throwable ex) {
          throw new RuntimeException(ex);
        }
      }

      @Override
      public void onComplete() {
        try {
          onComplete.run();
        } catch (Throwable e) {
          throw new RuntimeException(e);
        }
      }
    };
  }

  public static CompletableObserver completableObserver(
      @NonNull Action onComplete, @NonNull Consumer<? super Throwable> onError) {
    return completableObserver(d -> {
    }, onComplete, onError);
  }


  public static CompletableObserver completableObserver(@NonNull Consumer<Disposable> disposableConsumer,
      @NonNull Action onComplete, @NonNull Consumer<? super Throwable> onError) {
    return new CompletableObserver() {
      @Override
      public void onSubscribe(@NonNull Disposable d) {
        try {
          disposableConsumer.accept(d);
        } catch (Throwable e) {
          throw new RuntimeException(e);
        }
      }

      @Override
      public void onComplete() {
        try {
          onComplete.run();
        } catch (Throwable e) {
          throw new RuntimeException(e);
        }
      }

      @Override
      public void onError(@NonNull Throwable throwable) {
        try {
          onError.accept(throwable);
        } catch (Throwable e) {
          throw new RuntimeException(e);

        }
      }
    };
  }

  public static <T> SingleObserver<T> singleObserver(
      @NonNull Consumer<? super T> onSuccess,
      @NonNull Consumer<? super Throwable> onError) {
    return singleObserver(d -> {
    }, onSuccess, onError);
  }

  public static <T> SingleObserver<T> singleObserver(@NonNull Consumer<Disposable> disposableConsumer,
      @NonNull Consumer<? super T> onSuccess,
      @NonNull Consumer<? super Throwable> onError) {

    return new SingleObserver<>() {
      @Override
      public void onSubscribe(@NonNull Disposable d) {
        //log.info("SUBSCRIBE ON {}", Thread.currentThread());
        try {
          disposableConsumer.accept(d);
        } catch (Throwable e) {
          throw new RuntimeException(e);
        }
      }

      @Override
      public void onSuccess(@NonNull T t) {
        //log.info("SUCCESS ON {}", Thread.currentThread());
        try {
          onSuccess.accept(t);
        } catch (Throwable e) {
          throw new RuntimeException(e);
        }
      }

      @Override
      public void onError(@NonNull Throwable throwable) {
        // log.info("ERROR ON {}", Thread.currentThread());
        try {
          onError.accept(throwable);
        } catch (Throwable e) {
          throw new RuntimeException(e);
        }
      }
    };
  }

  public static <T> Completable paging(PagingProcessor<List<T>> pagingProcessor,
      Function<List<T>, Completable> function) {

    final var processor = BehaviorProcessor.createDefault(pagingProcessor);

    return processor.flatMap(tPagingProcessor -> {

          return tPagingProcessor.next()
              .filter(l -> !l.isEmpty())
              .flatMapCompletable(function)
              .andThen(Flowable.just(tPagingProcessor));
        })
        .doOnNext(tPagingProcessor -> {
          if (tPagingProcessor.isComplete()) {
            processor.onComplete();
          } else {
            processor.onNext(tPagingProcessor);
          }
        })
        .ignoreElements()
        .doOnTerminate(pagingProcessor::onTerminate);

  }

  public static <T> List<T> fromJsonResults(JsonObject jsonObject, Class<T> tClass) {
    final var array = jsonObject.getJsonArray("results");
    return fromJsonArray(array, tClass);
  }

  public static <T> List<T> fromJsonArray(JsonArray jsonArray, Class<T> tClass) {
    return jsonArray.stream()
        .map(Json::encodeToBuffer)
        .map(json -> Json.decodeValue(json, tClass))
        .toList();
  }

  public static <T> Maybe<T> toMaybe(Uni<T> uni) {
    return UniRx3Converters.<T>toMaybe().apply(uni);
  }

  public static <T> Single<Optional<T>> toSingle(Uni<T> uni) {
    return UniRx3Converters.<T>toSingle().apply(uni);
  }

  public static <T> Single<T> single(Uni<T> uni) {
    return toMaybe(uni).toSingle();
  }

  public static <T> Completable completable(Uni<T> voidUni) {
    return toMaybe(voidUni).ignoreElement();
  }
}
