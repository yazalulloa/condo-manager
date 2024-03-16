package com.yaz.persistence.repository.turso;

import com.yaz.client.turso.response.TursoResponse;
import com.yaz.client.turso.response.TursoResponse.Row;
import com.yaz.persistence.domain.IdentityProvider;
import com.yaz.persistence.domain.query.SortOrder;
import com.yaz.persistence.domain.query.UserQuery;
import com.yaz.persistence.entities.User;
import com.yaz.persistence.repository.UserRepository;
import com.yaz.persistence.repository.turso.client.TursoService;
import com.yaz.persistence.repository.turso.client.TursoWsService;
import com.yaz.util.DateUtil;
import com.yaz.util.SqlUtil;
import io.quarkus.arc.lookup.LookupIfProperty;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@LookupIfProperty(name = "app.repository.impl", stringValue = "turso")
//@Named("turso")
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class UserTursoRepository implements UserRepository {

  private static final String COLLECTION = "users";
  private static final String SELECT = "SELECT * FROM %s %s ORDER BY id DESC LIMIT %s";
  private static final String DELETE = "DELETE FROM %s WHERE id = %s";
  private static final String INSERT = """
      INSERT INTO %s (id, provider_id, provider, email, username, name, picture, data) VALUES (%s)
      """;
  private static final String UPDATE = "UPDATE %s SET last_login_at = datetime() WHERE id = %s";
  private static final String LIKE_QUERY = " concat(email, name, username) LIKE %s ";
  private static final String SELECT_ID_FROM_PROVIDER = "SELECT id FROM %s WHERE provider = %s AND provider_id = %s";

  private final TursoService tursoService;
  private final TursoWsService tursoWsService;

  @Override
  public Uni<Long> count() {
    return tursoWsService.count("id", COLLECTION);
  }

  @Override
  public Uni<Integer> delete(String id) {
    final var sql = DELETE.formatted(COLLECTION, SqlUtil.escape(id));
    return tursoService.executeQuery(sql)
        .map(TursoResponse::affectedRows);
  }

  @Override
  public Uni<Optional<String>> getIdFromProvider(IdentityProvider provider, String providerId) {
    final var sql = SELECT_ID_FROM_PROVIDER.formatted(COLLECTION, SqlUtil.escape(provider.name()),
        SqlUtil.escape(providerId));
    return tursoService.executeQuery(sql)
        .map(TursoResponse::result)
        .map(result -> {
          return result.firstRow()
              .map(row -> row.getString("id"));
        });
  }

  @Override
  public Uni<Integer> updateLastLoginAt(String id) {
    final var sql = UPDATE.formatted(COLLECTION, SqlUtil.escape(id));
    return tursoService.executeQuery(sql)
        .map(TursoResponse::affectedRows);
  }


  @Override
  public Uni<String> save(User user) {
    final var now = DateUtil.epochSecond();
    final String id = now + UUID.randomUUID().toString();

    final var params = Stream.of(
            id,
            user.providerId(),
            user.provider().name(),
            user.email(),
            user.username(),
            user.name(),
            user.picture(),
            user.data()
        ).map(SqlUtil::escape)
        .collect(Collectors.joining(","));

    final var sql = INSERT.formatted(COLLECTION, params);

    return tursoService.executeQuery(sql)
        .replaceWith(id);
  }

  @Override
  public Uni<List<User>> select(UserQuery query) {
    final var whereParams = new ArrayList<String>();

    Optional.ofNullable(query.lastId())
        .map(String::trim)
        .filter(s -> !s.isEmpty())
        .ifPresent(lastId -> {

          final var direction = query.sortOrder() == SortOrder.DESC ? "<" : ">";
          whereParams.add("id %s %s".formatted(direction, SqlUtil.escape(lastId)));
        });

    Optional.ofNullable(query.identityProvider())
        .map(Enum::name)
        .map(SqlUtil::escape)
        .map("provider = %s"::formatted)
        .ifPresent(whereParams::add);

    Optional.ofNullable(query.q())
        .map(String::trim)
        .filter(s -> !s.isEmpty())
        .map(SqlUtil::escape)
        .map(LIKE_QUERY::formatted)
        .ifPresent(whereParams::add);

    var whereClause = String.join(" AND ", whereParams);
    if (!whereClause.isEmpty()) {
      whereClause = " WHERE " + whereClause;
    } else {
      whereClause = "";
    }

    final var sql = SELECT.formatted(COLLECTION, whereClause, query.limit());

    return tursoService.executeQuery(sql)
        .map(TursoResponse::values)
        .map(rows -> SqlUtil.toList(rows, this::from));
  }

  private User from(Row row) {
    return User.builder()
        .id(row.getString("id"))
        .providerId(row.getString("provider_id"))
        .provider(IdentityProvider.valueOf(row.getString("provider")))
        .email(row.getString("email"))
        .username(row.getString("username"))
        .name(row.getString("name"))
        .picture(row.getString("picture"))
        .data(row.getJsonObject("data"))
        .createdAt(row.getLocalDateTime("created_at"))
        .lastLoginAt(row.getLocalDateTime("last_login_at"))
        .build();
  }
}
