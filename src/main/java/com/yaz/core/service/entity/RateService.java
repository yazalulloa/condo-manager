package com.yaz.core.service.entity;

import com.yaz.api.domain.response.RateTableItem;
import com.yaz.api.domain.response.RateTableResponse;
import com.yaz.core.bcv.BcvHistoricService;
import com.yaz.core.bcv.BcvUsdRateResult;
import com.yaz.core.service.EncryptionService;
import com.yaz.core.service.ListService;
import com.yaz.core.service.ListServicePagingProcessorImpl;
import com.yaz.core.service.domain.FileResponse;
import com.yaz.core.service.entity.cache.RateCache;
import com.yaz.core.util.Constants;
import com.yaz.core.util.MutinyUtil;
import com.yaz.core.util.PagingProcessor;
import com.yaz.core.util.RxUtil;
import com.yaz.core.util.WriteEntityToFile;
import com.yaz.persistence.domain.Currency;
import com.yaz.persistence.domain.query.RateQuery;
import com.yaz.persistence.domain.query.SortOrder;
import com.yaz.persistence.entities.Rate;
import com.yaz.persistence.repository.RateRepository;
import io.quarkus.cache.CacheInvalidate;
import io.quarkus.cache.CacheInvalidateAll;
import io.quarkus.cache.CacheResult;
import io.reactivex.rxjava3.core.Maybe;
import io.reactivex.rxjava3.core.Single;
import io.reactivex.rxjava3.schedulers.Schedulers;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor
public class RateService {


  //private final Instance<RateRepository> repository;
  private final RateRepository repository;
  private final WriteEntityToFile writeEntityToFile;
  private final EncryptionService encryptionService;
  private final BcvHistoricService bcvHistoricService;

  private RateRepository repository() {
    //return repository.get();
    return repository;
  }


  @CacheResult(cacheName = RateCache.TOTAL_COUNT, lockTimeout = Constants.CACHE_TIMEOUT)
  public Uni<Long> count() {
    return repository().count();
  }

  public Uni<Integer> delete(long id) {
    return repository().delete(id)
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

  @CacheResult(cacheName = RateCache.SELECT, lockTimeout = Constants.CACHE_TIMEOUT)
  public Uni<List<Rate>> list(RateQuery rateQuery) {
    return repository().listRows(rateQuery);
  }

  @CacheResult(cacheName = RateCache.LAST, lockTimeout = Constants.CACHE_TIMEOUT)
  public Uni<Optional<Rate>> lastUni(Currency fromCurrency, Currency toCurrency) {
    return repository().last(fromCurrency, toCurrency);
  }

  public Maybe<Rate> last(Currency fromCurrency, Currency toCurrency) {
    return RxUtil.toMaybe(lastUni(fromCurrency, toCurrency))
        .flatMap(Maybe::fromOptional);
  }


  public Uni<Rate> save(Rate rate) {

    return repository().save(rate)
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
    return repository().exists(hash);
  }

  public Single<Boolean> exists(Rate rate) {
    return Single.mergeArray(RxUtil.single(existsUni(rate.hash())), exists(rate.rate(), rate.dateOfRate()))
        .reduce(Boolean::logicalOr)
        .defaultIfEmpty(false);
  }

  public Single<Boolean> exists(BigDecimal rate, LocalDate dateOfRate) {
    return RxUtil.single(repository().exists(rate, dateOfRate));
  }

 /* private Single<HttpResponse<Buffer>> bcv(HttpMethod httpMethod) {
    return httpService.bcv(httpMethod);
  }*/

  private Single<BcvUsdRateResult> newRateResult() {

    return //bcvClientService.currentRate()
        bcvHistoricService.currentRate()
            .map(newRate -> new BcvUsdRateResult(BcvUsdRateResult.State.NEW_RATE, newRate))
            .subscribeOn(Schedulers.io());
  }

  @CacheResult(cacheName = RateCache.GET, lockTimeout = Constants.CACHE_TIMEOUT)
  public Uni<Optional<Rate>> read(long id) {
    return repository().read(id);
  }

  public Uni<Rate> get(long id) {
    return read(id)
        .map(optional -> optional.orElseThrow(() -> new IllegalArgumentException("Rate not found: " + id)));
  }

  private Maybe<BcvUsdRateResult> bcvCheck(Rate rate) {
    return //bcvClientService.bcvCheck()
        bcvHistoricService.bcvCheck()
            .filter(bcvCheck -> Objects.equals(bcvCheck.etag(), rate.etag()))
            .map(b -> new BcvUsdRateResult(BcvUsdRateResult.State.ETAG_IS_SAME));
  }

  public Single<BcvUsdRateResult> newRate() {

    return last(Currency.USD, Currency.VED)
        .filter(rate -> rate.etag() != null)
        .flatMap(this::bcvCheck)
        .switchIfEmpty(Single.defer(this::newRateResult));
  }


  public Uni<RateTableResponse> table(RateQuery rateQuery, String nextPagePrefix) {
    final var actualLimit = rateQuery.limit() + 1;
    return Uni.combine().all()
        .unis(count(), list(rateQuery.toBuilder()
            .limit(actualLimit)
            .build()))
        .with((totalCount, list) -> {
          final var results = list.stream()
              .map(rate -> RateTableItem.builder()
                  .key(encryptionService.encrypt(String.valueOf(rate.id())))
                  .rate(rate)
                  .build())
              .collect(Collectors.toCollection(() -> new ArrayList<>(list.size())));

          String nextPageUrl = null;
          if (results.size() == actualLimit) {
            results.removeLast();
            results.trimToSize();

            final var last = results.getLast();

            nextPageUrl = nextPagePrefix;
            nextPageUrl += "?nextPage=" + last.key();

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

  public Uni<Integer> insert(Collection<Rate> rates) {
    if (rates.isEmpty()) {
      return Uni.createFrom().item(0);
    }

    return repository().insert(rates);
  }

  public PagingProcessor<List<Rate>> pagingProcessor(int pageSize, SortOrder sortOrder) {
    return new ListServicePagingProcessorImpl<>(new RateListService(this), RateQuery.query(pageSize, sortOrder));
  }

  public Single<FileResponse> downloadFile() {
    return writeEntityToFile.downloadFile("rates.json.gz", pagingProcessor(100, SortOrder.ASC));
  }

  private record RateListService(RateService rateService) implements ListService<Rate, RateQuery> {

    @Override
    public Single<List<Rate>> listByQuery(RateQuery query) {
      return MutinyUtil.single(rateService.list(query));
    }

    @Override
    public RateQuery nextQuery(List<Rate> list, RateQuery query) {
      if (list.isEmpty()) {
        return query;
      }

      return query.toBuilder()
          .lastId(list.getLast().id())
          .build();
    }
  }
}
