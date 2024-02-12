package com.yaz.persistence;

import com.yaz.persistence.domain.IdentityProvider;
import com.yaz.persistence.domain.MySqlQueryRequest;
import com.yaz.persistence.domain.query.UserQuery;
import com.yaz.persistence.entities.User;
import com.yaz.util.SqlUtil;
import com.yaz.util.StringUtil;
import io.smallrye.mutiny.Uni;
import io.vertx.mutiny.sqlclient.Row;
import io.vertx.mutiny.sqlclient.RowIterator;
import io.vertx.mutiny.sqlclient.SqlResult;
import io.vertx.mutiny.sqlclient.Tuple;
import io.vertx.sqlclient.impl.ArrayTuple;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Stream;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class UserRepository {

  private static final String COLLECTION = "users";
  private static final String SELECT = "SELECT *, BIN_TO_UUID(id) as uuid_id FROM %s %s ORDER BY id DESC LIMIT ?";
  private static final String DELETE_BY_ID = "DELETE FROM %s WHERE id = UUID_TO_BIN(?)".formatted(COLLECTION);
  private static final String INSERT = """
      INSERT INTO %s (id, provider_id, provider, email, username, name, picture, data, created_at, last_login_at) 
      VALUES (UUID_TO_BIN(UUID(), true), %s)
      """
      .formatted(COLLECTION, SqlUtil.params(9));
  public static final String LIKE_QUERY = " concat(email, name, username) LIKE ? ";
  private static final String SELECT_ID_FROM_PROVIDER = "SELECT BIN_TO_UUID(id) as id FROM %s WHERE provider = ? AND provider_id = ?".formatted(
      COLLECTION);

  private final MySqlService mySqlService;

  public Uni<Long> count() {
    return mySqlService.totalCount(COLLECTION);
  }

  public Uni<Integer> delete(String id) {

    return mySqlService.request(MySqlQueryRequest.normal(DELETE_BY_ID, Tuple.of(id)))
        .map(SqlResult::rowCount);
  }

  public Uni<String> getIdFromProvider(IdentityProvider provider, String providerId) {

    final var params = new ArrayTuple(2);
    params.addString(provider.name());
    params.addString(providerId);

    final var queryRequest = MySqlQueryRequest.normal(SELECT_ID_FROM_PROVIDER, params);

    return mySqlService.request(queryRequest)
        .map(rows -> {
          // SqlUtil.print(rows);
          return Optional.of(rows.iterator())
              .filter(RowIterator::hasNext)
              .map(RowIterator::next)
              .map(row -> row.getString("id"))
              .orElse(null);
        });
  }

  private User from(Row row) {
    return User.builder()
        .id(row.getString("uuid_id"))
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

  public Uni<Integer> updatelastLoginAt(String id) {

    final var queryRequest = MySqlQueryRequest.normal(
        "UPDATE %s SET last_login_at = NOW() WHERE id = UUID_TO_BIN(?)".formatted(COLLECTION),
        Tuple.of(id));

    return mySqlService.request(queryRequest)
        .map(SqlResult::rowCount);
  }


  public Uni<Integer> insert(User user) {

    final var params = new ArrayTuple(9);
    params.addString(user.providerId());
    params.addString(user.provider().name());
    params.addString(user.email());
    params.addString(user.username());
    params.addString(user.name());
    params.addString(user.picture());
    params.addJsonObject(user.data());
    params.addLocalDateTime(user.createdAt());
    params.addLocalDateTime(user.lastLoginAt());

    final var queryRequest = MySqlQueryRequest.normal(INSERT, params);

    return mySqlService.request(queryRequest)
        .map(SqlResult::rowCount);
  }

  public Uni<List<User>> select(UserQuery query) {

    final var queryRequest = where(query);

    return mySqlService.request(queryRequest)
        .map(rows -> SqlUtil.toList(rows, this::from));
  }

  private MySqlQueryRequest where(UserQuery query) {

    final var lastId = StringUtil.uuid(query.lastId());
    final var identityProvider = query.identityProvider();
    final var q = StringUtil.trimFilter(query.q());

    final var tupleSize = Stream.of(lastId, identityProvider, q)
        .filter(Objects::nonNull)
        .count();

    if (tupleSize == 0) {
      return MySqlQueryRequest.normal(SELECT.formatted(COLLECTION, ""), Tuple.of(query.limit()));
    }

    final var tuple = new ArrayTuple((int) tupleSize);
    final var queries = new ArrayList<String>();

    if (lastId != null) {
      queries.add("id < UUID_TO_BIN(?)");
      tuple.addUUID(lastId);
    }

    if (identityProvider != null) {
      queries.add("provider = ?");
      tuple.addString(identityProvider.name());
    }

    if (q != null) {
      queries.add(LIKE_QUERY);
      tuple.addString("%" + q + "%");
    }

    tuple.addInteger(query.limit());

    final var queryParams = " WHERE " + String.join(SqlUtil.AND, queries);

    return MySqlQueryRequest.normal(SELECT.formatted(COLLECTION, queryParams), tuple);
  }
}
