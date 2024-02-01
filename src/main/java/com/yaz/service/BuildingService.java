package com.yaz.service;


import com.yaz.resource.BuildingResource;
import io.quarkus.cache.CacheResult;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import com.yaz.persistence.BuildingRepository;
import com.yaz.persistence.domain.BuildingQuery;
import com.yaz.persistence.entities.Building;
import com.yaz.resource.RateResource;
import com.yaz.resource.domain.response.BuildingReportResponse;
import com.yaz.service.cache.BuildingCache;
import com.yaz.util.Constants;
import com.yaz.util.SqlUtil;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class BuildingService {

  private final BuildingRepository repository;

  @CacheResult(cacheName = BuildingCache.TOTAL_COUNT, lockTimeout = Constants.CACHE_TIMEOUT)
  public Uni<Long> count() {
    return repository.count();
  }

  public Uni<Integer> delete(String id) {
    return repository.delete(id);
  }


  @CacheResult(cacheName = BuildingCache.SELECT, lockTimeout = Constants.CACHE_TIMEOUT)

  public Uni<List<Building>> list(BuildingQuery buildingQuery) {
    return repository.select(buildingQuery);
  }

  @CacheResult(cacheName = BuildingCache.IDS, lockTimeout = Constants.CACHE_TIMEOUT)
  public Uni<List<String>> ids() {

    return repository.selectAllIds()
        .map(rows -> SqlUtil.toList(rows, row -> row.getString("id")));
  }

  @CacheResult(cacheName = BuildingCache.EXISTS, lockTimeout = Constants.CACHE_TIMEOUT)
  public Uni<Boolean> exists(String buildingId) {
    return repository.exists(buildingId);
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

  public Uni<Optional<Building>> get(String buildingId) {
    return repository.read(buildingId);
  }

  public Uni<Building> update(Building building) {
    return repository.update(building)
        .replaceWith(building);
  }

  public Uni<Building> create(Building building) {
    final var build = building.toBuilder()
        .amountOfApts(0L)
        .build();
    return repository.insert(build)
        .replaceWith(building);
  }
}
