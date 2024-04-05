package com.yaz.core.service;

import com.yaz.core.util.ListServicePagingProcessor;
import io.reactivex.rxjava3.core.Single;
import java.util.List;

public class ListServicePagingProcessorImpl<T, R> implements ListServicePagingProcessor<T> {


  private final ListService<T, R> service;
  private R query;
  private volatile boolean isComplete;

  public ListServicePagingProcessorImpl(ListService<T, R> service, R query) {
    this.service = service;
    this.query = query;
  }


  @Override
  public Single<List<T>> next() {
    return service.listByQuery(query)
        .doOnSuccess(list -> {
          query = service.nextQuery(list, query);
          isComplete = list.isEmpty();
        });
  }

  @Override
  public boolean isComplete() {
    return isComplete;
  }
}
