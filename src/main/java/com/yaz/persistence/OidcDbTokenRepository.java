package com.yaz.persistence;

import io.smallrye.mutiny.Uni;
import io.vertx.mutiny.sqlclient.Row;
import io.vertx.mutiny.sqlclient.SqlResult;
import io.vertx.mutiny.sqlclient.Tuple;
import io.vertx.sqlclient.impl.ArrayTuple;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import com.yaz.persistence.domain.MySqlQueryRequest;
import com.yaz.persistence.domain.OidcDbTokenQueryRequest;
import com.yaz.persistence.entities.OidcDbToken;
import com.yaz.util.SqlUtil;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class OidcDbTokenRepository {

  private static final String COLLECTION = "oidc_db_token_state_manager";
  private static final String SELECT = "SELECT * FROM %s %s ORDER BY id DESC LIMIT ?";
  private static final String DELETE = "DELETE FROM %s WHERE id = ?".formatted(COLLECTION);

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
    return mySqlService.request(MySqlQueryRequest.normal(DELETE, Tuple.of(id)))
        .map(SqlResult::rowCount);
  }
}
