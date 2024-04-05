package com.yaz.persistence.repository.mysql;

import com.yaz.persistence.domain.IdentityProvider;
import com.yaz.persistence.domain.OidcDbTokenQueryRequest;
import com.yaz.persistence.entities.OidcDbToken;
import com.yaz.persistence.entities.OidcDbToken.User;
import com.yaz.core.util.SqlUtil;
import io.smallrye.mutiny.Uni;
import io.vertx.mutiny.sqlclient.Row;
import io.vertx.mutiny.sqlclient.SqlResult;
import io.vertx.mutiny.sqlclient.Tuple;
import io.vertx.sqlclient.impl.ArrayTuple;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
//@LookupIfProperty(name = "app.repository.impl", stringValue = "mysql")
//@Named("mysql")
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class OidcDbTokenMySqlRepository  {

  private static final String COLLECTION = "oidc_db_token_state_manager";
  private static final String SELECT = """
      SELECT oidc_db_token_state_manager.*,BIN_TO_UUID(oidc_db_token_state_manager.user_id) as uuid_id,
      users.provider_id, users.provider, users.email, users.username, users.name, users.picture 
      FROM %s %s
      LEFT JOIN users ON oidc_db_token_state_manager.user_id = users.id 
      ORDER BY id DESC LIMIT ?
      """;
  private static final String DELETE = "DELETE FROM %s WHERE id = ?".formatted(COLLECTION);

  // , created_at = NOW()
  private static final String UPDATE_USER_ID = """
      UPDATE %s SET user_id = UUID_TO_BIN(?) WHERE id = ?
      """.formatted(COLLECTION);

  private static final String DELETE_BY_USER = "DELETE FROM %s WHERE user_id = UUID_TO_BIN(?)".formatted(COLLECTION);

  private final MySqlService mySqlService;

  
  public Uni<Long> count() {
    return mySqlService.totalCount(COLLECTION);
  }

  public OidcDbToken from(Row row) {
    return OidcDbToken.builder()
        .id(row.getString("id"))
        .idToken(row.getString("id_token"))
        .accessToken(row.getString("access_token"))
        .refreshToken(row.getString("refresh_token"))
        .expiresIn(row.getLong("expires_in"))
        .createdAt(SqlUtil.getValue(row, "created_at", Row::getLocalDateTime))
        .updatedAt(SqlUtil.getValue(row, "updated_at", Row::getLocalDateTime))
        .user(User.builder()
            .id(SqlUtil.getValue(row, "uuid_id", Row::getString))
            .providerId(SqlUtil.getValue(row, "provider_id", Row::getString))
            .provider(SqlUtil.getValue(row, "provider", Row::getString, IdentityProvider::valueOf))
            .email(SqlUtil.getValue(row, "email", Row::getString))
            .username(SqlUtil.getValue(row, "username", Row::getString))
            .name(SqlUtil.getValue(row, "name", Row::getString))
            .picture(SqlUtil.getValue(row, "picture", Row::getString))
            .build())
        .build();
  }

  
  public Uni<List<OidcDbToken>> select(OidcDbTokenQueryRequest queryRequest) {

    final var whereClause = queryRequest.lastId() == null ? "" : "WHERE id > ?";

    final var query = SELECT.formatted(COLLECTION, whereClause);

    final var tuple = new ArrayTuple(queryRequest.lastId() == null ? 1 : 2);
    if (queryRequest.lastId() != null) {
      tuple.addString(queryRequest.lastId());
    }

    tuple.addInteger(queryRequest.limit());

    return mySqlService.request(query, tuple)
        .map(rows -> SqlUtil.toList(rows, this::from));
  }

  
  public Uni<Integer> delete(String id) {
    return mySqlService.request(DELETE, Tuple.of(id))
        .map(SqlResult::rowCount);
  }

  
  public Uni<Integer> updateUserId(String id, String userId) {
    return mySqlService.request(UPDATE_USER_ID, Tuple.of(userId, id))
        .map(SqlResult::rowCount);

  }

  
  public Uni<Integer> deleteByUser(String id) {
    return mySqlService.request(DELETE_BY_USER, Tuple.of(id))
        .map(SqlResult::rowCount);
  }

  
  public Uni<Integer> insert(String idToken, String accessToken, String refreshToken, long expiresIn, String id) {
    throw new UnsupportedOperationException("Not implemented");
  }

  
  public Uni<Optional<OidcDbToken>> read(String id) {
    throw new UnsupportedOperationException("Not implemented");
  }

  
  public Uni<Integer> deleteIfExpired(long expiresIn) {
    throw new UnsupportedOperationException("Not implemented");
  }
}
