package com.yaz.service;

import io.reactivex.rxjava3.core.Maybe;
import io.reactivex.rxjava3.core.Single;
import io.smallrye.mutiny.Uni;
import io.vertx.core.json.JsonObject;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import com.yaz.client.BcvClient;
import com.yaz.domain.BcvUsdRateResult;
import com.yaz.persistence.RateRepository;
import com.yaz.persistence.domain.Currency;
import com.yaz.persistence.domain.Paging;
import com.yaz.persistence.domain.RateQuery;
import com.yaz.persistence.entities.Rate;
import com.yaz.resource.RateResource;
import com.yaz.resource.domain.RateTableResponse;
import com.yaz.resource.domain.RateTableResponse.Item;
import com.yaz.util.ConvertUtil;
import com.yaz.util.RxUtil;
import com.yaz.util.SqlUtil;

@Slf4j
@ApplicationScoped
public class RateService {


  private final RateRepository rateRepository;
  private final BcvClient bcvClient;

  @Inject
  public RateService(RateRepository rateRepository, BcvClient bcvClient) {
    this.rateRepository = rateRepository;
    this.bcvClient = bcvClient;
  }


  //@CacheResult(cacheName = RateCache.TOTAL_COUNT, lockTimeout = Constants.CACHE_TIMEOUT)
  public Uni<Long> count() {
    return rateRepository.count();
  }


  //  @CacheInvalidateAll(cacheName = RateCache.TOTAL_COUNT)
//  @CacheInvalidateAll(cacheName = RateCache.SELECT)
//  @CacheInvalidate(cacheName = RateCache.EXISTS)
//  @CacheInvalidate(cacheName = RateCache.GET)
  public Uni<Integer> delete(long id) {
    return rateRepository.delete(id);
  }

  public Single<Paging<Rate>> paging(RateQuery rateQuery) {

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
  }

  public Uni<List<Rate>> list(RateQuery rateQuery) {
    return rateRepository.listRows(rateQuery)
        .map(rows -> SqlUtil.toList(rows, Rate.class));
  }


  public Maybe<Rate> last(Currency fromCurrency, Currency toCurrency) {
    return RxUtil.toMaybe(rateRepository.last(fromCurrency, toCurrency))
        .flatMap(rows -> SqlUtil.parseOne(rows, Rate.class));
  }

  public Uni<Rate> save(Rate rate) {

    return rateRepository.save(rate)
        .map(id -> {
          return rate.toBuilder()
              .id(id.orElse(null))
              .build();
        });
  }

  public Single<Boolean> exists(Long hash) {
    return RxUtil.single(rateRepository.exists(hash));
  }

 /* private Single<HttpResponse<Buffer>> bcv(HttpMethod httpMethod) {
    return httpService.bcv(httpMethod);
  }*/

  private Single<BcvUsdRateResult> newRateResult() {
    return bcvClient.get()
        .map(ConvertUtil::parseRate)
        .map(newRate -> new BcvUsdRateResult(BcvUsdRateResult.State.NEW_RATE, newRate));
  }

  private record BcvCheck(String etag, String lastModified) {

  }

  private Maybe<BcvUsdRateResult> bcvCheck(Rate rate) {
    return bcvClient.head()
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
