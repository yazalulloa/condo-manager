package com.yaz.persistence.repository.turso;

import com.yaz.persistence.entities.NotificationEvent;
import com.yaz.persistence.repository.turso.client.TursoWsService;
import com.yaz.persistence.repository.turso.client.ws.request.Stmt;
import com.yaz.persistence.repository.turso.client.ws.request.Value;
import com.yaz.persistence.repository.turso.client.ws.response.ExecuteResp.Row;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class NotificationEventRepository {

  private static final String COLLECTION = "notifications_events";

  private static final String DELETE = "DELETE FROM %s WHERE user_id = ? AND event = ?".formatted(COLLECTION);
  private static final String SELECT_BY_USER = "SELECT * FROM %s WHERE user_id = ?".formatted(COLLECTION);
  private static final String DELETE_BY_USER = "DELETE FROM %s WHERE user_id = ?".formatted(COLLECTION);
  private static final String INSERT = "INSERT INTO %s (user_id, event) VALUES (?, ?)".formatted(COLLECTION);

  private final TursoWsService tursoWsService;

  public Uni<List<NotificationEvent>> selectByUser(String userId) {
    return tursoWsService.selectQuery(Stmt.stmt(SELECT_BY_USER, Value.text(userId)), this::from);
  }

  public Uni<Integer> insert(String userId, NotificationEvent.Event event) {
    return tursoWsService.executeQuery(Stmt.stmt(INSERT, Value.text(userId), Value.text(event.name())))
        .map(resp -> resp.result().rowCount());
  }

  public Uni<Integer> delete(String userId, NotificationEvent.Event event) {
    return tursoWsService.executeQuery(Stmt.stmt(DELETE, Value.text(userId), Value.text(event.name())))
        .map(resp -> resp.result().rowCount());
  }

  public Stmt deleteByUserStmt(String userId) {
    return Stmt.stmt(DELETE_BY_USER, Value.text(userId));
  }

  public Uni<Integer> deleteByUser(String userId) {
    return tursoWsService.executeQuery(deleteByUserStmt(userId))
        .map(resp -> resp.result().rowCount());
  }

  private NotificationEvent from(Row row) {
    return NotificationEvent.builder()
        .userId(row.getString("user_id"))
        .event(row.getEnum("event", NotificationEvent.Event::valueOf))
        .createdAt(row.getLocalDateTime("created_at"))
        .build();
  }
}
