package com.yaz.core.job;

import com.yaz.core.service.SaveNewBcvRate;
import com.yaz.core.util.RxUtil;
import io.quarkus.scheduler.Scheduled;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.concurrent.atomic.AtomicInteger;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class BcvJob {

  private final AtomicInteger counter = new AtomicInteger();
  private final SaveNewBcvRate saveNewBcvRate;

  @Scheduled(delay = 1, every = "1H")
  public void runAsStart() {
    saveNewBcvRate();
  }

  @Scheduled(cron = "${app.bcv_job_cron_expression}")
  public void scheduleFixedRateTaskAsync() {
    saveNewBcvRate();
  }

  private void saveNewBcvRate() {
    //log.info("RUN_JOB {} counter: {}", Thread.currentThread(), counter.incrementAndGet());

    saveNewBcvRate.saveNewRate()
        .doOnError(throwable -> log.error("ERROR", throwable))
        //.retryWhen(RetryWithDelay.retry(5, 1, TimeUnit.SECONDS))
        .subscribe(RxUtil.singleObserver(bool -> {
              //log.info("NEW_RATE_SAVED {}", bool)
            },
            throwable -> {
              //log.error("ERROR", throwable)
            }));
  }

}
