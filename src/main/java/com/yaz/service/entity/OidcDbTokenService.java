package com.yaz.service.entity;


import com.yaz.persistence.domain.OidcDbTokenQueryRequest;
import com.yaz.persistence.entities.OidcDbToken;
import com.yaz.persistence.repository.OidcDbTokenRepository;
import com.yaz.resource.OidcDbTokenResource;
import com.yaz.resource.domain.response.OidcDbTokenTableResponse;
import com.yaz.service.entity.cache.OidcDbTokenCache;
import com.yaz.util.Constants;
import com.yaz.util.MutinyUtil;
import io.quarkus.cache.CacheInvalidate;
import io.quarkus.cache.CacheInvalidateAll;
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

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class OidcDbTokenService {

  //private final Instance<OidcDbTokenRepository> repository;
  private final OidcDbTokenRepository repository;

  private OidcDbTokenRepository repository() {
    //return repository.get();
    return repository;
  }

  @CacheInvalidateAll(cacheName = OidcDbTokenCache.TOTAL_COUNT)
  @CacheInvalidateAll(cacheName = OidcDbTokenCache.QUERY_COUNT)
  @CacheInvalidate(cacheName = OidcDbTokenCache.EXISTS)
  public Uni<Void> invalidateOne(String id) {
    return invalidateGet(id);
  }

  @CacheInvalidateAll(cacheName = OidcDbTokenCache.SELECT)
  @CacheInvalidate(cacheName = OidcDbTokenCache.READ)
  public Uni<Void> invalidateGet(String id) {
    return Uni.createFrom().voidItem();
  }

  @CacheInvalidateAll(cacheName = OidcDbTokenCache.TOTAL_COUNT)
  @CacheInvalidateAll(cacheName = OidcDbTokenCache.QUERY_COUNT)
  @CacheInvalidateAll(cacheName = OidcDbTokenCache.EXISTS)
  @CacheInvalidateAll(cacheName = OidcDbTokenCache.SELECT)
  @CacheInvalidateAll(cacheName = OidcDbTokenCache.READ)
  public Uni<Void> invalidateAll() {
    return Uni.createFrom().voidItem();
  }


  @CacheResult(cacheName = OidcDbTokenCache.TOTAL_COUNT, lockTimeout = Constants.CACHE_TIMEOUT)
  public Uni<Long> count() {
    return repository().count();
  }

  @CacheResult(cacheName = OidcDbTokenCache.READ, lockTimeout = Constants.CACHE_TIMEOUT)
  public Uni<Optional<OidcDbToken>> read(String id) {
    return repository().read(id);
  }

  public Uni<Integer> delete(String id) {

    return repository().delete(id)
        .flatMap(MutinyUtil.cacheCall(invalidateOne(id)));
  }


  public Uni<Integer> deleteByUser(String id) {
    return repository().deleteByUser(id)
        .flatMap(MutinyUtil.cacheCall(invalidateAll()));
  }

  public Uni<Integer> deleteIfExpired(long expiresIn) {
    return repository().deleteIfExpired(expiresIn)
        .flatMap(MutinyUtil.cacheCall(invalidateAll()));
  }

  public Uni<Integer> insert(String idToken, String accessToken, String refreshToken, long expiresIn, String id) {
    return repository().insert(idToken, accessToken, refreshToken, expiresIn, id)
        .flatMap(MutinyUtil.cacheCall(invalidateOne(id)));
  }

  public Uni<Integer> updateUserId(String id, String userId) {
    return repository().updateUserId(id, userId)
        .flatMap(MutinyUtil.cacheCall(invalidateOne(id)));
  }

  @CacheResult(cacheName = OidcDbTokenCache.SELECT, lockTimeout = Constants.CACHE_TIMEOUT)
  public Uni<List<OidcDbToken>> list(OidcDbTokenQueryRequest queryRequest) {
    return repository().select(queryRequest);
  }

  public Uni<OidcDbTokenTableResponse> tableResponse(OidcDbTokenQueryRequest request) {

    final var actualLimit = request.limit() + 1;

    final var queryRequest = request.toBuilder()
        .limit(actualLimit)
        .build();
    return Uni.combine().all().unis(
        count(),
        list(queryRequest)
    ).with((totalCount, tokens) -> {

      final var results = tokens.stream()
          .map(OidcDbTokenTableResponse.Item::new)
          .collect(Collectors.toCollection(() -> new ArrayList<>(tokens.size())));

      String nextPageUrl = null;
      if (results.size() == actualLimit) {
        results.removeLast();
        results.trimToSize();

        final var last = results.getLast();

        nextPageUrl = OidcDbTokenResource.GRID_PATH + "?lastId=" + last.getToken().id();

      }

      return new OidcDbTokenTableResponse(totalCount, nextPageUrl, results);
    });
  }
}
