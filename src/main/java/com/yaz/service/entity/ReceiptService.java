package com.yaz.service.entity;

import com.yaz.persistence.domain.query.ReceiptQuery;
import com.yaz.persistence.entities.Receipt;
import com.yaz.persistence.repository.turso.ReceiptRepository;
import com.yaz.resource.ReceiptResource;
import com.yaz.resource.domain.response.ReceiptTableResponse;
import com.yaz.service.EncryptionService;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class ReceiptService {

  private final ReceiptRepository repository;
  private final EncryptionService encryptionService;

  public Uni<Long> count() {
    return repository.count();
  }

  public Uni<Integer> delete(String buildingId, long id) {
    return repository.delete(buildingId, id);
  }

  public Uni<Integer> insert(Receipt receipt) {
    return repository.insert(receipt);
  }

  public Uni<Integer> updateLastSent(String buildingId, String id) {
    return repository.updateLastSent(buildingId, id);
  }

  public Uni<Optional<Receipt>> read(long id) {
    return repository.read(id);
  }

  public Uni<List<Receipt>> select(ReceiptQuery receiptQuery) {
    return repository.select(receiptQuery);
  }

  public Uni<ReceiptTableResponse> table(ReceiptQuery query) {

    final var actualLimit = query.limit() + 1;

    final var receiptQuery = query.toBuilder()
        .limit(actualLimit)
        .build();

    return Uni.combine()
        .all()
        .unis(count(), select(receiptQuery))
        .with((totalCount, receipts) -> {

          final var results = receipts.stream()
              .map(receipt -> {
                final var keys = encryptionService.encryptObj(receipt.keys());
                return ReceiptTableResponse.Item.builder()
                    .key(keys)
                    .item(receipt)
                    .build();
              })
              .collect(Collectors.toCollection(() -> new ArrayList<>(receipts.size())));

          String nextPageUrl = null;
          if (results.size() == actualLimit) {
            results.removeLast();
            results.trimToSize();

            nextPageUrl =
                ReceiptResource.PATH + "?nextPage=" + encryptionService.encryptObj(results.getLast().item().keys());

            for (String building : receiptQuery.buildings()) {
              nextPageUrl += "&building=" + building;
            }
          }

          return ReceiptTableResponse.builder()
              .totalCount(totalCount)
              .nextPageUrl(nextPageUrl)
              .results(results)
              .build();
        });
  }
}
