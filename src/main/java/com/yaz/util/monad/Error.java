package com.yaz.util.monad;

public record Error<T>(T code, String message, Throwable throwable) {

  public static <S> Error<S> ofThrowable(Throwable throwable) {
    return new Error<>(null, throwable.getMessage(), throwable);
  }

  public RuntimeException getException() {
    if (throwable != null) {
      return new RuntimeException(throwable);
    }

    if (code == null && message == null) {
      return new RuntimeException("No info about this error");
    }

    return new RuntimeException("Error code: " + code + " message: " + message);
  }
}
