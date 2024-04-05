package com.yaz.core.util;

import java.util.List;

public interface ListServicePagingProcessor<T> extends PagingProcessor<List<T>> {

  @Override
  default void onTerminate() {

  }

}

