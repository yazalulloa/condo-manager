package com.yaz.persistence.repository.turso;

import com.yaz.core.client.turso.response.TursoResponse;
import com.yaz.core.client.turso.response.TursoResponse.Row;
import com.yaz.persistence.domain.query.ApartmentQuery;
import com.yaz.persistence.entities.Apartment;
import com.yaz.persistence.entities.ExtraCharge.Apt;
import com.yaz.persistence.repository.ApartmentRepository;
import com.yaz.persistence.repository.turso.client.TursoService;
import com.yaz.persistence.repository.turso.client.TursoWsService;
import com.yaz.core.util.SqlUtil;
import com.yaz.core.util.StringUtil;
import io.smallrye.mutiny.Uni;
import jakarta.inject.Inject;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
////@LookupIfProperty(name = "app.repository.impl", stringValue = "turso")
//@Named("turso")
//@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class OldApartmentTursoRepository implements ApartmentRepository {

  private static final String COLLECTION = "apartments";
  private static final String DELETE_BY_BUILDING = "DELETE FROM %s WHERE building_id = ?".formatted(COLLECTION);
  private static final String DELETE_BY_ID = "DELETE FROM %s WHERE building_id = ? AND number = ?";
  private static final String INSERT = "INSERT INTO %s (building_id, number, name, aliquot) VALUES %s";
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
      LIMIT %s;
      """;

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
      LIMIT %s;
            """;

  private static final String UPDATE = "UPDATE %s SET name = %s, aliquot = %s WHERE building_id = %s AND number = %s";

  private static final String QUERY_COUNT_WHERE = """
      SELECT COUNT(*) AS query_count
      FROM apartments
      %s 
      %s;
      """;

  private static final String COUNT_JOIN = "INNER JOIN apartment_emails ON apartments.building_id = apartment_emails.building_id AND apartments.number = apartment_emails.apt_number";

  private static final String CURSOR_QUERY = "(apartments.building_id,apartments.number) > (%s,%s)";
  private static final String LIKE_QUERY = " concat(apartments.building_id, apartments.number, apartments.name, apartment_emails.email) LIKE %s ";
  private static final String EXISTS = "SELECT building_id,number FROM %s WHERE building_id = %s AND number = %s LIMIT 1";
  private static final String SELECT_MINIMAL_BY_BUILDING = "SELECT building_id, number, name FROM %s WHERE building_id = %s ORDER BY number LIMIT 1";

  private static final String INSERT_EMAIL = "INSERT INTO apartment_emails (building_id, apt_number, email) VALUES %s ON CONFLICT DO NOTHING";
  public static final String DELETE_EMAIL = "DELETE FROM apartment_emails WHERE building_id = %s AND apt_number = %s";
  public static final String DELETE_EMAIL_BY_BUILDING = "DELETE FROM apartment_emails WHERE building_id = %s";
  public static final String DELETE_EMAILS = "DELETE FROM apartment_emails WHERE building_id = %s AND apt_number = %s AND email NOT IN (%s)";

  private final TursoService tursoService;
  private final TursoWsService tursoWsService;

  @Override
  public Uni<Long> count() {
    return tursoWsService.count("*", COLLECTION);
  }

  @Override
  public Uni<Integer> delete(String buildingId, String number) {

    final var deleteApt = DELETE_BY_ID.formatted(COLLECTION, SqlUtil.escape(buildingId), SqlUtil.escape(number));
    final var deleteEmail = DELETE_EMAIL.formatted(SqlUtil.escape(buildingId), SqlUtil.escape(number));

    return tursoService.executeQueries(List.of(deleteApt, deleteEmail))
        .map(TursoResponse::affectedRows);
  }

  @Override
  public Uni<Integer> deleteByBuildingId(String buildingId) {
    final var deleteApt = DELETE_BY_BUILDING.formatted(COLLECTION, SqlUtil.escape(buildingId));
    final var deleteEmail = DELETE_EMAIL_BY_BUILDING.formatted(SqlUtil.escape(buildingId));
    return tursoService.executeQueries(List.of(deleteApt, deleteEmail))
        .map(TursoResponse::affectedRows);
  }

  @Override
  public Uni<Integer> insert(Apartment apartment) {
    final var queries = new ArrayList<String>(apartment.emails().size() + 1);
    final var sql = INSERT.formatted(COLLECTION, "(%s)".formatted(aptParams(apartment)));
    queries.add(sql);

    final var emailParams = apartment.emails()
        .stream()
        .map(email -> String.join(",", SqlUtil.escape(apartment.buildingId()), SqlUtil.escape(apartment.number()),
            SqlUtil.escape(email)))
        .map("(%s)"::formatted)
        .collect(Collectors.joining(","));

    queries.add(INSERT_EMAIL.formatted(emailParams));

    return tursoService.executeQueries(queries)
        .map(TursoResponse::affectedRows);
  }

  private String aptParams(Apartment apartment) {
    return Stream.of(
            apartment.buildingId(),
            apartment.number(),
            apartment.name(),
            apartment.aliquot()
        ).map(SqlUtil::escape)
        .collect(Collectors.joining(","));
  }

  @Override
  public Uni<List<Apartment>> select(ApartmentQuery query) {
    final var lastBuildingId = StringUtil.trimFilter(query.lastBuildingId());
    final var lastNumber = StringUtil.trimFilter(query.lastNumber());

    final var buildings = query.buildings().stream()
        .map(StringUtil::trimFilter)
        .filter(Objects::nonNull)
        .map(SqlUtil::escape)
        .collect(Collectors.toSet());

    final var q = StringUtil.trimFilter(query.q());
    final var whereClause = new ArrayList<String>();

    var cursorQuery = "";

    if (lastBuildingId != null && lastNumber != null) {
      cursorQuery = CURSOR_QUERY.formatted(SqlUtil.escape(lastBuildingId), SqlUtil.escape(lastNumber));
      whereClause.add(cursorQuery);
    }

    if (q != null) {
      whereClause.add(LIKE_QUERY.formatted(SqlUtil.escape("%" + q + "%")));
    }

    if (!buildings.isEmpty()) {
      whereClause.add("apartments.building_id IN (%s)".formatted(String.join(",", buildings)));
    }

    String sql;

    if (whereClause.isEmpty()) {
      sql = SELECT_FULL.formatted("", query.limit());
    } else {
      final var queryParams = " WHERE " + String.join(SqlUtil.AND, whereClause);
      sql = SELECT_FULL_WITH_LIKE.formatted(queryParams, query.limit());
    }

    return tursoService.executeQuery(sql)
        .map(TursoResponse::values)
        .map(result -> SqlUtil.toList(result, this::from));
  }

  @Override
  public Uni<Optional<Long>> queryCount(ApartmentQuery query) {
    final var buildings = query.buildings().stream()
        .map(StringUtil::trimFilter)
        .filter(Objects::nonNull)
        .map(SqlUtil::escape)
        .collect(Collectors.toSet());

    final var q = StringUtil.trimFilter(query.q());

    if (q != null || !buildings.isEmpty()) {
      final var whereClause = new ArrayList<String>();

      if (q != null) {
        whereClause.add(LIKE_QUERY.formatted(SqlUtil.escape("%" + q + "%")));
      }

      if (!buildings.isEmpty()) {
        whereClause.add("apartments.building_id IN (%s)".formatted(String.join(",", buildings)));
      }

      final var queryParams = " WHERE " + String.join(SqlUtil.AND, whereClause);

      final var sql = QUERY_COUNT_WHERE.formatted(q != null ? COUNT_JOIN : "", queryParams);

      return tursoService.executeQuery(sql)
          .map(TursoResponse::result)
          .map(result -> result.firstRow().map(row -> row.getLong("query_count"))
              .orElseThrow(() -> new RuntimeException("No count found")))
          .map(Optional::of);
    }

    return Uni.createFrom().item(Optional.empty());
  }

  @Override
  public Uni<Boolean> exists(String buildingId, String number) {
    final var sql = EXISTS.formatted(COLLECTION, SqlUtil.escape(buildingId), SqlUtil.escape(number));
    return tursoService.executeQuery(sql)
        .map(TursoResponse::result)
        .map(result -> result.firstRow().isPresent());
  }

  @Override
  public Uni<Optional<Apartment>> read(String buildingId, String number) {
    final var whereClause = " WHERE apartments.building_id = %s AND apartments.number = %s ".formatted(
        SqlUtil.escape(buildingId), SqlUtil.escape(number));
    final var sql = SELECT_FULL.formatted(whereClause, 1);

    return tursoService.executeQuery(sql)
        .map(TursoResponse::result)
        .map(result -> result.one(this::from));

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

  @Override
  public Uni<Integer> update(Apartment apartment) {

    final var updateApt = UPDATE.formatted(COLLECTION, SqlUtil.escape(apartment.name()),
        SqlUtil.escape(apartment.aliquot()),
        SqlUtil.escape(apartment.buildingId()), SqlUtil.escape(apartment.number()));

    final var emailParams = apartment.emails()
        .stream()
        .map(email -> String.join(",", SqlUtil.escape(apartment.buildingId()), SqlUtil.escape(apartment.number()),
            SqlUtil.escape(email)))
        .map("(%s)"::formatted)
        .collect(Collectors.joining(","));

    final var insertEmails = INSERT_EMAIL.formatted(emailParams);

    final var newEmails = apartment.emails().stream()
        .map(SqlUtil::escape)
        .collect(Collectors.joining(","));

    final var deleteEmails = DELETE_EMAILS.formatted(SqlUtil.escape(apartment.buildingId()),
        SqlUtil.escape(apartment.number()), newEmails);

    return tursoService.executeQueries(List.of(updateApt, insertEmails, deleteEmails))
        .map(TursoResponse::affectedRows);
  }

  @Override
  public Uni<Integer> insert(Collection<Apartment> apartments) {

    final var params = apartments.stream()
        .map(this::aptParams)
        .map("(%s)"::formatted)
        .collect(Collectors.joining(","));

    final var insertApt = INSERT.formatted(COLLECTION, params) + " ON CONFLICT DO NOTHING";

    final var emailParams = apartments.stream()
        .flatMap(apartment -> {

          return apartment.emails().stream()
              .map(email -> String.join(",", SqlUtil.escape(apartment.buildingId()), SqlUtil.escape(apartment.number()),
                  SqlUtil.escape(email)));
        })
        .map("(%s)"::formatted)
        .collect(Collectors.joining(","));

    final var insertEmail = INSERT_EMAIL.formatted(emailParams);

    return tursoService.executeQueries(List.of(insertApt, insertEmail))
        .map(TursoResponse::affectedRows);
  }

  @Override
  public Uni<List<Apt>> aptByBuildings(String buildingId) {
    final var sql = SELECT_MINIMAL_BY_BUILDING.formatted(COLLECTION, SqlUtil.escape(buildingId));
    return tursoService.executeQuery(sql)
        .map(TursoResponse::values)
        .map(result -> SqlUtil.toList(result, this::fromApt));
  }

  @Override
  public Uni<List<Apartment>> apartmentsByBuilding(String buildingId) {
    return null;
  }

  private Apt fromApt(Row row) {
    return Apt.builder()
        .number(row.getString("number"))
        .name(row.getString("name"))
        .build();
  }
}
