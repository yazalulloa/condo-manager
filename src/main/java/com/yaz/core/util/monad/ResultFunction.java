package com.yaz.core.util.monad;

import java.util.Objects;

@FunctionalInterface
public interface ResultFunction<T, R> {

  R apply(T t) throws Throwable;

  default <V> ResultFunction<V, R> compose(ResultFunction<? super V, ? extends T> before) {
    Objects.requireNonNull(before);
    return (V v) -> apply(before.apply(v));
  }

  default <V> ResultFunction<T, V> andThen(ResultFunction<? super R, ? extends V> after) {
    Objects.requireNonNull(after);
    return (T t) -> after.apply(apply(t));
  }

  static <T> ResultFunction<T, T> identity() {
    return t -> t;
  }
}
