package com.yaz.core.service;

import com.yaz.core.bcv.BcvUsdRateResult;
import com.yaz.core.bcv.BcvUsdRateResult.State;
import com.yaz.core.service.entity.RateService;
import com.yaz.core.util.DateUtil;
import com.yaz.core.util.DecimalUtil;
import com.yaz.core.util.EventConstants;
import com.yaz.core.util.RxUtil;
import io.reactivex.rxjava3.core.Maybe;
import io.reactivex.rxjava3.core.Single;
import io.vertx.core.json.Json;
import io.vertx.mutiny.core.eventbus.EventBus;
import jakarta.enterprise.context.ApplicationScoped;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor
public class SaveNewBcvRate {

  private final RateService rateService;
  private final EventBus eventBus;
  //private final BcvGetDocumentQueue bcvGetDocumentQueue;
  private final NotificationService notificationService;
  // private final VertxHandler vertxHandler;


  public Single<BcvUsdRateResult> saveNewRate() {

    return rateService.newRate()
        .flatMap(result -> {

          if (result.state() != State.NEW_RATE) {
            return Single.just(result);
          }

          final var rate = result.rate();

          final var newRateSingle = Single.fromCallable(() -> rate.toBuilder()
                  .createdAt(DateUtil.utcLocalDateTime())
                  .build())
              .map(rateService::save)
              .flatMap(RxUtil::single)
              .map(r -> new BcvUsdRateResult(State.NEW_RATE, r))
              .cache();

          final var saveRate = newRateSingle
              .map(BcvUsdRateResult::rate)
              .doAfterSuccess(r -> eventBus.publish(EventConstants.NEW_RATE, EventConstants.NEW_RATE))
              .map(r -> "Nueva tasa añadida%n%s%nFecha de la tasa: %s".formatted(r.rate(), r.dateOfRate()))
              .flatMapCompletable(notificationService::sendNewRate)
              .andThen(newRateSingle);

          final var lastSingle = rateService.last(rate.fromCurrency(), rate.toCurrency())
              .switchIfEmpty(Maybe.fromAction(() -> log.info("LAST RATE NOT FOUND")))
              .map(lastRate -> {

                    if (rate.dateOfRate().isBefore(lastRate.dateOfRate())) {
                      return new BcvUsdRateResult(State.OLD_RATE);
                    }

                    final var isSameRate = DecimalUtil.equalsTo(lastRate.rate(), rate.rate())
                        && lastRate.dateOfRate().isEqual(rate.dateOfRate())
                        && lastRate.source() == rate.source();

                    if (!isSameRate) {
                      log.info("LAST RATE IS DIFFERENT \nOLD: {}\nNEW: {}", Json.encodePrettily(lastRate),
                          Json.encodePrettily(rate));
                      return new BcvUsdRateResult(State.NEW_RATE);
                    }

                    return new BcvUsdRateResult(State.SAME_RATE);
                  }
              )
              .defaultIfEmpty(new BcvUsdRateResult(State.RATE_NOT_IN_DB));

          final var existSingle = rateService.exists(rate);

          return Single.zip(lastSingle, existSingle, (lastResult, exists) -> {

            if (lastResult.state() == State.SAME_RATE
                || lastResult.state() == State.OLD_RATE
                || lastResult.state() == State.ETAG_IS_SAME) {
              return Single.just(lastResult);
            }

            if (exists) {
              return Single.just(new BcvUsdRateResult(State.HASH_SAVED));
            }

            return saveRate;
          }).flatMap(s -> s);
        });

  }
}
