package com.yaz.core.util;

import io.reactivex.rxjava3.core.Single;

public interface PagingProcessor<T> {

  Single<T> next();

  boolean isComplete();

  void onTerminate();
}
