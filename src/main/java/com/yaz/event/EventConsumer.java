package com.yaz.event;

import com.yaz.event.domain.EmailConfigDeleted;
import com.yaz.service.BuildingService;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Observes;
import jakarta.enterprise.event.ObservesAsync;
import jakarta.inject.Inject;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
//@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class EventConsumer {

  @Inject
  BuildingService service;

  public void emailConfigDeleted(@ObservesAsync EmailConfigDeleted task) {
    log.info("emailConfigDeleted: {}", task) ;
    service.updateEmailConfig(task.id())
        .subscribe()
        .with(
            i -> {
              log.info("EmailConfigDeleted: {} updated: {}", task.id(), i);
            },
            e -> {
              log.error("ERROR updating building EmailConfigDeleted: {}", task.id(), e);
            });

  }
}
