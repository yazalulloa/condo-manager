package com.yaz.core.job;

import com.yaz.core.service.SaveNewBcvRate;
import com.yaz.core.util.MutinyUtil;
import io.micrometer.core.annotation.Timed;
import io.quarkus.scheduler.Scheduled;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.concurrent.atomic.AtomicInteger;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor
public class BcvJob {

  private final AtomicInteger counter = new AtomicInteger();
  private final SaveNewBcvRate saveNewBcvRate;

  @Scheduled(delay = 1, every = "1H")
  Uni<Void> runAsStart() {
    return saveNewBcvRate();
  }

  @Scheduled(cron = "${app.bcv_job_cron_expression}")
  Uni<Void> scheduleFixedRateTaskAsync() {
    return saveNewBcvRate();
  }

  @Timed(value = "bcv_job", description = "[BCV Job] A measure of how long it takes to save new BCV rate")
  Uni<Void> saveNewBcvRate() {

//    if (true) {
//      return Uni.createFrom().voidItem();
//    }

    //log.info("RUN_JOB {} counter: {}", Thread.currentThread(), counter.incrementAndGet());

    final var single = saveNewBcvRate.saveNewRate()
        .doOnError(
            throwable -> log.error("ERROR", throwable))
        //.retryWhen(RetryWithDelay.retry(5, 1, TimeUnit.SECONDS))
        ;

    return MutinyUtil.toUni(single)
        .replaceWithVoid();
  }

}
