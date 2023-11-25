package com.yaz.util.monad;

public interface TryMapFunction<T, R> {
  R apply(T t) throws Throwable;
}
