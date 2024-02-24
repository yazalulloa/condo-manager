package com.yaz.persistence;


import com.yaz.persistence.domain.MySqlQueryRequest;
import com.yaz.persistence.domain.query.ApartmentQuery;
import com.yaz.persistence.entities.Apartment;
import com.yaz.util.SqlUtil;
import com.yaz.util.StringUtil;
import io.smallrye.mutiny.Multi;
import io.smallrye.mutiny.Uni;
import io.vertx.core.json.JsonObject;
import io.vertx.mutiny.sqlclient.Row;
import io.vertx.mutiny.sqlclient.RowIterator;
import io.vertx.mutiny.sqlclient.RowSet;
import io.vertx.mutiny.sqlclient.SqlResult;
import io.vertx.mutiny.sqlclient.Tuple;
import io.vertx.sqlclient.impl.ArrayTuple;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import lombok.RequiredArgsConstructor;

@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class ApartmentRepository {

  private static final String COLLECTION = "apartments";
  private static final String SELECT = "SELECT * FROM %s".formatted(COLLECTION);
  private static final String QUERY_COUNT = "SELECT count(*) as query_count FROM %s".formatted(COLLECTION);
  private static final String DELETE_BY_BUILDING = "DELETE FROM %s WHERE building_id = ?".formatted(COLLECTION);
  private static final String DELETE_BY_ID = "DELETE FROM %s WHERE building_id = ? AND number = ?".formatted(
      COLLECTION);
  private static final String INSERT = "INSERT INTO apartments (building_id, number, name, aliquot, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?);";
  private static final String INSERT_ON_UPDATE = """
      INSERT IGNORE INTO %s (building_id, number, name, aliquot, created_at, updated_at) 
      VALUES (?, ?, ?, ?, ?, ?);
      """.formatted(COLLECTION);


  private static final String SELECT_ONE = "SELECT * FROM %s WHERE building_id = ? AND number = ?".formatted(
      COLLECTION);

  private static final String SELECT_FULL = """
      SELECT apartments.*, GROUP_CONCAT(apartment_emails.email) as emails
      from apartments
               LEFT JOIN apartment_emails ON apartments.building_id = apartment_emails.building_id AND
                                              apartments.number = apartment_emails.apt_number
         %s
      GROUP BY apartments.building_id, apartments.number
      ORDER BY apartments.building_id, apartments.number
      LIMIT ?;
      """;

  private static final String SELECT_FULL_ONE = SELECT_FULL.formatted(
      " WHERE apartments.building_id = ? AND apartments.number = ? ");

  private static final String SELECT_FULL_WITH_LIKE = """
      SELECT apartments.*, GROUP_CONCAT(apartment_emails.email) as emails
      FROM apartments
               INNER JOIN (SELECT apartments.building_id, apartments.number
                           FROM apartments
                                    LEFT JOIN apartment_emails ON apartments.building_id = apartment_emails.building_id AND
                                                                  apartments.number = apartment_emails.apt_number
                           %s
                           GROUP BY apartments.building_id, apartments.number) AS matched_apartments
                          ON matched_apartments.building_id = apartments.building_id AND
                             matched_apartments.number = apartments.number
               INNER JOIN apartment_emails ON apartments.building_id = apartment_emails.building_id AND
                                              apartments.number = apartment_emails.apt_number
      GROUP BY apartments.building_id, apartments.number
      ORDER BY apartments.building_id, apartments.number
      LIMIT ?;
            """;

  private static final String UPDATE = """
      UPDATE %s
      SET name = ?, aliquot = ?, updated_at = ?
      WHERE building_id = ? AND number = ?;
      """.formatted(COLLECTION);

  private static final String QUERY_COUNT_WHERE = """
      SELECT COUNT(DISTINCT apartments.building_id, apartments.number) AS query_count
      FROM apartments
      INNER JOIN apartment_emails
      ON apartments.building_id = apartment_emails.building_id
      AND apartments.number = apartment_emails.apt_number
      %s;
      """;

  private static final String CURSOR_QUERY = "(apartments.building_id,apartments.number) > (?,?)";
  private static final String LIKE_QUERY = " concat(apartments.building_id, apartments.number, apartments.name, apartment_emails.email) LIKE ? ";
  private static final String EXISTS = "SELECT * FROM %s WHERE building_id = ? AND number = ? LIMIT 1".formatted(
      COLLECTION);

  private final MySqlService mySqlService;
  private final ApartmentEmailRepository emailRepository;


  private Uni<RowSet<Row>> request(MySqlQueryRequest request) {
    return mySqlService.request(request);
  }

  public Uni<Long> count() {
    return mySqlService.totalCount(COLLECTION);
  }

  public Uni<Integer> delete(String buildingId, String number) {

    return mySqlService.request(MySqlQueryRequest.normal(DELETE_BY_ID, Tuple.of(buildingId, number)))
        .map(SqlResult::rowCount);
  }

  public Uni<Integer> deleteByBuildingId(String buildingId) {

    return mySqlService.request(MySqlQueryRequest.normal(DELETE_BY_BUILDING, Tuple.of(buildingId)))
        .map(SqlResult::rowCount);
  }

  public Uni<List<RowSet<Row>>> insert(Apartment apartment) {
    final var aptTuple = tuple(apartment);
    final var requests = new ArrayList<MySqlQueryRequest>();

    final var aptInsertQuery = MySqlQueryRequest.normal(INSERT, aptTuple);
    requests.add(aptInsertQuery);

    if (apartment.emails() != null && !apartment.emails().isEmpty()) {
      requests.add(emailRepository.emailRequest(apartment.buildingId(), apartment.number(), apartment.emails()));
    }

    return mySqlService.transaction(requests);
  }

  public Uni<RowSet<Row>> save(Collection<Apartment> apartments) {

    final var tuples = apartments.stream()
        .map(this::tuple)
        .toList();

    final var mySqlBatch = MySqlQueryRequest.batch(INSERT, tuples);

    return mySqlService.request(mySqlBatch);
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

  private Tuple tuple(Apartment apartment) {
    final var params = new ArrayTuple(6);
    params.addValue(apartment.buildingId());
    params.addValue(apartment.number());
    params.addValue(apartment.name());
    params.addValue(apartment.aliquot());
    params.addValue(apartment.createdAt());
    params.addValue(apartment.updatedAt());

    return Tuple.newInstance(params);
  }

  public Stream<Tuple> emailsTuple(Apartment apartment) {
    if (apartment.emails() == null || apartment.emails().isEmpty()) {
      return Stream.empty();
    }

    return apartment.emails().stream().map(email -> {
      final var params = new ArrayTuple(3);
      params.addValue(apartment.buildingId());
      params.addValue(apartment.number());
      params.addValue(email);
      return Tuple.newInstance(params);
    });
  }

  private Apartment from(Row row) {

    final var emails = Optional.ofNullable(row.getString("emails"))
        .map(Object::toString)
        .map(str -> Arrays.stream(str.split(","))
            .collect(Collectors.toSet()))
        .orElseGet(Collections::emptySet);

    return Apartment.builder()
        .buildingId(row.getString("building_id"))
        .number(row.getString("number"))
        .name(row.getString("name"))
        .aliquot(row.getBigDecimal("aliquot"))
        .emails(emails)
        .createdAt(row.getLocalDateTime("created_at"))
        .updatedAt(row.getLocalDateTime("updated_at"))
        .build();
  }

  public Multi<JsonObject> select() {

    return mySqlService.request(SELECT + " LIMIT 10")
        .onItem()
        .transformToMulti(set -> Multi.createFrom().iterable(set))
        .map(Row::toJson);
  }

  public Uni<List<Apartment>> select(ApartmentQuery query) {

    final var sqlQueryRequest = where(query);

    final var str = sqlQueryRequest.query().isEmpty() ? "" : " WHERE " + sqlQueryRequest.query();
    final var queryRequest = sqlQueryRequest
        .toBuilder()
        .query((query.q() != null ? SELECT_FULL_WITH_LIKE : SELECT_FULL).formatted(str))
        .build();

    return mySqlService.request(queryRequest)
        .map(rows -> SqlUtil.toList(rows, this::from));
  }

  public Uni<Optional<Long>> queryCount(ApartmentQuery query) {

    final var buildings = query.buildings().stream()
        .map(StringUtil::trimFilter)
        .filter(Objects::nonNull)
        .collect(Collectors.toSet());

    final var q = StringUtil.trimFilter(query.q());

    if (q != null || !buildings.isEmpty()) {

      final var i = q != null && !buildings.isEmpty() ? 2 : 1;
      final var tuple = new ArrayTuple(i);

      final var params = new ArrayList<String>();
      if (!buildings.isEmpty()) {
        params.add("apartments.building_id IN (" + SqlUtil.params(buildings.size()) + ")");
        buildings.forEach(tuple::addString);
      }

      if (q != null) {
        params.add(LIKE_QUERY);
        tuple.addString("%" + q + "%");
      }

      final var queryParams = " WHERE " + String.join(SqlUtil.AND, params);

      final var queryRequest = MySqlQueryRequest.normal(QUERY_COUNT_WHERE.formatted(queryParams), tuple);
      return mySqlService.extractLong(queryRequest, "query_count")
          .map(Optional::of);
    }

    return Uni.createFrom().item(Optional.empty());
  }

  private MySqlQueryRequest where(ApartmentQuery query) {

    final var buildingId = StringUtil.trimFilter(query.lastBuildingId());
    final var number = StringUtil.trimFilter(query.lastNumber());

    final var stringBuilder = new StringBuilder();
    final var tupleSize = new AtomicInteger(1);
    final var ifCursorQuery = new AtomicBoolean(buildingId != null && number != null);
    if (ifCursorQuery.get()) {
      stringBuilder.append(CURSOR_QUERY);
      tupleSize.addAndGet(2);
    }

    final var buildings = query.buildings().stream()
        .map(StringUtil::trimFilter)
        .filter(Objects::nonNull)
        .collect(Collectors.toSet());

    if (!buildings.isEmpty()) {
      if (ifCursorQuery.get()) {
        stringBuilder.append(SqlUtil.AND);
      }
      ifCursorQuery.set(true);
      stringBuilder.append("apartments.building_id IN (").append(SqlUtil.params(buildings.size())).append(")");
      tupleSize.addAndGet(buildings.size());
    }

  /*  final var buildingOptional = Optional.ofNullable(query.building());
    buildingOptional.ifPresent(str -> {
      if (ifCursorQuery.get()) {
        stringBuilder.append(SqlUtil.AND);
      }
      ifCursorQuery.set(true);
      stringBuilder.append(" apartments.building_id = ? ");
      tupleSize.addAndGet(1);
    });*/

    final var qOptional = Optional.ofNullable(query.q())
        .map(String::trim)
        .filter(s -> !s.isEmpty());

    qOptional
        .ifPresent(str -> {
          if (ifCursorQuery.get()) {
            stringBuilder.append(SqlUtil.AND);
          }
          stringBuilder.append(LIKE_QUERY);
          tupleSize.addAndGet(1);
        });

    final var tuple = new ArrayTuple(tupleSize.get());
    Optional.ofNullable(buildingId).ifPresent(tuple::addValue);
    Optional.ofNullable(number).ifPresent(tuple::addValue);
    if (!buildings.isEmpty()) {
      buildings.forEach(tuple::addString);
    }
    qOptional.map(s -> "%" + s + "%").ifPresent(tuple::addValue);
    tuple.addValue(query.limit());

    return MySqlQueryRequest.normal(stringBuilder.toString(), new Tuple(tuple));
  }

  public Uni<Boolean> exists(String buildingId, String number) {

    final var request = MySqlQueryRequest.normal(EXISTS, Tuple.of(buildingId, number));

    return mySqlService.request(request)
        .map(RowSet::iterator)
        .map(RowIterator::hasNext);
  }

  public Uni<Apartment> read(String buildingId, String number) {

    final var request = MySqlQueryRequest.normal(SELECT_FULL_ONE, Tuple.of(buildingId, number, 1));
    return mySqlService.request(request)
        .map(RowSet::iterator)
        .map(iterator -> iterator.hasNext() ? from(iterator.next()) : null);
  }

  private Tuple updateTuple(Apartment apartment) {
    final var params = new ArrayTuple(5);
    params.addValue(apartment.name());
    params.addValue(apartment.aliquot());
    params.addValue(apartment.updatedAt());
    params.addValue(apartment.buildingId());
    params.addValue(apartment.number());

    return Tuple.newInstance(params);
  }

  public Uni<Integer> update(Apartment apartment) {

    final var updateQuery = MySqlQueryRequest.normal(UPDATE, updateTuple(apartment));
    final var deleteEmailsQuery = emailRepository.deleteWhere(apartment.buildingId(), apartment.number(),
        apartment.emails());
    final var insertQuery = emailRepository.insert(apartment.buildingId(), apartment.number(), apartment.emails());

    return Uni.combine().all()
        .unis(mySqlService.request(updateQuery).map(SqlResult::rowCount), deleteEmailsQuery, insertQuery)
        .with((updateRowCount, deleteCount, insertCount) -> updateRowCount + deleteCount + insertCount);
  }

  public Uni<Integer> insertOnUpdate(Collection<Apartment> apartments) {

    final var tuples = apartments.stream()
        .map(this::tuple)
        .toList();

    final var apartmentBatch = MySqlQueryRequest.batch(INSERT_ON_UPDATE, tuples);
    final var emailBatch = emailRepository.replace(apartments);

    return mySqlService.transaction(List.of(apartmentBatch, emailBatch))
        .map(list -> list.stream().mapToInt(SqlResult::rowCount).sum());
  }
}