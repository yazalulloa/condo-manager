package com.yaz.core.service.entity;

import com.yaz.api.domain.AptItem;
import com.yaz.api.domain.request.ApartmentRequest;
import com.yaz.api.domain.response.ApartmentTableResponse;
import com.yaz.api.domain.response.AptCountersDto;
import com.yaz.api.resource.ApartmentsResource;
import com.yaz.core.service.EncryptionService;
import com.yaz.core.service.entity.cache.ApartmentCache;
import com.yaz.core.util.Constants;
import com.yaz.core.util.MutinyUtil;
import com.yaz.persistence.domain.query.ApartmentQuery;
import com.yaz.persistence.entities.Apartment;
import com.yaz.persistence.entities.ExtraCharge;
import com.yaz.persistence.repository.ApartmentRepository;
import io.quarkus.cache.CacheInvalidate;
import io.quarkus.cache.CacheInvalidateAll;
import io.quarkus.cache.CacheResult;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Event;
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
public class ApartmentService {


  //private final Instance<ApartmentRepository> repository;
  private final ApartmentRepository repository;
  private final EncryptionService encryptionService;
  private final Event<Apartment.Keys> aptDeletedEvent;


  private ApartmentRepository repository() {
    //return repository.get();
    return repository;
  }

  public Uni<Integer> delete(Apartment.Keys keys) {
    final var buildingId = keys.buildingId();
    final var number = keys.number();
    return repository().delete(buildingId, number)
        .flatMap(MutinyUtil.cacheCall(invalidateOne(buildingId, number)))
        .onItem()
        .invoke(() -> aptDeletedEvent.fireAsync(keys));
  }

  @CacheResult(cacheName = ApartmentCache.TOTAL_COUNT, lockTimeout = Constants.CACHE_TIMEOUT)
  public Uni<Long> totalCount() {
    return repository().count();
  }

  @CacheResult(cacheName = ApartmentCache.QUERY_COUNT, lockTimeout = Constants.CACHE_TIMEOUT)
  public Uni<Optional<Long>> queryCount(ApartmentQuery query) {
    return repository().queryCount(query);
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
        .unis(counters(apartmentQuery), repository().select(apartmentQuery))
        .with((counters, apartments) -> {

          final var results = apartments.stream()
              .map(apartment -> {
                final var keys = apartment.keys();
                return AptItem.builder()
                    .key(encryptionService.encryptObj(keys))
                    .cardId(keys.cardId())
                    .apt(apartment)
                    .build();
              })
              .collect(Collectors.toCollection(() -> new ArrayList<>(apartments.size())));

          String nextPageUrl = null;
          if (results.size() == actualLimit) {
            results.removeLast();
            results.trimToSize();

            final var last = results.getLast();

            nextPageUrl = ApartmentsResource.TABLE_PATH;
            nextPageUrl += "?nextPage=" + last.key();
            //nextPageUrl += "?lastBuildingId=" + last.buildingId() + "&lastNumber=" + last.number();

            if (apartmentQuery.q() != null) {
              nextPageUrl += "&q=" + apartmentQuery.q();
            }

            for (String building : apartmentQuery.buildings()) {
              nextPageUrl += "&building=" + building;
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
    return repository().exists(buildingId, number);
  }


  @CacheInvalidateAll(cacheName = ApartmentCache.TOTAL_COUNT)
  @CacheInvalidateAll(cacheName = ApartmentCache.QUERY_COUNT)
  @CacheInvalidateAll(cacheName = ApartmentCache.SELECT_MINIMAL_BY_BUILDINGS)
  @CacheInvalidate(cacheName = ApartmentCache.EXISTS)
  public Uni<Void> invalidateOne(String buildingId, String number) {
    return invalidateGet(buildingId, number);
  }

  @CacheInvalidateAll(cacheName = ApartmentCache.SELECT)
  @CacheInvalidate(cacheName = ApartmentCache.GET)
  public Uni<Void> invalidateGet(String buildingId, String number) {
    return Uni.createFrom().voidItem();
  }


  public Uni<Apartment> create(ApartmentRequest request) {
    final var apartment = Apartment.builder()
        .buildingId(request.getBuildingId())
        .number(request.getNumber())
        .name(request.getName())
        .aliquot(request.getAliquot())
        .emails(request.getEmails())
        .build();

    return insert(apartment);
  }

  public Uni<Apartment> insert(Apartment apartment) {

    return repository().insert(apartment)
        .flatMap(i -> {
          if (i > 0) {
            return invalidateOne(apartment.buildingId(), apartment.number())
                .replaceWith(apartment);
          }

          return Uni.createFrom().item(apartment);
        });
  }

  public Uni<AptCountersDto> counters(ApartmentQuery apartmentQuery) {
    return Uni.combine()
        .all()
        .unis(totalCount(), queryCount(apartmentQuery))
        .with((totalCount, queryCount) -> new AptCountersDto(totalCount, queryCount.orElse(null)));

  }

  @CacheResult(cacheName = ApartmentCache.GET, lockTimeout = Constants.CACHE_TIMEOUT)
  public Uni<Optional<Apartment>> get(String buildingId, String number) {
    return repository().read(buildingId, number);
  }


  public Uni<Integer> update(Apartment apartment) {

    return repository().update(apartment)
        .flatMap(MutinyUtil.cacheCall(invalidateGet(apartment.buildingId(), apartment.number())));
  }

  @CacheResult(cacheName = ApartmentCache.SELECT_MINIMAL_BY_BUILDINGS, lockTimeout = Constants.CACHE_TIMEOUT)
  public Uni<List<ExtraCharge.Apt>> aptByBuildings(String buildingId) {
    return repository().aptByBuildings(buildingId);
  }

  public Uni<List<Apartment>> apartmentsByBuilding(String buildingId) {
    return repository().apartmentsByBuilding(buildingId);
  }
}
