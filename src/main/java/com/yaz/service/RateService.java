package com.yaz.service;

import com.yaz.client.BcvClientService;
import com.yaz.domain.BcvUsdRateResult;
import com.yaz.persistence.RateRepository;
import com.yaz.persistence.domain.Currency;
import com.yaz.persistence.domain.query.RateQuery;
import com.yaz.persistence.entities.Rate;
import com.yaz.resource.RateResource;
import com.yaz.resource.domain.response.RateTableResponse;
import com.yaz.resource.domain.response.RateTableResponse.Item;
import com.yaz.service.cache.RateCache;
import com.yaz.util.Constants;
import com.yaz.util.ConvertUtil;
import com.yaz.util.RxUtil;
import io.quarkus.cache.CacheInvalidate;
import io.quarkus.cache.CacheInvalidateAll;
import io.quarkus.cache.CacheResult;
import io.reactivex.rxjava3.core.Maybe;
import io.reactivex.rxjava3.core.Single;
import io.smallrye.mutiny.Uni;
import io.vertx.mutiny.sqlclient.RowSet;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
public class RateService {


  private final RateRepository repository;
  private final BcvClientService bcvClientService;

  @Inject
  public RateService(RateRepository repository, BcvClientService bcvClientService) {
    this.repository = repository;
    this.bcvClientService = bcvClientService;
  }


  @CacheResult(cacheName = RateCache.TOTAL_COUNT, lockTimeout = Constants.CACHE_TIMEOUT)
  public Uni<Long> count() {
    return repository.count();
  }

  public Uni<Integer> delete(long id) {
    return repository.delete(id)
        .flatMap(i -> {
          if (i > 0) {
            return invalidateOne(id)
                .replaceWith(i);
          }

          return Uni.createFrom().item(i);
        });
  }

  @CacheInvalidateAll(cacheName = RateCache.TOTAL_COUNT)
  @CacheInvalidate(cacheName = RateCache.EXISTS)
  public Uni<Void> invalidateOne(long id) {
    return invalidateGet(id);
  }

  @CacheInvalidateAll(cacheName = RateCache.LAST)
  @CacheInvalidateAll(cacheName = RateCache.SELECT)
  @CacheInvalidate(cacheName = RateCache.GET)
  public Uni<Void> invalidateGet(long id) {
    return Uni.createFrom().voidItem();
  }

  /* public Single<Paging<Rate>> paging(RateQuery rateQuery) {

     return Single.zip(RxUtil.single(count()), RxUtil.single(list(rateQuery)),
         (totalCount, list) -> new Paging<>(totalCount, null, list));
   }


   public Single<Paging<JsonObject>> pagingJson(RateQuery rateQuery) {
     return Single.zip(RxUtil.single(count()), RxUtil.single(listJson(rateQuery)),
         (totalCount, list) -> new Paging<>(totalCount, null, list));
   }

   public Uni<List<JsonObject>> listJson(RateQuery rateQuery) {

     return rateRepository.listRows(rateQuery)
         .map(SqlUtil::toJsonObject);
   }*/
  @CacheResult(cacheName = RateCache.SELECT, lockTimeout = Constants.CACHE_TIMEOUT)
  public Uni<List<Rate>> list(RateQuery rateQuery) {
    return repository.listRows(rateQuery);
  }

  @CacheResult(cacheName = RateCache.LAST, lockTimeout = Constants.CACHE_TIMEOUT)
  public Uni<Optional<Rate>> lastUni(Currency fromCurrency, Currency toCurrency) {
    return repository.last(fromCurrency, toCurrency)
        .map(RowSet::iterator)
        .map(iterator -> {
          if (iterator.hasNext()) {
            return Optional.of(repository.from(iterator.next()));
          }
          return Optional.empty();
        });
  }

  public Maybe<Rate> last(Currency fromCurrency, Currency toCurrency) {
    return RxUtil.toMaybe(lastUni(fromCurrency, toCurrency))
        .flatMap(Maybe::fromOptional);
  }


  public Uni<Rate> save(Rate rate) {

    return repository.save(rate)
        .map(id -> {
          return rate.toBuilder()
              .id(id.orElse(null))
              .build();
        })
        .flatMap(newRate -> {
          if (newRate.id() == null) {
            return Uni.createFrom().item(newRate);
          }

          return invalidateOne(newRate.id())
              .replaceWith(newRate);
        });
  }

  @CacheResult(cacheName = RateCache.EXISTS, lockTimeout = Constants.CACHE_TIMEOUT)
  public Uni<Boolean> existsUni(long hash) {
    return repository.exists(hash);
  }

  public Single<Boolean> exists(long hash) {
    return RxUtil.single(existsUni(hash));
  }

 /* private Single<HttpResponse<Buffer>> bcv(HttpMethod httpMethod) {
    return httpService.bcv(httpMethod);
  }*/

  private Single<BcvUsdRateResult> newRateResult() {
    return bcvClientService.get()
        .map(ConvertUtil::parseRate)
        .map(newRate -> new BcvUsdRateResult(BcvUsdRateResult.State.NEW_RATE, newRate));
  }

  private record BcvCheck(String etag, String lastModified) {

  }

  private Maybe<BcvUsdRateResult> bcvCheck(Rate rate) {
    return bcvClientService.head()
        .map(response -> {
          final var etag = response.getHeaderString("etag");
          final var lastModified = response.getHeaderString("last-modified");

          return new BcvCheck(etag, lastModified);
        })
        .filter(bcvCheck -> bcvCheck.etag().equals(rate.etag()))
        .map(b -> new BcvUsdRateResult(BcvUsdRateResult.State.ETAG_IS_SAME));
  }

  public Single<BcvUsdRateResult> newRate() {

    return last(Currency.USD, Currency.VED)
        .filter(rate -> rate.etag() != null)
        .flatMap(this::bcvCheck)
        .switchIfEmpty(Single.defer(this::newRateResult));
  }

  public Uni<RateTableResponse> table(RateQuery rateQuery) {
    final var actualLimit = rateQuery.limit() + 1;
    return Uni.combine().all()
        .unis(count(), list(rateQuery.toBuilder()
            .limit(actualLimit)
            .build()))
        .with((totalCount, list) -> {
          final var results = list.stream()
              .map(Item::new)
              .collect(Collectors.toCollection(() -> new ArrayList<>(list.size())));

          String nextPageUrl = null;
          if (results.size() == actualLimit) {
            results.remove(results.size() - 1);
            results.trimToSize();

            final var last = results.getLast();

            nextPageUrl = RateResource.PATH;
            nextPageUrl += "?lastId=" + last.getRate().id();

            if (rateQuery.date() != null) {
              nextPageUrl += "&date=" + rateQuery.date();
            }
          }

          return RateTableResponse.builder()
              .totalCount(totalCount)
              .nextPageUrl(nextPageUrl)
              .results(results)
              .build();
        });
  }
}
