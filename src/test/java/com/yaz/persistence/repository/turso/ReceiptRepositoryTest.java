package com.yaz.persistence.repository.turso;

import com.yaz.persistence.domain.query.ReceiptQuery;
import io.quarkus.test.junit.QuarkusTest;
import io.smallrye.mutiny.Multi;
import jakarta.inject.Inject;
import org.junit.jupiter.api.Test;

@QuarkusTest
class ReceiptRepositoryTest {

  @Inject
  ReceiptRepository repository;


  @Test
  void removeLastSent() {

    final var list = repository.select(ReceiptQuery.builder().limit(5).build())
        .toMulti()
        .flatMap(Multi.createFrom()::iterable)
        .onItem()
        .transformToUni(receipt -> repository.removeLastSent(receipt.id()))
        .merge()
        .collect()
        .asList()
        .await().indefinitely();

    System.out.println("list = " + list);

  }

}