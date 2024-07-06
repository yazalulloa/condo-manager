package com.yaz.persistence.repository.turso;

import com.yaz.core.util.SqlUtil;
import com.yaz.core.util.StringUtil;
import com.yaz.persistence.domain.query.ApartmentQuery;
import com.yaz.persistence.entities.Apartment;
import com.yaz.persistence.entities.ExtraCharge.Apt;
import com.yaz.persistence.repository.ApartmentRepository;
import com.yaz.persistence.repository.turso.client.TursoWsService;
import com.yaz.persistence.repository.turso.client.ws.request.Stmt;
import com.yaz.persistence.repository.turso.client.ws.request.Value;
import com.yaz.persistence.repository.turso.client.ws.response.ExecuteResp.Row;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
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
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class ApartmentTursoRepository implements ApartmentRepository {

  private static final String COLLECTION = "apartments";
  private static final String DELETE_BY_BUILDING = "DELETE FROM %s WHERE building_id = ?".formatted(COLLECTION);
  private static final String DELETE_BY_ID = "DELETE FROM %s WHERE building_id = ? AND number = ?".formatted(
      COLLECTION);
  private static final String INSERT = "INSERT INTO %s (building_id, number, name, aliquot) VALUES (%s);".formatted(
      COLLECTION, SqlUtil.params(4));
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
      SELECT apartments.*,
             GROUP_CONCAT(apartment_emails.email) AS emails
      FROM apartments
      LEFT JOIN apartment_emails ON apartments.building_id = apartment_emails.building_id AND apartments.number = apartment_emails.apt_number
      %s
      GROUP BY apartments.building_id, apartments.number
      ORDER BY apartments.building_id, apartments.number
      LIMIT ?
      """;

  private static final String UPDATE = """
      UPDATE %s SET name = ?, aliquot = ? WHERE building_id = ? AND number = ?;
      """.formatted(COLLECTION);

  private static final String QUERY_COUNT_WHERE = """
      SELECT 
      COUNT(distinct CONCAT (apartments.building_id, apartments.number)) AS query_count
      FROM apartments
      %s %s
      """;

  private static final String CURSOR_QUERY = "(apartments.building_id,apartments.number) > (?,?)";
  private static final String LIKE_QUERY = " concat(apartments.building_id, apartments.number, apartments.name, apartment_emails.email) LIKE ? ";
  private static final String EXISTS = "SELECT building_id FROM %s WHERE building_id = ? AND number = ? LIMIT 1".formatted(
      COLLECTION);

  private static final String SELECT_MINIMAL_BY_BUILDING = """
      SELECT building_id, number, name FROM %s WHERE building_id = ? ORDER BY number
      """.formatted(COLLECTION);

  private static final String SELECT_BY_BUILDING = """
      SELECT apartments.*,
             GROUP_CONCAT(apartment_emails.email) AS emails
      FROM apartments
      LEFT JOIN apartment_emails ON apartments.building_id = apartment_emails.building_id AND apartments.number = apartment_emails.apt_number
      WHERE apartments.building_id = ?
      GROUP BY apartments.building_id, apartments.number
      ORDER BY apartments.building_id, apartments.number
      """;

  private static final String INSERT_IGNORE = """
      INSERT INTO %s (building_id, number, name, aliquot)
      VALUES %s ON CONFLICT DO NOTHING;
      """;

  private static final String EMAIL_COLLECTION = "apartment_emails";
  private static final String INSERT_EMAIL = "INSERT INTO %s (building_id, apt_number, email) VALUES (%s) ON CONFLICT DO NOTHING"
      .formatted(EMAIL_COLLECTION, SqlUtil.params(3));
  private static final String INSERT_EMAIL_IGNORE = """
      INSERT INTO %s (building_id, apt_number, email)
      VALUES %s ON CONFLICT DO NOTHING;
      """;
  public static final String DELETE_EMAIL = "DELETE FROM %s WHERE building_id = ? AND apt_number = ?".formatted(
      EMAIL_COLLECTION);
  public static final String DELETE_EMAIL_BY_BUILDING = "DELETE FROM %s WHERE building_id = ?".formatted(
      EMAIL_COLLECTION);
  public static final String DELETE_EMAILS = "DELETE FROM %s WHERE building_id = ? AND apt_number = ? AND email NOT IN (%s)";

  private final TursoWsService tursoWsService;

  @Override
  public Uni<Long> count() {
    return tursoWsService.count("*", COLLECTION);
  }

  @Override
  public Uni<Integer> delete(String buildingId, String number) {

    final var values = new Value[]{Value.text(buildingId), Value.text(number)};
    final var deleteApt = Stmt.stmt(DELETE_BY_ID, values);
    final var deleteEmails = Stmt.stmt(DELETE_EMAIL, values);

    return tursoWsService.executeQueries(deleteApt, deleteEmails)
        .map(resps -> {
          int affected = 0;
          for (var resp : resps) {
            affected += resp.result().rowCount();
          }
          return affected;
        });

  }

  @Override
  public Uni<Integer> deleteByBuildingId(String buildingId) {

    final var values = new Value[]{Value.text(buildingId)};
    final var deleteApt = Stmt.stmt(DELETE_BY_BUILDING, values);
    final var deleteEmails = Stmt.stmt(DELETE_EMAIL_BY_BUILDING, values);

    return tursoWsService.executeQueries(deleteApt, deleteEmails)
        .map(resps -> {
          int affected = 0;
          for (var resp : resps) {
            affected += resp.result().rowCount();
          }
          return affected;
        });
  }

  @Override
  public Uni<Integer> insert(Apartment apartment) {

    final var stmts = new Stmt[apartment.emails().size() + 1];
    stmts[0] = Stmt.stmt(INSERT, Value.text(apartment.buildingId()), Value.text(apartment.number()),
        Value.text(apartment.name()), Value.number(apartment.aliquot()));

    int i = 1;
    for (String email : apartment.emails()) {
      stmts[i++] = Stmt.stmt(INSERT_EMAIL, Value.text(apartment.buildingId()), Value.text(apartment.number()),
          Value.text(email));
    }

    return tursoWsService.executeQueries(stmts)
        .map(SqlUtil::rowCount);
  }

  @Override
  public Uni<List<Apartment>> select(ApartmentQuery query) {
    final var buildingId = StringUtil.trimFilter(query.lastBuildingId());
    final var number = StringUtil.trimFilter(query.lastNumber());
    final var whereClause = new ArrayList<String>();

    var valuesSize = 1;
    if (buildingId != null && number != null) {
      whereClause.add(CURSOR_QUERY);
      valuesSize += 2;
    }

    final var buildings = query.buildings().stream()
        .map(StringUtil::trimFilter)
        .filter(Objects::nonNull)
        .collect(Collectors.toSet());

    if (!buildings.isEmpty()) {
      whereClause.add("apartments.building_id IN (" + SqlUtil.params(buildings.size()) + ")");
      valuesSize += buildings.size();
    }

    final var q = StringUtil.trimFilter(query.q());

    if (q != null) {
      whereClause.add(LIKE_QUERY);
      valuesSize++;
    }

    final var values = new Value[valuesSize];
    var currentIndex = 0;
    if (buildingId != null && number != null) {
      values[0] = Value.text(buildingId);
      values[1] = Value.text(number);
      currentIndex = 2;
    }

    if (!buildings.isEmpty()) {

      for (String building : buildings) {
        values[currentIndex++] = Value.text(building);
      }
    }

    if (q != null) {
      values[currentIndex++] = Value.text("%" + q + "%");
    }

    values[currentIndex] = Value.number(query.limit());

    String sql;

    final var where = whereClause.isEmpty() ? "" : "WHERE " + String.join(SqlUtil.AND, whereClause);
    if (q == null) {
      sql = SELECT_FULL.formatted(where);
    } else {
      sql = SELECT_FULL_WITH_LIKE.formatted(where);
    }

    return tursoWsService.selectQuery(Stmt.stmt(sql, values), this::from);
  }

  @Override
  public Uni<Optional<Long>> queryCount(ApartmentQuery query) {

    final var buildings = query.buildings().stream()
        .map(StringUtil::trimFilter)
        .filter(Objects::nonNull)
        .collect(Collectors.toSet());

    final var q = StringUtil.trimFilter(query.q());

    if (q != null || !buildings.isEmpty()) {

      final var i = (q != null ? 1 : 0) + buildings.size();
      final var values = new Value[i];

      final var params = new ArrayList<String>();

      if (!buildings.isEmpty()) {
        params.add("apartments.building_id IN (" + SqlUtil.params(buildings.size()) + ")");
        var j = 0;
        for (String building : buildings) {
          values[j++] = Value.text(building);
        }
      }

      if (q != null) {
        params.add(LIKE_QUERY);
        values[i - 1] = Value.text("%" + q + "%");
      }

      final var queryParams = params.isEmpty() ? "" : " WHERE " + String.join(SqlUtil.AND, params);
      var includeEmails = "";

      if (q != null) {
        includeEmails = """
             LEFT JOIN apartment_emails ON apartments.building_id = apartment_emails.building_id AND apartments.number = apartment_emails.apt_number
            """;
      }

      final var sql = QUERY_COUNT_WHERE.formatted(includeEmails, queryParams);

      return tursoWsService.count(sql, values)
          .map(Optional::of);
    }

    return Uni.createFrom().item(Optional.empty());
  }

  @Override
  public Uni<Boolean> exists(String buildingId, String number) {

    return tursoWsService.selectOne(Stmt.stmt(EXISTS, Value.text(buildingId), Value.text(number)),
            row -> row.getString("building_id") != null)
        .map(opt -> opt.orElse(false));
  }

  @Override
  public Uni<Optional<Apartment>> read(String buildingId, String number) {

    return tursoWsService.selectOne(
        Stmt.stmt(SELECT_FULL_ONE, Value.text(buildingId), Value.text(number), Value.number(1)), this::from);
  }

  @Override
  public Uni<Integer> update(Apartment apartment) {
    final var stmts = new Stmt[apartment.emails().size() + 2];
    final var buildingId = Value.text(apartment.buildingId());
    final var number = Value.text(apartment.number());
    stmts[0] = Stmt.stmt(UPDATE, Value.text(apartment.name()), Value.number(apartment.aliquot()),
        buildingId, number);

    var i = 1;
    final var emailDeleteParams = new Value[apartment.emails().size() + 2];
    emailDeleteParams[0] = buildingId;
    emailDeleteParams[1] = number;
    var j = 2;
    for (var item : apartment.emails()) {
      final var email = Value.text(item);
      emailDeleteParams[j++] = email;
      stmts[i++] = Stmt.stmt(INSERT_EMAIL, buildingId, number, email);
    }

    stmts[i] = Stmt.stmt(DELETE_EMAILS.formatted(EMAIL_COLLECTION, SqlUtil.params(apartment.emails().size())),
        emailDeleteParams);

    return tursoWsService.executeQueries(stmts)
        .map(SqlUtil::rowCount);
  }

  @Override
  public Uni<Integer> insert(Collection<Apartment> apartments) {

    var emailsSize = 0;
    final var aptValues = new Value[apartments.size() * 4];
    var aptIndex = 0;
    for (Apartment apartment : apartments) {

      aptValues[aptIndex++] = Value.text(apartment.buildingId());
      aptValues[aptIndex++] = Value.text(apartment.number());
      aptValues[aptIndex++] = Value.text(apartment.name());
      aptValues[aptIndex++] = Value.number(apartment.aliquot());

      emailsSize += apartment.emails().size();
    }

    final var emailValues = new Value[emailsSize * 3];
    var emailIndex = 0;
    for (Apartment apartment : apartments) {
      for (String email : apartment.emails()) {
        emailValues[emailIndex++] = Value.text(apartment.buildingId());
        emailValues[emailIndex++] = Value.text(apartment.number());
        emailValues[emailIndex++] = Value.text(email);
      }
    }

    final var aptParams = Stream.generate(() -> SqlUtil.params(4))
        .map("(%s)"::formatted)
        .limit(apartments.size())
        .collect(Collectors.joining(","));

    final var insertApt = Stmt.stmt(INSERT_IGNORE.formatted(COLLECTION, aptParams), aptValues);

    final var emailParams = Stream.generate(() -> SqlUtil.params(3))
        .map("(%s)"::formatted)
        .limit(emailsSize)
        .collect(Collectors.joining(","));

    final var insertEmail = Stmt.stmt(INSERT_EMAIL_IGNORE.formatted(EMAIL_COLLECTION, emailParams), emailValues);

    return tursoWsService.executeQueries(insertApt, insertEmail)
        .map(resps -> {
          int affected = 0;
          for (var resp : resps) {
            affected += resp.result().rowCount();
          }
          return affected;
        });
  }

  @Override
  public Uni<List<Apt>> aptByBuildings(String buildingId) {

    return tursoWsService.selectQuery(Stmt.stmt(SELECT_MINIMAL_BY_BUILDING, Value.text(buildingId)),
        row -> Apt.builder()
            .number(row.getString("number"))
            .name(row.getString("name"))
            .build());
  }

  @Override
  public Uni<List<Apartment>> apartmentsByBuilding(String buildingId) {
    return tursoWsService.selectQuery(Stmt.stmt(SELECT_BY_BUILDING, Value.text(buildingId)), this::from);
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
}
