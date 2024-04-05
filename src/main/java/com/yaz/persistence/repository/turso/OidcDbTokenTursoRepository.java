package com.yaz.persistence.repository.turso;

import com.yaz.persistence.domain.IdentityProvider;
import com.yaz.persistence.domain.OidcDbTokenQueryRequest;
import com.yaz.persistence.entities.OidcDbToken;
import com.yaz.persistence.entities.OidcDbToken.User;
import com.yaz.persistence.repository.OidcDbTokenRepository;
import com.yaz.persistence.repository.turso.client.TursoWsService;
import com.yaz.persistence.repository.turso.client.ws.request.Stmt;
import com.yaz.persistence.repository.turso.client.ws.request.Value;
import com.yaz.persistence.repository.turso.client.ws.response.ExecuteResp.Row;
import com.yaz.core.util.SqlUtil;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
//@LookupIfProperty(name = "app.repository.impl", stringValue = "turso")
//@Named("turso")
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class OidcDbTokenTursoRepository implements OidcDbTokenRepository {

  private static final String COLLECTION = "oidc_db_token_state_manager";
  private static final String SELECT = """
      SELECT oidc_db_token_state_manager.*,users.provider_id, users.provider, users.email, users.username, users.name, users.picture
      FROM %s %s
      LEFT JOIN users ON oidc_db_token_state_manager.user_id = users.id
      ORDER BY id DESC LIMIT ?
      """;
  private static final String DELETE = "DELETE FROM %s WHERE id = ?".formatted(COLLECTION);
  private static final String UPDATE_USER_ID = "UPDATE %s SET user_id = ? WHERE id = ?".formatted(COLLECTION);
  private static final String DELETE_BY_USER = "DELETE FROM %s WHERE user_id = ?".formatted(COLLECTION);
  private static final String READ = "SELECT * FROM %s WHERE id = ?".formatted(COLLECTION);
  private static final String DELETE_IF_EXPIRED = "DELETE FROM %s WHERE expires_in < ?".formatted(COLLECTION);
  private static final String INSERT = "INSERT INTO %s (id, id_token, access_token, refresh_token, expires_in) VALUES (%s)".formatted(
      COLLECTION, SqlUtil.params(5));

  private final TursoWsService tursoWsService;

  @Override
  public Uni<Long> count() {
    return tursoWsService.count("id", COLLECTION);
  }

  @Override
  public Uni<List<OidcDbToken>> select(OidcDbTokenQueryRequest queryRequest) {

    final var whereClause = queryRequest.lastId() == null ? "" : "WHERE id > ?";
    final var sql = SELECT.formatted(COLLECTION, whereClause);

    final var values = new ArrayList<Value>();
    if (queryRequest.lastId() != null) {
      values.add(Value.text(queryRequest.lastId()));
    }

    values.add(Value.number(queryRequest.limit()));

    return tursoWsService.selectQuery(sql, values, this::from);

  }

  private OidcDbToken from(Row row) {
    return OidcDbToken.builder()
        .id(row.getString("id"))
        .idToken(row.getString("id_token"))
        .accessToken(row.getString("access_token"))
        .refreshToken(row.getString("refresh_token"))
        .expiresIn(row.getLong("expires_in"))
        .createdAt(row.getLocalDateTime("created_at"))
        .updatedAt(row.getLocalDateTime("updated_at"))
        .user(User.builder()
            .id(row.getString("user_id"))
            .providerId(row.getString("provider_id"))
            .provider(row.getEnum("provider", IdentityProvider::valueOf))
            .email(row.getString("email"))
            .username(row.getString("username"))
            .name(row.getString("name"))
            .picture(row.getString("picture"))
            .build())
        .build();
  }

  @Override
  public Uni<Integer> delete(String id) {

    return tursoWsService.executeQuery(DELETE, Value.text(id))
        .map(executeResp -> executeResp.result().rowCount());
  }

  @Override
  public Uni<Integer> updateUserId(String id, String userId) {

    return tursoWsService.executeQuery(UPDATE_USER_ID, Value.text(userId), Value.text(id))
        .map(executeResp -> executeResp.result().rowCount());
  }

  @Override
  public Uni<Integer> deleteByUser(String userId) {

    return tursoWsService.executeQuery(DELETE_BY_USER, Value.text(userId))
        .map(executeResp -> executeResp.result().rowCount());
  }

  @Override
  public Uni<Integer> insert(String idToken, String accessToken, String refreshToken, long expiresIn, String id) {

    return tursoWsService.executeQuery(Stmt.stmt(INSERT, Value.text(id), Value.text(idToken), Value.text(accessToken),
            Value.text(refreshToken), Value.number(expiresIn)))
        .map(executeResp -> executeResp.result().rowCount());
  }

  @Override
  public Uni<Optional<OidcDbToken>> read(String id) {
    return tursoWsService.selectOne(Stmt.stmt(READ, Value.text(id)), this::from);
  }

  @Override
  public Uni<Integer> deleteIfExpired(long expiresIn) {

    return tursoWsService.executeQuery(DELETE_IF_EXPIRED, Value.number(expiresIn))
        .map(executeResp -> executeResp.result().rowCount());
  }
}
