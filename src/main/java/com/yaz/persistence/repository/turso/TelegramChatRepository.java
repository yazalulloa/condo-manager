package com.yaz.persistence.repository.turso;

import com.yaz.persistence.entities.TelegramChat;
import com.yaz.persistence.repository.turso.client.TursoWsService;
import com.yaz.persistence.repository.turso.client.ws.request.Stmt;
import com.yaz.persistence.repository.turso.client.ws.request.Value;
import com.yaz.persistence.repository.turso.client.ws.response.ExecuteResp.Row;
import com.yaz.util.SqlUtil;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
//@LookupIfProperty(name = "app.repository.impl", stringValue = "turso")
//@Named("turso")
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class TelegramChatRepository {

  private static final String COLLECTION = "telegram_chats";

  private static final String DELETE_BY_USER = "DELETE FROM %s WHERE user_id = ?".formatted(COLLECTION);
  private static final String DELETE = "DELETE FROM %s WHERE user_id = ? AND chat_id = ?".formatted(COLLECTION);
  private static final String INSERT = """
      INSERT INTO %s (user_id, chat_id, data, first_name, last_name, username) VALUES (%s)
      """.formatted(COLLECTION, SqlUtil.params(6));

  private static final String READ = "SELECT * FROM %s WHERE user_id = ? AND chat_id = ?".formatted(COLLECTION);

  private final TursoWsService tursoWsService;

  public Uni<Long> count() {
    return tursoWsService.count("*", COLLECTION);
  }

  public Uni<Integer> deleteByUser(String userId) {
    return tursoWsService.executeQuery(DELETE_BY_USER, Value.text(userId))
        .map(executeResp -> executeResp.result().rowCount());
  }

  public Uni<Integer> delete(String userId, long chatId) {
    return tursoWsService.executeQuery(DELETE, Value.text(userId), Value.number(chatId))
        .map(executeResp -> executeResp.result().rowCount());
  }

  public Uni<Integer> save(TelegramChat chat) {

    return tursoWsService.executeQuery(INSERT, Value.text(chat.userId()), Value.number(chat.chatId()),
            Value.text(chat.data().encode()),
            Value.text(chat.firstName()), Value.text(chat.lastName()), Value.text(chat.username()))
        .map(executeResp -> executeResp.result().rowCount());
  }

  private TelegramChat from(Row row) {
    return TelegramChat.builder()
        .userId(row.getString("user_id"))
        .chatId(row.getLong("chat_id"))
        .data(row.getJsonObject("data"))
        .firstName(row.getString("first_name"))
        .lastName(row.getString("last_name"))
        .username(row.getString("username"))
        .build();
  }

  public Uni<Optional<TelegramChat>> read(String userId, long chatId) {
    return tursoWsService.selectOne(Stmt.stmt(READ, Value.text(userId), Value.number(chatId)), this::from);
  }


}
