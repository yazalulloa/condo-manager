package com.yaz.core.service.entity;

import com.yaz.api.domain.response.ReceiptCountersDto;
import com.yaz.api.domain.response.ReceiptTableItem;
import com.yaz.api.domain.response.ReceiptTableResponse;
import com.yaz.api.resource.ReceiptResource;
import com.yaz.core.service.EncryptionService;
import com.yaz.core.service.entity.cache.ReceiptCache;
import com.yaz.core.util.Constants;
import com.yaz.core.util.MutinyUtil;
import com.yaz.persistence.domain.query.ReceiptQuery;
import com.yaz.persistence.domain.request.ReceiptCreateRequest;
import com.yaz.persistence.entities.Receipt;
import com.yaz.persistence.repository.turso.ReceiptRepository;
import io.quarkus.cache.CacheInvalidate;
import io.quarkus.cache.CacheInvalidateAll;
import io.quarkus.cache.CacheResult;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Event;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor
public class ReceiptService {

  private final ReceiptRepository repository;
  private final EncryptionService encryptionService;
  private final Event<Receipt.Keys> receiptDeletedEvent;

  @CacheInvalidateAll(cacheName = ReceiptCache.TOTAL_COUNT)
  @CacheInvalidateAll(cacheName = ReceiptCache.QUERY_COUNT)
  public Uni<Void> invalidateOne(long id) {
    return invalidateGet(id);
  }

  @CacheInvalidateAll(cacheName = ReceiptCache.SELECT)
  @CacheInvalidate(cacheName = ReceiptCache.GET)
  public Uni<Void> invalidateGet(long id) {
    return Uni.createFrom().voidItem();
  }

  @CacheInvalidateAll(cacheName = ReceiptCache.TOTAL_COUNT)
  @CacheInvalidateAll(cacheName = ReceiptCache.QUERY_COUNT)
  @CacheInvalidateAll(cacheName = ReceiptCache.SELECT)
  @CacheInvalidateAll(cacheName = ReceiptCache.GET)
  public Uni<Void> invalidateAll() {
    return Uni.createFrom().voidItem();
  }

  public Uni<Integer> delete(Receipt.Keys keys) {
    return repository.delete(keys.buildingId(), keys.id())
        .invoke(i -> log.info("Receipt deleted: {} {}", keys, i))
        .flatMap(MutinyUtil.cacheCall(invalidateOne(keys.id())))
        .onItem()
        .invoke(() -> receiptDeletedEvent.fireAsync(keys));
  }

  public Uni<ReceiptRepository.InsertResult> insert(ReceiptCreateRequest createRequest) {
    return repository.insert(createRequest)
        .flatMap(result -> invalidateOne(result.id())
            .replaceWith(result));
  }

  public Uni<Integer> updateLastSent(long id, LocalDateTime localDateTime) {
    return repository.updateLastSent(id, localDateTime)
        .flatMap(MutinyUtil.cacheCall(invalidateOne(id)));
  }

  public Uni<Integer> update(Receipt receipt) {
    return repository.update(receipt)
        .flatMap(MutinyUtil.cacheCall(invalidateOne(receipt.id())));
  }

  @CacheResult(cacheName = ReceiptCache.GET, lockTimeout = Constants.CACHE_TIMEOUT)
  public Uni<Optional<Receipt>> read(long id) {
    return repository.read(id);
  }

  public Uni<Receipt> get(long id) {
    return read(id)
        .map(optional -> optional.orElseThrow(() -> new IllegalArgumentException("Receipt not found: " + id)));
  }

  @CacheResult(cacheName = ReceiptCache.SELECT, lockTimeout = Constants.CACHE_TIMEOUT)
  public Uni<List<Receipt>> select(ReceiptQuery receiptQuery) {
    return repository.select(receiptQuery);
  }

  @CacheResult(cacheName = ReceiptCache.TOTAL_COUNT, lockTimeout = Constants.CACHE_TIMEOUT)
  public Uni<Long> totalCount() {
    return repository.count();
  }

  @CacheResult(cacheName = ReceiptCache.QUERY_COUNT, lockTimeout = Constants.CACHE_TIMEOUT)
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
                final var keys = receipt.keys();
                return ReceiptTableItem.builder()
                    .key(encryptionService.encryptObj(keys))
                    .item(receipt)
                    .cardId(keys.cardId())
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
