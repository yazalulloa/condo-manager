package com.yaz.service;


import com.yaz.persistence.domain.query.BuildingQuery;
import com.yaz.persistence.entities.Building;
import com.yaz.persistence.repository.BuildingRepository;
import com.yaz.resource.BuildingResource;
import com.yaz.resource.domain.response.BuildingReportResponse;
import com.yaz.service.cache.BuildingCache;
import com.yaz.util.Constants;
import io.quarkus.cache.CacheInvalidate;
import io.quarkus.cache.CacheInvalidateAll;
import io.quarkus.cache.CacheResult;
import io.smallrye.mutiny.Multi;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.inject.Instance;
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
public class BuildingService {

  //private final Instance<BuildingRepository> repository;
  private final BuildingRepository repository;

  private BuildingRepository repository() {
    //return repository.get();
    return repository;
  }

  @CacheResult(cacheName = BuildingCache.TOTAL_COUNT, lockTimeout = Constants.CACHE_TIMEOUT)
  public Uni<Long> count() {
    return repository().count();
  }


  public Uni<Integer> delete(String id) {
    return repository().delete(id)
        .flatMap(i -> {
          if (i > 0) {
            return invalidateOne(id)
                .replaceWith(i);
          }

          return Uni.createFrom().item(i);
        });
  }

  @CacheInvalidateAll(cacheName = BuildingCache.TOTAL_COUNT)
  @CacheInvalidateAll(cacheName = BuildingCache.QUERY_COUNT)
  @CacheInvalidateAll(cacheName = BuildingCache.IDS)
  @CacheInvalidate(cacheName = BuildingCache.EXISTS)
  public Uni<Void> invalidateOne(String id) {
    return invalidateGet(id);
  }

  @CacheInvalidateAll(cacheName = BuildingCache.SELECT)
  @CacheInvalidate(cacheName = BuildingCache.GET)
  public Uni<Void> invalidateGet(String id) {
    return Uni.createFrom().voidItem();
  }


  @CacheResult(cacheName = BuildingCache.SELECT, lockTimeout = Constants.CACHE_TIMEOUT)
  public Uni<List<Building>> list(BuildingQuery buildingQuery) {
    return repository().select(buildingQuery);
  }

  @CacheResult(cacheName = BuildingCache.IDS, lockTimeout = Constants.CACHE_TIMEOUT)
  public Uni<List<String>> ids() {
    return repository().selectAllIds();
  }

  @CacheResult(cacheName = BuildingCache.EXISTS, lockTimeout = Constants.CACHE_TIMEOUT)
  public Uni<Boolean> exists(String buildingId) {
    return repository().exists(buildingId);
  }

  public Uni<BuildingReportResponse> report(BuildingQuery buildingQuery) {
    final var actualLimit = buildingQuery.limit() + 1;
    final var query = buildingQuery.toBuilder()
        .limit(actualLimit)
        .build();

    return Uni.combine().all()
        .unis(count(), list(query))
        .with((totalCount, list) -> {
          final var results = list.stream()
              .map(BuildingReportResponse.Item::new)
              .collect(Collectors.toCollection(() -> new ArrayList<>(list.size())));

          String nextPageUrl = null;
          if (results.size() == actualLimit) {
            results.remove(results.size() - 1);
            results.trimToSize();

            final var last = results.getLast();

            nextPageUrl = BuildingResource.PATH + "/report";
            nextPageUrl += "?lastId=" + last.getBuilding().id();

          }

          return BuildingReportResponse.builder()
              .totalCount(totalCount)
              .nextPageUrl(nextPageUrl)
              .results(results)
              .build();
        });
  }

  @CacheResult(cacheName = BuildingCache.GET, lockTimeout = Constants.CACHE_TIMEOUT)
  public Uni<Optional<Building>> get(String buildingId) {
    return repository().read(buildingId);
  }


  public Uni<Building> update(Building building) {
    return repository().update(building)
        .flatMap(i -> {
          if (i > 0) {
            return invalidateGet(building.id())
                .replaceWith(building);
          }

          return Uni.createFrom().item(building);
        });
  }

  public Uni<Building> create(Building building) {

    return repository().insert(building)
        .flatMap(i -> {
          if (i > 0) {
            return invalidateOne(building.id())
                .replaceWith(building);
          }

          return Uni.createFrom().item(building);
        });
  }

  public Uni<Integer> updateEmailConfig(String id) {
    return repository().selectByEmailConfig(id)
        .flatMap(set -> {
          if (set.isEmpty()) {
            return Uni.createFrom().item(0);
          }

          return repository().updateEmailConfig(set)
              .flatMap(i -> {
                return Multi.createFrom().iterable(set)
                    .toUni()
                    .flatMap(this::invalidateOne)
                    .replaceWith(i);
              });

        });
  }
}
