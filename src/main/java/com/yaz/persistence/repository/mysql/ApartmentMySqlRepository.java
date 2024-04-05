package com.yaz.persistence.repository.mysql;


import com.yaz.persistence.domain.MySqlQueryRequest;
import com.yaz.persistence.domain.query.ApartmentQuery;
import com.yaz.persistence.entities.Apartment;
import com.yaz.persistence.entities.ExtraCharge;
import com.yaz.persistence.repository.mysql.MySqlService.TrxMode;
import com.yaz.core.util.SqlUtil;
import com.yaz.core.util.StringUtil;
import io.smallrye.mutiny.Uni;
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
import lombok.extern.slf4j.Slf4j;

@Slf4j
//@LookupIfProperty(name = "app.repository.impl", stringValue = "mysql")
//@Named("mysql")
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class ApartmentMySqlRepository {

  private static final String COLLECTION = "apartments";
  private static final String DELETE_BY_BUILDING = "DELETE FROM %s WHERE building_id = ?".formatted(COLLECTION);
  private static final String DELETE_BY_ID = "DELETE FROM %s WHERE building_id = ? AND number = ?".formatted(
      COLLECTION);
  private static final String INSERT = "INSERT INTO %s (building_id, number, name, aliquot) VALUES (%s);".formatted(
      COLLECTION, SqlUtil.params(4));
  private static final String INSERT_IGNORE = """
      INSERT IGNORE INTO %s (building_id, number, name, aliquot) 
      VALUES (%s);
      """.formatted(COLLECTION, SqlUtil.params(4));
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
      UPDATE %s SET name = ?, aliquot = ? WHERE building_id = ? AND number = ?;
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

  private static final String SELECT_MINIMAL_BY_BUILDING = """
      SELECT building_id, number, name FROM %s
            WHERE building_id = ?
            ORDER BY number
            """.formatted(COLLECTION);

  private final MySqlService mySqlService;
  private final ApartmentEmailRepository emailRepository;

  
  public Uni<Long> count() {
    return mySqlService.totalCount(COLLECTION);
  }

  
  public Uni<Integer> delete(String buildingId, String number) {

    return mySqlService.request(DELETE_BY_ID, Tuple.of(buildingId, number))
        .map(SqlResult::rowCount);
  }

  
  public Uni<Integer> deleteByBuildingId(String buildingId) {

    return mySqlService.request(DELETE_BY_BUILDING, Tuple.of(buildingId))
        .map(SqlResult::rowCount);
  }

  
  public Uni<Integer> insert(Apartment apartment) {
    final var aptTuple = tuple(apartment);
    final var requests = new ArrayList<MySqlQueryRequest>();

    requests.add(MySqlQueryRequest.normal(INSERT, aptTuple));

    if (apartment.emails() != null && !apartment.emails().isEmpty()) {
      requests.add(emailRepository.emailRequest(apartment.buildingId(), apartment.number(), apartment.emails()));
    }

    return mySqlService.transaction(TrxMode.PARALLEL, requests)
        .map(list -> {
          return list.stream().map(SqlResult::rowCount)
              .reduce(Integer::sum)
              .orElse(0);
        });
  }


  public Uni<Integer> save(Collection<Apartment> apartments) {

    final var tuples = apartments.stream()
        .map(this::tuple)
        .toList();

    final var mySqlBatch = MySqlQueryRequest.batch(INSERT, tuples);

    return mySqlService.request(mySqlBatch)
        .map(SqlResult::rowCount);
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
    final var params = new ArrayTuple(4);
    params.addValue(apartment.buildingId());
    params.addValue(apartment.number());
    params.addValue(apartment.name());
    params.addValue(apartment.aliquot());

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
        .createdAt(SqlUtil.getValue(row, "created_at", Row::getLocalDateTime))
        .updatedAt(SqlUtil.getValue(row, "updated_at", Row::getLocalDateTime))
        .build();
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

    return mySqlService.request(EXISTS, Tuple.of(buildingId, number))
        .map(RowSet::iterator)
        .map(RowIterator::hasNext);
  }

  
  public Uni<Optional<Apartment>> read(String buildingId, String number) {

    return mySqlService.request(SELECT_FULL_ONE, Tuple.of(buildingId, number, 1))
        .map(rowSet -> SqlUtil.toOptional(rowSet, this::from));
  }

  private Tuple updateTuple(Apartment apartment) {
    final var params = new ArrayTuple(4);
    params.addValue(apartment.name());
    params.addValue(apartment.aliquot());
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

  
  public Uni<Integer> insert(Collection<Apartment> apartments) {

    final var tuples = apartments.stream()
        .map(this::tuple)
        .toList();

    final var apartmentBatch = MySqlQueryRequest.batch(INSERT_IGNORE, tuples);
    final var emailBatch = emailRepository.replace(apartments);

    return mySqlService.transaction(TrxMode.PARALLEL, List.of(apartmentBatch, emailBatch))
        .map(list -> list.stream().mapToInt(SqlResult::rowCount).sum());
  }

  
  public Uni<List<ExtraCharge.Apt>> aptByBuildings(String buildingId) {
    return mySqlService.request(SELECT_MINIMAL_BY_BUILDING, Tuple.of(buildingId))
        .map(rowSet -> SqlUtil.toList(rowSet, row -> ExtraCharge.Apt.builder()
            .number(row.getString("number"))
            .name(row.getString("name"))
            .build()));
  }
}