package com.yaz.persistence;

import io.smallrye.mutiny.Uni;
import io.vertx.mutiny.sqlclient.SqlResult;
import io.vertx.mutiny.sqlclient.Tuple;
import io.vertx.sqlclient.impl.ArrayTuple;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import lombok.RequiredArgsConstructor;
import com.yaz.persistence.domain.MySqlQueryRequest;
import com.yaz.persistence.entities.Apartment;

@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class ApartmentEmailRepository {

  public static final String COLLECTION = "apartment_emails";
  private static final String REPLACE = "INSERT IGNORE INTO apartment_emails (building_id, apt_number, email) VALUES (?, ?, ?);";
  public static final String INSERT = """
      INSERT IGNORE INTO %s (building_id, apt_number, email)
      VALUES (?, ?, ?)
      """.formatted(COLLECTION);

  public static final String DELETE = """
      DELETE FROM %s WHERE building_id = ? AND apt_number = ? AND email = ?
      """.formatted(COLLECTION);

  public static final String DELETE_WHERE = "DELETE FROM %s WHERE building_id = ? AND apt_number = ? AND email NOT IN (".formatted(
      COLLECTION);

  public static final String READ = "SELECT * FROM %s WHERE building_id = ? AND apt_number = ? AND email = ? LIMIT 1".formatted(
      COLLECTION);

  public static final String DELETE_BY_APT = "DELETE FROM %s WHERE building_id = ? AND apt_number = ?".formatted(
      COLLECTION);

  private final MySqlService mySqlService;

  public Uni<Long> count() {
    return mySqlService.totalCount(COLLECTION);
  }

  public Uni<Integer> insert(String buildingId, String aptNumber, Set<String> emails) {
    if (emails == null || emails.isEmpty()) {
      return Uni.createFrom().item(0);
    }

    if (emails.size() == 1) {
      final var email = emails.iterator().next();
      return mySqlService.request(MySqlQueryRequest.normal(INSERT, tuple(buildingId, aptNumber, email)))
          .map(SqlResult::rowCount);
    }

    final var tuples = emails.stream()
        .map(email -> tuple(buildingId, aptNumber, email))
        .toList();

    final var request = MySqlQueryRequest.batch(INSERT, tuples);

    return mySqlService.request(request)
        .map(SqlResult::rowCount);
  }

  public Uni<Integer> deleteWhere(String buildingId, String aptNumber, Set<String> emails) {

    if (emails == null || emails.isEmpty()) {
      return Uni.createFrom().item(0);
    }

    final var tuple = new ArrayTuple(2 + emails.size());
    tuple.addString(buildingId);
    tuple.addString(aptNumber);

    emails.forEach(tuple::addString);

    final var emailParams = Stream.generate(() -> "?")
        .limit(emails.size())
        .collect(Collectors.joining(","));

    final var query = DELETE_WHERE + emailParams + ")";
    final var request = MySqlQueryRequest.normal(query, tuple);

    return mySqlService.request(request)
        .map(SqlResult::rowCount);
  }

  public Tuple tuple(String buildingId, String aptNumber, String email) {
    return Tuple.of(buildingId, aptNumber, email);
  }

  /*public Uni<RowSet<Row>> replace(Collection<Apartment> apartments) {

    final var tuples = apartments.stream()
        .map(this::tuple)
        .toList();

    final var aptBatch = MySqlQueryRequest.batch(REPLACE, tuples);

    final var emailsTuple = apartments.stream().flatMap(this::emailsTuple)
        .toList();

    if (emailsTuple.isEmpty()) {
      return mySqlService.request(aptBatch);
    }

    final var emailBatch = MySqlQueryRequest.batch(REPLACE_EMAIL, emailsTuple);

    return Uni.combine().all()
        .unis(mySqlService.request(aptBatch), mySqlService.request(emailBatch))
        .asTuple()
        .map(Tuple2::getItem1);
  }*/

  public MySqlQueryRequest emailRequest(String buildingId, String aptNumber, Set<String> emails) {
    if (emails.size() == 1) {
      final var email = emails.iterator().next();
      return MySqlQueryRequest.normal(INSERT, tuple(buildingId, aptNumber, email));
    }

    final var tuples = emails.stream()
        .map(email -> tuple(buildingId, aptNumber, email))
        .toList();

    return MySqlQueryRequest.batch(INSERT, tuples);
  }

  public MySqlQueryRequest replace(Collection<Apartment> apartments) {

    final var tuples = apartments.stream()
        .flatMap(apartment -> {
          return apartment.emails().stream()
              .map(email -> tuple(apartment.buildingId(), apartment.number(), email));
        })
        .toList();

    return MySqlQueryRequest.batch(REPLACE, tuples);
  }
}
