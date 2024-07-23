package com.yaz.core.service.entity;

import com.yaz.persistence.entities.NotificationEvent;
import com.yaz.persistence.repository.turso.NotificationEventRepository;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor
public class NotificationEventService {

  private final NotificationEventRepository repository;

  public Uni<List<NotificationEvent>> selectByUser(String userId) {
    return repository.selectByUser(userId);
  }

  public Uni<Integer> insert(String userId, NotificationEvent.Event event) {
    return repository.insert(userId, event);
  }

  public Uni<Integer> delete(String userId, NotificationEvent.Event event) {
    return repository.delete(userId, event);
  }

  public Uni<Integer> deleteByUser(String userId) {
    return repository.deleteByUser(userId);
  }
}
