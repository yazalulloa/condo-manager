package com.yaz.service;

import io.quarkus.cache.CacheInvalidate;
import io.quarkus.cache.CacheInvalidateAll;
import io.quarkus.cache.CacheResult;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.ArrayList;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import com.yaz.persistence.ApartmentRepository;
import com.yaz.persistence.domain.ApartmentQuery;
import com.yaz.persistence.entities.Apartment;
import com.yaz.resource.ApartmentsResource;
import com.yaz.resource.domain.ApartmentTableResponse;
import com.yaz.resource.domain.AptItem;
import com.yaz.resource.domain.request.ApartmentRequest;
import com.yaz.resource.domain.response.AptCountersDto;
import com.yaz.service.cache.ApartmentCache;
import com.yaz.util.Constants;
import com.yaz.util.DateUtil;
import com.yaz.util.SqlUtil;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class ApartmentService {


  private final ApartmentRepository repository;

  @CacheInvalidateAll(cacheName = ApartmentCache.TOTAL_COUNT)
  @CacheInvalidateAll(cacheName = ApartmentCache.QUERY_COUNT)
  @CacheInvalidateAll(cacheName = ApartmentCache.SELECT)
  @CacheInvalidate(cacheName = ApartmentCache.EXISTS)
  @CacheInvalidate(cacheName = ApartmentCache.GET)
  public Uni<Integer> delete(String buildingId, String number) {
    return repository.delete(buildingId, number);
  }

  @CacheResult(cacheName = ApartmentCache.TOTAL_COUNT, lockTimeout = Constants.CACHE_TIMEOUT)
  public Uni<Long> totalCount() {
    return repository.count();
  }

  @CacheResult(cacheName = ApartmentCache.QUERY_COUNT, lockTimeout = Constants.CACHE_TIMEOUT)
  public Uni<Optional<Long>> queryCount(ApartmentQuery query) {
    return repository.queryCount(query);
  }

  public Uni<ApartmentTableResponse> tableResponse() {
    return tableResponse(ApartmentQuery.builder().build());
  }

  @CacheResult(cacheName = ApartmentCache.SELECT, lockTimeout = Constants.CACHE_TIMEOUT)
  public Uni<ApartmentTableResponse> tableResponse(ApartmentQuery query) {

    final var actualLimit = query.limit() + 1;

    final var apartmentQuery = query.toBuilder()
        .limit(actualLimit)
        .build();

    return Uni.combine()
        .all()
        .unis(counters(apartmentQuery), repository.select(apartmentQuery))
        .with((counters, apartments) -> {

          final var results = apartments.stream()
              .map(AptItem::new)
              .collect(Collectors.toCollection(() -> new ArrayList<>(apartments.size())));

          String nextPageUrl = null;
          if (results.size() == actualLimit) {
            results.remove(results.size() - 1);
            results.trimToSize();

            final var last = results.getLast().getApt();

            nextPageUrl = ApartmentsResource.TABLE_PATH;
            nextPageUrl += "?lastBuildingId=" + last.buildingId() + "&lastNumber=" + last.number();

            if (apartmentQuery.q() != null) {
              nextPageUrl += "&q=" + apartmentQuery.q();
            }

            if (apartmentQuery.building() != null) {
              nextPageUrl += "&building=" + apartmentQuery.building();
            }
          }

          return ApartmentTableResponse.builder()
              .countersDto(counters)
              .results(results)
              .nextPageUrl(nextPageUrl)
              .build();
        });
  }

  @CacheResult(cacheName = ApartmentCache.EXISTS, lockTimeout = Constants.CACHE_TIMEOUT)
  public Uni<Boolean> exists(String buildingId, String number) {
    return repository.exists(buildingId, number);
  }

  @CacheInvalidate(cacheName = ApartmentCache.EXISTS)
  public Uni<Void> invalidateExists(String buildingId, String number) {
    return invalidateGet(buildingId, number);
  }

  @CacheInvalidate(cacheName = ApartmentCache.GET)
  public Uni<Void> invalidateGet(String buildingId, String number) {
    return Uni.createFrom().voidItem();
  }

  @CacheInvalidateAll(cacheName = ApartmentCache.SELECT)
  @CacheInvalidateAll(cacheName = ApartmentCache.TOTAL_COUNT)
  @CacheInvalidateAll(cacheName = ApartmentCache.QUERY_COUNT)
  public Uni<Apartment> create(ApartmentRequest request) {
    final var apartment = Apartment.builder()
        .buildingId(request.getBuildingId())
        .number(request.getNumber())
        .name(request.getName())
        .aliquot(request.getAliquot())
        .emails(request.getEmails())
        .createdAt(DateUtil.utcLocalDateTime())
        .build();

    return repository.insert(apartment)
        .flatMap(list -> {
          list.forEach(SqlUtil::print);
          return invalidateExists(apartment.buildingId(), apartment.number());
        })
        .replaceWith(apartment);
  }

  public Uni<AptCountersDto> counters(ApartmentQuery apartmentQuery) {
    return Uni.combine()
        .all()
        .unis(totalCount(), queryCount(apartmentQuery))
        .with((totalCount, queryCount) -> new AptCountersDto(totalCount, queryCount.orElse(null)));

  }

  @CacheResult(cacheName = ApartmentCache.GET, lockTimeout = Constants.CACHE_TIMEOUT)
  public Uni<Apartment> get(String buildingId, String number) {
    return repository.read(buildingId, number);
  }

  @CacheInvalidateAll(cacheName = ApartmentCache.SELECT)
  public Uni<Apartment> update(ApartmentRequest request) {
    final var apartment = Apartment.builder()
        .buildingId(request.getBuildingId())
        .number(request.getNumber())
        .name(request.getName())
        .aliquot(request.getAliquot())
        .emails(request.getEmails())
        .updatedAt(DateUtil.utcLocalDateTime())
        .build();

    return repository.update(apartment)
        .invoke(rowCount -> log.info("update rowCount {}", rowCount))
        .flatMap(i -> invalidateGet(apartment.buildingId(), apartment.number()))
        .map(rows -> apartment);
  }
}
