package com.yaz.core.service.entity;

import com.yaz.persistence.domain.query.ReceiptQuery;
import com.yaz.persistence.entities.Receipt;
import com.yaz.persistence.repository.turso.ReceiptRepository;
import com.yaz.api.resource.ReceiptResource;
import com.yaz.api.domain.response.ReceiptCountersDto;
import com.yaz.api.domain.response.ReceiptTableResponse;
import com.yaz.core.service.EncryptionService;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.ArrayList;
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

  public Uni<Long> totalCount() {
    return repository.count();
  }

  public Uni<Integer> delete(String buildingId, long id) {
    return repository.delete(buildingId, id);
  }

  public Uni<ReceiptRepository.InsertResult> insert(Receipt receipt) {
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

  public Uni<Optional<Long>> queryCount(ReceiptQuery receiptQuery) {
    return repository.count(receiptQuery);
  }

  public Uni<ReceiptCountersDto> counters(ReceiptQuery query) {
    return Uni.combine()
        .all()
        .unis(totalCount(), queryCount(query))
        .with((totalCount, queryCount) -> new ReceiptCountersDto(totalCount, queryCount.orElse(null)));

  }

  public Uni<ReceiptTableResponse> table(ReceiptQuery query) {

    final var actualLimit = query.limit() + 1;

    final var receiptQuery = query.toBuilder()
        .limit(actualLimit)
        .build();

    return Uni.combine()
        .all()
        .unis(counters(query), select(receiptQuery))
        .with((counters, receipts) -> {

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

            for (int month : receiptQuery.month()) {
              nextPageUrl += "&month=" + month;
            }

            if (receiptQuery.date() != null) {
              nextPageUrl += "&date=" + receiptQuery.date();
            }
          }

          return ReceiptTableResponse.builder()
              .countersDto(counters)
              .nextPageUrl(nextPageUrl)
              .results(results)
              .build();
        });
  }
}
