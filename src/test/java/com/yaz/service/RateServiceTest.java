package com.yaz.service;

import com.yaz.persistence.domain.query.SortOrder;
import com.yaz.util.RxUtil;
import io.quarkus.test.junit.QuarkusTest;
import io.reactivex.rxjava3.core.Completable;
import jakarta.inject.Inject;
import java.util.concurrent.atomic.AtomicInteger;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

@QuarkusTest
class RateServiceTest {

  @Inject
  RateService rateService;

  @Test
  void pagingProcessor() {

    final var count = new AtomicInteger(0);
    final var pagingProcessor = rateService.pagingProcessor(30, SortOrder.ASC);

    final var completable = RxUtil.paging(pagingProcessor, list -> {

      list.forEach(System.out::println);
      count.addAndGet(list.size());

      return Completable.complete();
    });

    completable.blockingAwait();

    final var countDb = rateService.count().await().indefinitely();

    Assertions.assertEquals(countDb, count.get());
  }

}