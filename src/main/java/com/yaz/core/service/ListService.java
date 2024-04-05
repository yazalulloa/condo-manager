package com.yaz.core.service;

import io.reactivex.rxjava3.core.Single;
import java.util.List;

public interface ListService<T, R> {

  Single<List<T>> listByQuery(R query);

  R nextQuery(List<T> list, R query);
}
