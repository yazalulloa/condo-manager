package com.yaz.core.service.entity;

import com.yaz.core.service.entity.cache.ExtraChargesCache;
import com.yaz.core.service.entity.cache.ExtraChargesCache;
import com.yaz.core.service.entity.cache.ReserveFundCache;
import com.yaz.core.util.Constants;
import com.yaz.core.util.MutinyUtil;
import com.yaz.persistence.domain.request.ExtraChargeCreateRequest;
import com.yaz.persistence.entities.ExtraCharge;
import com.yaz.persistence.entities.ExtraCharge.Keys;
import com.yaz.persistence.repository.turso.ExtraChargeRepository;
import io.quarkus.cache.CacheInvalidate;
import io.quarkus.cache.CacheInvalidateAll;
import io.quarkus.cache.CacheResult;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class ExtraChargeService {

  private final ExtraChargeRepository repository;

  @CacheInvalidateAll(cacheName = ExtraChargesCache.TOTAL_COUNT)
  @CacheInvalidateAll(cacheName = ExtraChargesCache.QUERY_COUNT)
  @CacheInvalidate(cacheName = ExtraChargesCache.EXISTS)
  public Uni<Void> invalidateOne(long id) {
    return invalidateGet(id);
  }

  @CacheInvalidateAll(cacheName = ExtraChargesCache.SELECT)
  @CacheInvalidate(cacheName = ExtraChargesCache.GET)
  public Uni<Void> invalidateGet(long id) {
    return Uni.createFrom().voidItem();
  }

  @CacheInvalidateAll(cacheName = ExtraChargesCache.TOTAL_COUNT)
  @CacheInvalidateAll(cacheName = ExtraChargesCache.QUERY_COUNT)
  @CacheInvalidateAll(cacheName = ExtraChargesCache.EXISTS)
  @CacheInvalidateAll(cacheName = ExtraChargesCache.SELECT)
  @CacheInvalidateAll(cacheName = ExtraChargesCache.GET)
  public Uni<Void> invalidateAll() {
    return Uni.createFrom().voidItem();
  }

  @CacheResult(cacheName = ExtraChargesCache.TOTAL_COUNT, lockTimeout = Constants.CACHE_TIMEOUT)
  public Uni<Long> count() {
    return repository.count();
  }


  @CacheResult(cacheName = ExtraChargesCache.QUERY_COUNT, lockTimeout = Constants.CACHE_TIMEOUT)
  public Uni<Long> count(Keys keys) {
    return repository.count(keys.buildingId(), keys.parentReference());
  }

  public Uni<Optional<ExtraCharge>> read(ExtraCharge.Keys keys) {
    return read(keys.buildingId(), keys.parentReference(), keys.id());
  }

  @CacheResult(cacheName = ExtraChargesCache.GET, lockTimeout = Constants.CACHE_TIMEOUT)
  public Uni<Optional<ExtraCharge>> read(String buildingId, String parentReference, long id) {
    return repository.read(buildingId, parentReference, id);
  }

  @CacheResult(cacheName = ExtraChargesCache.SELECT, lockTimeout = Constants.CACHE_TIMEOUT)
  public Uni<List<ExtraCharge>> by(String buildingId, String parentReference) {
    return repository.select(buildingId, parentReference);
  }


  public Uni<Integer> delete(Keys keys) {
    return repository.delete(keys.parentReference(), keys.buildingId(), keys.id())
        .flatMap(MutinyUtil.cacheCall(invalidateOne(keys.id())));
  }

  public Uni<ExtraCharge> create(ExtraChargeCreateRequest createRequest) {

    final var extraCharge = ExtraCharge.builder()
        .parentReference(createRequest.parentReference())
        .buildingId(createRequest.buildingId())
        .type(createRequest.type())
        .description(createRequest.description())
        .amount(createRequest.amount())
        .currency(createRequest.currency())
        .active(createRequest.active())
        .build();

    return repository.insert(extraCharge, createRequest.apartments())
        .map(res -> extraCharge.toBuilder()
            .id(res.id())
            .build())
        .flatMap(e -> invalidateOne(e.id())
            .replaceWith(e));
  }

  public Uni<Integer> update(ExtraCharge extraCharge) {
    return repository.update(extraCharge)
        .flatMap(MutinyUtil.cacheCall(invalidateOne(extraCharge.id())));
  }

  public Uni<Integer> deleteByBuilding(String id) {
    return repository.deleteByBuilding(id)
        .flatMap(MutinyUtil.cacheCall(invalidateAll()));
  }

  
  public Uni<Integer> deleteByReceipt(String buildingId, String parentReference) {
    return repository.deleteByReceipt(buildingId, parentReference)
        .flatMap(MutinyUtil.cacheCall(invalidateAll()));
  }
  public Uni<Integer> deleteByApartment(String buildingId, String aptNumber) {
    return repository.deleteByApartment(buildingId, aptNumber)
        .flatMap(MutinyUtil.cacheCall(invalidateAll()));
  }
}
