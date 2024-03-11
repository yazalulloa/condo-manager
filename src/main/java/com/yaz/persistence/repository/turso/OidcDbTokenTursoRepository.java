package com.yaz.persistence.repository.turso;

import com.yaz.client.turso.response.TursoResponse;
import com.yaz.client.turso.response.TursoResponse.Row;
import com.yaz.persistence.domain.IdentityProvider;
import com.yaz.persistence.domain.OidcDbTokenQueryRequest;
import com.yaz.persistence.entities.OidcDbToken;
import com.yaz.persistence.entities.OidcDbToken.User;
import com.yaz.persistence.repository.OidcDbTokenRepository;
import com.yaz.util.SqlUtil;
import io.quarkus.arc.lookup.LookupIfProperty;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@LookupIfProperty(name = "app.repository.impl", stringValue = "turso")
//@Named("turso")
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class OidcDbTokenTursoRepository implements OidcDbTokenRepository {

  private static final String COLLECTION = "oidc_db_token_state_manager";
  private static final String SELECT = """
      SELECT oidc_db_token_state_manager.*,users.provider_id, users.provider, users.email, users.username, users.name, users.picture
      FROM %s %s
      LEFT JOIN users ON oidc_db_token_state_manager.user_id = users.id
      ORDER BY id DESC LIMIT %s
      """;
  private static final String DELETE = "DELETE FROM %s WHERE id = %s";
  private static final String UPDATE_USER_ID = "UPDATE %s SET user_id = %s WHERE id = %s";
  private static final String DELETE_BY_USER = "DELETE FROM %s WHERE user_id = %s";
  private static final String READ = "SELECT * FROM %s WHERE id = %s";

  private final TursoService tursoService;

  @Override
  public Uni<Long> count() {
    return tursoService.count("id", COLLECTION);
  }

  @Override
  public Uni<List<OidcDbToken>> select(OidcDbTokenQueryRequest queryRequest) {
    final var whereClause =
        queryRequest.lastId() == null ? "" : "WHERE id > %s".formatted(SqlUtil.escape(queryRequest.lastId()));

    final var sql = SELECT.formatted(COLLECTION, whereClause, queryRequest.limit());

    return tursoService.executeQuery(sql)
        .map(TursoResponse::values)
        .map(rows -> SqlUtil.toList(rows, this::from));
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

    final var sql = DELETE.formatted(COLLECTION, SqlUtil.escape(id));
    return tursoService.executeQuery(sql)
        .map(TursoResponse::affectedRows);
  }

  @Override
  public Uni<Integer> updateUserId(String id, String userId) {
    final var sql = UPDATE_USER_ID.formatted(COLLECTION, SqlUtil.escape(userId), SqlUtil.escape(id));
    return tursoService.executeQuery(sql)
        .map(TursoResponse::affectedRows);
  }

  @Override
  public Uni<Integer> deleteByUser(String userId) {

    final var sql = DELETE_BY_USER.formatted(COLLECTION, SqlUtil.escape(userId));
    return tursoService.executeQuery(sql)
        .map(TursoResponse::affectedRows);
  }

  @Override
  public Uni<Integer> insert(String idToken, String accessToken, String refreshToken, long expiresIn, String id) {

    final var params = Stream.of(id, idToken, accessToken, refreshToken, expiresIn)
        .map(SqlUtil::escape)
        .collect(Collectors.joining(","));

    final var sql = "INSERT INTO %s (id, id_token, access_token, refresh_token, expires_in) VALUES (%s)".formatted(
        COLLECTION, params);

    return tursoService.executeQuery(sql)
        .map(TursoResponse::affectedRows);
  }

  @Override
  public Uni<Optional<OidcDbToken>> read(String id) {

    final var sql = READ.formatted(COLLECTION, SqlUtil.escape(id));
    return tursoService.executeQuery(sql)
        .map(TursoResponse::values)
        .map(rows -> {
          if (rows.isEmpty()) {
            return Optional.empty();
          } else {
            return Optional.ofNullable(from(rows.getFirst()));
          }
        });
  }

  @Override
  public Uni<Integer> deleteIfExpired(long expiresIn) {
    final var sql = "DELETE FROM %s WHERE expires_in < %s".formatted(COLLECTION, expiresIn);
    return tursoService.executeQuery(sql)
        .map(TursoResponse::affectedRows);
  }
}
