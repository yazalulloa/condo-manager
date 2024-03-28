package com.yaz.persistence.repository.turso;

import com.yaz.persistence.domain.Currency;
import com.yaz.persistence.domain.request.ExtraChargeUpdateRequest;
import com.yaz.persistence.entities.ExtraCharge;
import com.yaz.persistence.entities.ExtraCharge.Apt;
import com.yaz.persistence.repository.AppSqlConfig;
import com.yaz.persistence.repository.turso.client.TursoWsService;
import com.yaz.persistence.repository.turso.client.ws.request.Stmt;
import com.yaz.persistence.repository.turso.client.ws.request.Value;
import com.yaz.persistence.repository.turso.client.ws.response.ExecuteResp.Row;
import com.yaz.util.SqlUtil;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class ExtraChargeRepository {

  private static final String COLLECTION = "extra_charges";
  private static final String SELECT = """
      SELECT extra_charges.*, GROUP_CONCAT(extra_charges_apartments.apt_number || '%s' || apartments.name, '%s') as apt_numbers
      FROM extra_charges
               LEFT JOIN extra_charges_apartments ON extra_charges.building_id = extra_charges_apartments.building_id AND
                                       extra_charges.secondary_id = extra_charges_apartments.secondary_id AND
                                       extra_charges.id = extra_charges_apartments.id
               LEFT JOIN apartments ON extra_charges_apartments.building_id = apartments.building_id AND
                                       extra_charges_apartments.apt_number = apartments.number
      %s
      GROUP BY extra_charges.building_id, extra_charges.secondary_id, extra_charges.id
      ORDER BY extra_charges.building_id, extra_charges.secondary_id, extra_charges.id;
      """;
  private static final String DELETE = "DELETE FROM %s WHERE building_id = ? AND secondary_id = ? AND  id = ?".formatted(
      COLLECTION);
  private static final String READ = """
      SELECT extra_charges.*, GROUP_CONCAT(extra_charges_apartments.apt_number || '%s' || apartments.name, '%s') as apt_numbers
          FROM extra_charges
                   LEFT JOIN extra_charges_apartments ON extra_charges.building_id = extra_charges_apartments.building_id AND
                                           extra_charges.secondary_id = extra_charges_apartments.secondary_id AND
                                           extra_charges.id = extra_charges_apartments.id
                   LEFT JOIN apartments ON extra_charges_apartments.building_id = apartments.building_id AND
                                           extra_charges_apartments.apt_number = apartments.number
      WHERE extra_charges.building_id = ? AND extra_charges.secondary_id = ? AND extra_charges.id = ?
          GROUP BY extra_charges.building_id, extra_charges.secondary_id, extra_charges.id
          ORDER BY extra_charges.building_id, extra_charges.secondary_id, extra_charges.id;
      """;
  private static final String INSERT = """
      INSERT INTO %s (building_id, secondary_id,  type, description, amount, currency, active)
      VALUES (%s) returning id
      """.formatted(COLLECTION, SqlUtil.params(7));

  private static final String INSERT_BULK = """
      INSERT INTO %s (building_id, secondary_id, id, type, description, amount, currency, active)
      VALUES %s
      """;
  private static final String UPDATE = """
      UPDATE %s SET description = ?, amount = ?, currency = ?, active = ? WHERE building_id = ? AND secondary_id = ? AND id = ?
      """.formatted(COLLECTION);

  private static final String DELETE_BY_BUILDING = "DELETE FROM %s WHERE building_id = ? AND secondary_id = ?".formatted(
      COLLECTION);
  private static final String COLLECTION_APT = "extra_charges_apartments";
  private static final String INSERT_APT = """
      INSERT INTO %s (building_id, secondary_id, id, apt_number) VALUES %s ON CONFLICT DO NOTHING;
      """;
  private static final String INSERT_APT_IGNORE = """
      INSERT INTO %s (building_id, secondary_id, id, apt_number) VALUES %s ON CONFLICT DO NOTHING;
      """;

  private static final String DELETE_APT_WHERE = """
       DELETE FROM %s WHERE building_id = ? AND secondary_id = ? AND id = ? AND apt_number NOT IN (
      """.formatted(COLLECTION_APT);

  private static final String DELETE_APT = "DELETE FROM %s WHERE building_id = ? AND secondary_id = ? AND  id = ?".formatted(
      COLLECTION_APT);

  private static final String DELETE_APT_BY_BUILDING = "DELETE FROM %s WHERE building_id = ? AND secondary_id = ?".formatted(
      COLLECTION_APT);

  private final TursoWsService tursoWsService;

  @Inject
  AppSqlConfig sqlConfig;


  public Uni<Long> count() {
    return tursoWsService.count("user_id", COLLECTION);
  }

  private ExtraCharge from(Row row) {

    final var apartments = apartments(row);

    return ExtraCharge.builder()
        .buildingId(row.getString("building_id"))
        .secondaryId(row.getString("secondary_id"))
        .id(row.getLong("id"))
        .description(row.getString("description"))
        .amount(row.getDouble("amount"))
        .currency(row.getEnum("currency", Currency::valueOf))
        .active(row.getBoolean("active"))
        .apartments(apartments)
        .build();
  }

  private List<Apt> apartments(Row row) {

    final var aptNumbers = row.getString("apt_numbers");
    if (aptNumbers == null || aptNumbers.isEmpty()) {
      return Collections.emptyList();
    }

    final var columnSeparator = Pattern.quote(sqlConfig.separator().column());
    final var rowSeparator = Pattern.quote(sqlConfig.separator().row());

    final var rowSplit = aptNumbers.split(rowSeparator);
    final var apts = new ArrayList<Apt>(rowSplit.length);
    for (String rowStr : rowSplit) {
      final var columnSplit = rowStr.split(columnSeparator);
      final Apt apt;
      if (columnSplit.length < 2) {
        apt = Apt.builder().number(columnSplit[0]).build();
      } else {
        apt = Apt.builder().number(columnSplit[0]).name(columnSplit[1]).build();
      }
      apts.add(apt);


    }

    return apts;
  }

  public Uni<Optional<ExtraCharge>> read(String buildingId, String secondaryId, long id) {
    final var query = READ.formatted(sqlConfig.separator().column(), sqlConfig.separator().row());

    return tursoWsService.selectOne(Stmt.stmt(query, Value.text(buildingId), Value.text(secondaryId), Value.number(id)),
        this::from);
  }

  public Uni<List<ExtraCharge>> select(String buildingId, String secondaryId) {

    final var query = SELECT.formatted(sqlConfig.separator().column(), sqlConfig.separator().row(),
        "WHERE extra_charges.building_id = ? AND extra_charges.secondary_id = ?");

    return tursoWsService.selectQuery(Stmt.stmt(query, Value.text(buildingId), Value.text(secondaryId)), this::from);
  }

  public Uni<Integer> delete(String buildingId, String secondaryId, long id) {

    final var values = new Value[]{Value.text(buildingId), Value.text(secondaryId),
        Value.number(id)};
    final var deleteStm = Stmt.stmt(DELETE, values);
    final var deleteApts = Stmt.stmt(DELETE_APT, values);

    return tursoWsService.executeQueries(deleteStm, deleteApts)
        .map(resps -> {
          int affected = 0;
          for (var resp : resps) {
            affected += resp.result().rowCount();
          }
          return affected;
        });
  }

  public Uni<Integer> insert(ExtraCharge extraCharge, Set<String> apartments) {

    final var insertStmt = Stmt.stmt(INSERT, Value.text(extraCharge.buildingId()),
        Value.text(extraCharge.secondaryId()), Value.enumV(extraCharge.type()), Value.text(extraCharge.description()),
        Value.number(extraCharge.amount()),
        Value.enumV(extraCharge.currency()), Value.bool(extraCharge.active()));

    return tursoWsService.selectOne(insertStmt, row -> row.getLong("id"))
        .map(opt -> opt.orElseThrow(() -> new IllegalStateException("Insert failed")))
        .map(id -> {
          final var aptValues = new Value[apartments.size() * 4];

          var i = 0;
          for (var apartment : apartments) {
            aptValues[i++] = Value.text(extraCharge.buildingId());
            aptValues[i++] = Value.text(extraCharge.secondaryId());
            aptValues[i++] = Value.number(id);
            aptValues[i++] = Value.text(apartment);
          }

          final var aptValuesParam = Stream.generate(() -> SqlUtil.params(4))
              .map("(%s)"::formatted)
              .limit(apartments.size())
              .collect(Collectors.joining(","));

          return Stmt.stmt(INSERT_APT.formatted(COLLECTION_APT, aptValuesParam), aptValues);
        })
        .flatMap(tursoWsService::executeQuery)
        .map(executeResp -> executeResp.result().rowCount() + 1);
  }


  public Uni<Integer> update(ExtraChargeUpdateRequest updateRequest) {

    final var apartments = updateRequest.apartments();
    var i = 0;
    final var stmts = new Stmt[apartments.isEmpty() ? 2 : 3];

    stmts[i++] = Stmt.stmt(UPDATE, Value.text(updateRequest.description()),
        Value.number(updateRequest.amount()),
        Value.enumV(updateRequest.currency()), Value.bool(updateRequest.active()),
        Value.text(updateRequest.buildingId()),
        Value.text(updateRequest.secondaryId()), Value.number(updateRequest.id()));

    if (apartments.isEmpty()) {

      stmts[i] = Stmt.stmt(DELETE_APT, Value.text(updateRequest.buildingId()),
          Value.text(updateRequest.secondaryId()), Value.number(updateRequest.id()));

    } else {
      final var deleteAptValues = new Value[apartments.size() + 3];
      deleteAptValues[0] = Value.text(updateRequest.buildingId());
      deleteAptValues[1] = Value.text(updateRequest.secondaryId());
      deleteAptValues[2] = Value.number(updateRequest.id());

      final var insertAptValues = new Value[apartments.size() * 4];
      var insertAptIndex = 0;
      var deleteAptIndex = 3;
      for (var apartment : apartments) {
        insertAptValues[insertAptIndex++] = Value.text(updateRequest.buildingId());
        insertAptValues[insertAptIndex++] = Value.text(updateRequest.secondaryId());
        insertAptValues[insertAptIndex++] = Value.number(updateRequest.id());
        insertAptValues[insertAptIndex++] = Value.text(apartment);

        deleteAptValues[deleteAptIndex++] = Value.text(apartment);
      }

      final var params = Stream.generate(() -> SqlUtil.params(4))
          .map("(%s)"::formatted)
          .limit(apartments.size())
          .collect(Collectors.joining(","));

      stmts[i++] = Stmt.stmt(INSERT_APT_IGNORE.formatted(COLLECTION_APT, params), insertAptValues);
      stmts[i] = Stmt.stmt(DELETE_APT_WHERE + SqlUtil.params(apartments.size()) + ")", deleteAptValues);

    }

    return tursoWsService.executeQueries(stmts)
        .map(SqlUtil::rowCount);
  }

  public Uni<Integer> deleteByBuilding(String id) {
    final var value = Value.text(id);
    final var values = new Value[]{value, value};
    final var delete = Stmt.stmt(DELETE_BY_BUILDING, values);
    final var deleteApt = Stmt.stmt(DELETE_APT_BY_BUILDING, values);

    return tursoWsService.executeQueries(delete, deleteApt)
        .map(SqlUtil::rowCount);
  }

  public Stmt[] stmtDeleteByReceipt(String buildingId, String secondaryId) {
    final var values = new Value[]{Value.text(buildingId), Value.text(secondaryId)};
    final var delete = Stmt.stmt(DELETE_BY_BUILDING, values);
    final var deleteApt = Stmt.stmt(DELETE_APT_BY_BUILDING, values);

    return new Stmt[]{delete, deleteApt};
  }
}
