package com.yaz.core.util.rx;


import io.netty.handler.proxy.ProxyConnectException;
import io.netty.resolver.dns.DnsNameResolverTimeoutException;
import io.reactivex.rxjava3.core.Flowable;
import io.reactivex.rxjava3.functions.BiConsumer;
import io.reactivex.rxjava3.functions.Function;
import java.net.NoRouteToHostException;
import java.net.UnknownHostException;
import java.util.Objects;
import java.util.concurrent.TimeUnit;
import javax.net.ssl.SSLException;
import javax.net.ssl.SSLHandshakeException;
import com.yaz.core.util.ReflectionUtil;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class RetryWithDelay implements Function<Flowable<? extends Throwable>, Flowable<?>> {

  private final int maxRetryCount;
  private final int retryDelay;
  private final TimeUnit timeUnit;
  private final Function<Throwable, Boolean> validator;
  private int retryCount;
  private final BiConsumer<Integer, Integer> retryCounterConsumer;

  private RetryWithDelay(int maxRetryCount, int retryDelay, TimeUnit timeUnit, Function<Throwable, Boolean> validator,
      BiConsumer<Integer, Integer> retryCounterConsumer) {
    this.maxRetryCount = maxRetryCount;
    this.retryDelay = retryDelay;
    this.timeUnit = Objects.requireNonNull(timeUnit, "TIME_UNIT_MUST_NOT_BE_NULL");
    this.validator = validator;
    this.retryCount = 0;
    this.retryCounterConsumer = retryCounterConsumer;
  }

  public static RetryWithDelay retry(int maxRetryCount, int retryDelay, TimeUnit timeUnit) {
    return new RetryWithDelay(maxRetryCount, retryDelay, timeUnit, null, null);
  }

  public static RetryWithDelay retry(int maxRetryCount, int retryDelay, TimeUnit timeUnit,
      Function<Throwable, Boolean> validator) {
    return new RetryWithDelay(maxRetryCount, retryDelay, timeUnit, validator, null);
  }

  public static RetryWithDelay retry(int maxRetryCount, int retryDelay, TimeUnit timeUnit,
      Function<Throwable, Boolean> validator, BiConsumer<Integer, Integer> retryCounterConsumer) {
    return new RetryWithDelay(maxRetryCount, retryDelay, timeUnit, validator, retryCounterConsumer);
  }

  public static RetryWithDelay retry(int retryDelay, TimeUnit timeUnit) {
    return new RetryWithDelay(0, retryDelay, timeUnit, null, null);
  }

  public static RetryWithDelay retry(int retryDelay, TimeUnit timeUnit, Function<Throwable, Boolean> validator) {
    return new RetryWithDelay(0, retryDelay, timeUnit, validator, null);
  }

  public static RetryWithDelay retryIfFailedNetwork() {
    return retryIfFailedNetwork(5, 500, TimeUnit.MILLISECONDS);
  }

  public static RetryWithDelay retryIfFailedNetwork(int maxRetryCount, int retryDelay, TimeUnit timeUnit) {
    return retry(maxRetryCount, retryDelay, timeUnit,
        t -> {
          final var shouldRetry = ReflectionUtil.isInstanceOf(t, DnsNameResolverTimeoutException.class,
              UnknownHostException.class,
              SSLException.class, SSLHandshakeException.class,
              ProxyConnectException.class, NoRouteToHostException.class
              //        , ConnectException.class
          );

          if (shouldRetry) {
           log.info("Retrying due to network error: {}", t.getMessage());
          }

          return shouldRetry;
        });
  }

  @Override
  public Flowable<?> apply(final Flowable<? extends Throwable> attempts) {

    return attempts.flatMap(throwable -> {

      if (validator == null || validator.apply(throwable)) {
        if (maxRetryCount == 0 || ++retryCount < maxRetryCount) {
          if (retryCounterConsumer != null) {
            retryCounterConsumer.accept(retryCount, maxRetryCount);
          }

          return Flowable.timer(retryDelay, timeUnit);
        }
      }

      return Flowable.error(throwable);
    });
  }
}