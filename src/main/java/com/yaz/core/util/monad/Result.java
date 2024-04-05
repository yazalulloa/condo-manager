package com.yaz.core.util.monad;

import io.reactivex.rxjava3.functions.Supplier;
import java.util.function.Function;

public class Result<T, U> {

  private final T value;
  private final Error<U> error;

  Result(T value, Error<U> error) {
    this.value = value;
    this.error = error;
  }

  public static <X, Y> Result<X, Y> of(X value) {
    return new Result<>(value, null);
  }

  public static <X, Y> Result<X, Y> error(Error<Y> error) {
    return new Result<>(null, error);
  }

  public <V> Result<V, U> flatMap(ResultFunction<T, Result<V, U>> f) {
    if (isError()) {
      return Result.error(error);
    }

    return wrapForErrors(() -> f.apply(value));
  }

  public <V> Result<V, U> map(ResultFunction<T, V> f) {
    return flatMap(f.andThen(Result::of));
  }

  public <V> Result<T, V> flatMapError(ResultFunction<Error<U>, Result<T, V>> f) {
    if (isError()) {
      return wrapForErrors(() -> f.apply(error));
    }
    return Result.of(value);
  }

  public <V> Result<T, V> mapError(ResultFunction<Error<U>, Error<V>> f) {
    return flatMapError(f.andThen(Result::error));
  }

  public <V, Z> Result<V, Z> fold(ResultFunction<T, Result<V, Z>> left, ResultFunction<Error<U>, Result<V, Z>> right) {
    return wrapForErrors(() -> {
      if (isError()) {
        return right.apply(error);
      }
      return left.apply(value);
    });
  }

  public <V, Z> Result<V, Z> wrapForErrors(Supplier<Result<V, Z>> function) {
    try {
      return function.get();
    } catch (Throwable e) {
      return Result.error(Error.ofThrowable(e));
    }
  }

  public boolean isError() {
    return this.error != null;
  }

  public T getValue() {
    return this.value;
  }

  public Error<U> getError() {
    return this.error;
  }

  public T orElse(Function<Error<U>, T> f) {
    if (isError()) {
      return f.apply(error);
    }
    return value;
  }

  public T orThrow() {
    if (isError()) {
      throw error.getException();
    }
    return value;
  }

  public <E extends Throwable> T orThrow(Function<Error<U>, E> f) throws E {
    if (isError()) {
      throw f.apply(error);
    }
    return value;
  }
}
