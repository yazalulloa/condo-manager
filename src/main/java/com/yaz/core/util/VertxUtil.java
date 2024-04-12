package com.yaz.core.util;

import io.reactivex.rxjava3.core.Completable;
import io.reactivex.rxjava3.core.CompletableEmitter;
import io.reactivex.rxjava3.core.CompletableOnSubscribe;
import io.reactivex.rxjava3.core.Maybe;
import io.reactivex.rxjava3.core.MaybeEmitter;
import io.reactivex.rxjava3.core.MaybeOnSubscribe;
import io.reactivex.rxjava3.core.Scheduler;
import io.reactivex.rxjava3.core.Single;
import io.reactivex.rxjava3.core.SingleEmitter;
import io.reactivex.rxjava3.core.SingleOnSubscribe;
import io.vertx.core.AsyncResult;
import io.vertx.core.Future;
import io.vertx.core.Handler;
import io.vertx.core.Vertx;
import io.vertx.core.eventbus.ReplyException;
import io.vertx.core.eventbus.ReplyFailure;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.rxjava3.RxHelper;
import java.util.List;
import java.util.Map;
import java.util.function.Consumer;

public class VertxUtil {

    public static Throwable removeReply(Throwable throwable) {
        if (throwable instanceof ReplyException && throwable.getCause() != null) {
            return removeReply(throwable.getCause());
        }

        return throwable;
    }

    public static ReplyException replyException(Throwable throwable) {
        return replyException(throwable, throwable.getMessage());
    }

    public static ReplyException replyException(Throwable throwable, String message) {
        final var ex = new ReplyException(ReplyFailure.RECIPIENT_FAILURE, -1, message);
        ex.initCause(throwable);

        //ex.addSuppressed(throwable);
        return ex;
    }

    public static Scheduler scheduler(Vertx vertx) {
        return RxHelper.scheduler(vertx);
    }

    public static <T> Single<T> single(Consumer<Handler<AsyncResult<T>>> consumer) {
        final var source = singleOnSubscribe(consumer);
        return Single.create(source);
    }


    public static <T> Single<T> single(Future<T> future) {
        return single(future::onComplete);
    }


    public static <T> Maybe<T> maybe(Future<T> future) {
        return maybe(future::onComplete);
    }


    public static <T> Maybe<T> maybe(Consumer<Handler<AsyncResult<T>>> consumer) {
        final var source = maybeOnSubscribe(consumer);
        return Maybe.create(source);
    }

    public static Completable completable(Consumer<Handler<AsyncResult<Void>>> consumer) {
        final var source = completableOnSubscribe(consumer);
        return Completable.create(source);
    }

    public static Completable completable(Future<Void> future) {
        return completable(future::onComplete);
    }

    public static CompletableOnSubscribe completableOnSubscribe(Consumer<Handler<AsyncResult<Void>>> consumer) {
        return emitter -> {
            final var actionListener = actionListener(emitter);
            consumer.accept(actionListener);
        };
    }

    public static <T> SingleOnSubscribe<T> singleOnSubscribe(Consumer<Handler<AsyncResult<T>>> consumer) {
        return emitter -> {
            final Handler<AsyncResult<T>> actionListener = actionListener(emitter);
            consumer.accept(actionListener);
        };
    }

    public static <T> MaybeOnSubscribe<T> maybeOnSubscribe(Consumer<Handler<AsyncResult<T>>> consumer) {
        return emitter -> {
            final Handler<AsyncResult<T>> actionListener = actionListener(emitter);
            consumer.accept(actionListener);
        };
    }

    public static Handler<AsyncResult<Void>> actionListener(CompletableEmitter emitter) {
        return result -> {
            if (result.succeeded()) {
                emitter.onComplete();
            } else {
                emitter.onError(result.cause());
            }
        };
    }

    public static <T> Handler<AsyncResult<T>> actionListener(MaybeEmitter<T> emitter) {
        return result -> {
            if (result.succeeded()) {
                if (result.result() == null) {
                    emitter.onComplete();
                } else {
                    emitter.onSuccess(result.result());
                }
            } else {
                emitter.onError(result.cause());
            }
        };
    }

    public static <T> Handler<AsyncResult<T>> actionListener(SingleEmitter<T> emitter) {
        return result -> {
            if (result.succeeded()) {
                final var value = result.result();
                if (value == null) {
                    throw new IllegalStateException("value is null");
                }

                emitter.onSuccess(value);
            } else {
                emitter.onError(result.cause());
            }
        };
    }

    public static Map<String, Object> toMap(JsonObject jsonObject) {
        final var map = jsonObject.getMap();

        map.forEach((key, value) -> {
            if (value instanceof JsonObject) {
                map.put(key, toMap((JsonObject) value));
            }

            if (value instanceof JsonArray) {
                map.put(key, toMap((JsonArray) value));
            }
        });

        return map;
    }

    public static List<Object> toMap(JsonArray jsonArray) {
        return jsonArray.stream()
            .map(obj -> {

                if (obj instanceof JsonObject) {
                   return toMap((JsonObject) obj);
                }

                if (obj instanceof JsonArray) {
                    return toMap((JsonArray) obj);
                }

                return obj;
            })
            .toList();
    }
}
