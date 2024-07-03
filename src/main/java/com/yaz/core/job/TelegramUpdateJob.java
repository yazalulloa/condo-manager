package com.yaz.core.job;

import com.yaz.core.service.TelegramCommandResolver;
import com.yaz.core.service.TelegramRestService;
import io.micrometer.core.annotation.Timed;
import io.quarkus.scheduler.Scheduled;
import io.smallrye.mutiny.Multi;
import io.smallrye.mutiny.Uni;
import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.atomic.AtomicBoolean;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.eclipse.microprofile.config.inject.ConfigProperty;

@Slf4j
@RequiredArgsConstructor
public class TelegramUpdateJob {

  private static final AtomicBoolean RUNNING = new AtomicBoolean(false);
  private final Set<Long> updateIds = new HashSet<>();

  private final TelegramRestService restService;
  private final TelegramCommandResolver commandResolver;

  @ConfigProperty(name = "app.telegram.get_updates_job")
  boolean getUpdatesJob;

  @Scheduled(every = "3s")
  public void runAsStart() {

    if (!RUNNING.get() && getUpdatesJob) {
      final var offset = updateIds.stream().max(Long::compareTo).map(i -> i + 1).orElse(null);
      updateIds.clear();
      processUpdates(offset)
          .onTermination()
          .invoke(() -> RUNNING.set(false))
          .subscribe()
          .with(
              v -> {
              },
              e -> log.error("ERROR TelegramUpdateJob offset: {}", offset, e));
    }
  }

  @Timed(value = "telegram_job.updates_processing", description = "[Telegram Job] A measure of how long it takes to process Telegram updates")
  Uni<Void> processUpdates(Long offset) {
    return restService.getUpdates(offset)
        .toMulti()
        .flatMap(Multi.createFrom()::iterable)
        .filter(up -> updateIds.add(up.updateId()))
        .onItem()
        .transformToUni(commandResolver::resolve)
        .merge()
        .toUni();
  }

}
