package com.yaz.persistence.repository.turso;

import com.yaz.core.util.SqlUtil;
import com.yaz.persistence.domain.Currency;
import com.yaz.persistence.entities.ExtraCharge;
import com.yaz.persistence.entities.ExtraCharge.Apt;
import com.yaz.persistence.repository.AppSqlConfig;
import com.yaz.persistence.repository.turso.client.TursoWsService;
import com.yaz.persistence.repository.turso.client.ws.request.NamedArg;
import com.yaz.persistence.repository.turso.client.ws.request.Stmt;
import com.yaz.persistence.repository.turso.client.ws.request.Value;
import com.yaz.persistence.repository.turso.client.ws.response.ExecuteResp.Row;
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
                                       extra_charges.parent_reference = extra_charges_apartments.parent_reference AND
                                       extra_charges.id = extra_charges_apartments.id
               LEFT JOIN apartments ON extra_charges_apartments.building_id = apartments.building_id AND
                                       extra_charges_apartments.apt_number = apartments.number
      %s
      GROUP BY extra_charges.building_id, extra_charges.parent_reference, extra_charges.id
      ORDER BY extra_charges.building_id, extra_charges.parent_reference, extra_charges.id;
      """;
  private static final String DELETE = "DELETE FROM %s WHERE id = ?".formatted(
      COLLECTION);
  private static final String READ = """
      SELECT extra_charges.*, GROUP_CONCAT(extra_charges_apartments.apt_number || '%s' || apartments.name, '%s') as apt_numbers
          FROM extra_charges
                   LEFT JOIN extra_charges_apartments ON extra_charges.building_id = extra_charges_apartments.building_id AND
                                           extra_charges.parent_reference = extra_charges_apartments.parent_reference AND
                                           extra_charges.id = extra_charges_apartments.id
                   LEFT JOIN apartments ON extra_charges_apartments.building_id = apartments.building_id AND
                                           extra_charges_apartments.apt_number = apartments.number
      WHERE extra_charges.building_id = ? AND extra_charges.parent_reference = ? AND extra_charges.id = ?
          GROUP BY extra_charges.building_id, extra_charges.parent_reference, extra_charges.id
          ORDER BY extra_charges.building_id, extra_charges.parent_reference, extra_charges.id;
      """;
  private static final String INSERT = """
      INSERT INTO %s (parent_reference, building_id, type, description, amount, currency, active)
      VALUES (%s) returning id
      """.formatted(COLLECTION, SqlUtil.params(7));

  private static final String INSERT_BULK = """
      INSERT INTO %s (parent_reference, id, type, description, amount, currency, active)
      VALUES %s
      """;
//  private static final String UPDATE = """
//      UPDATE %s SET description = ?, amount = ?, currency = ?, active = ? WHERE parent_reference = ? AND id = ?
//      """.formatted(COLLECTION);

  private static final String UPDATE = """
      UPDATE %s SET description = :description, amount = :amount, currency = :currency, active = :active 
      WHERE parent_reference = :parent_reference AND id = :id
      """.formatted(COLLECTION);

  private static final String DELETE_BY = "DELETE FROM %s WHERE building_id = ? AND parent_reference = ?".formatted(
      COLLECTION);
  private static final String COLLECTION_APT = "extra_charges_apartments";
  private static final String INSERT_APT = """
      INSERT INTO %s (parent_reference, building_id, id, apt_number) VALUES %s ON CONFLICT DO NOTHING;
      """;
  private static final String INSERT_APT_IGNORE = """
      INSERT INTO %s (parent_reference, building_id, id, apt_number) VALUES %s ON CONFLICT DO NOTHING;
      """;

  private static final String DELETE_APT_WHERE = """
       DELETE FROM %s WHERE parent_reference = ? AND building_id = ? AND id = ? AND apt_number NOT IN (
      """.formatted(COLLECTION_APT);

  private static final String DELETE_APT = "DELETE FROM %s WHERE parent_reference = ? AND building_id = ? AND  id = ?".formatted(
      COLLECTION_APT);

  private static final String DELETE_APT_BY = "DELETE FROM %s WHERE building_id = ? AND parent_reference = ?".formatted(
      COLLECTION_APT);

  private static final String COUNT_BY = "SELECT COUNT(id) AS query_count FROM %s WHERE building_id = ? AND parent_reference = ?".formatted(
      COLLECTION);

  private final TursoWsService tursoWsService;

  @Inject
  AppSqlConfig sqlConfig;


  public Uni<Long> count() {
    return tursoWsService.count("id", COLLECTION);
  }

  private ExtraCharge from(Row row) {

    final var apartments = apartments(row);

    return ExtraCharge.builder()
        .parentReference(row.getString("parent_reference"))
        .buildingId(row.getString("building_id"))
        .id(row.getLong("id"))
        .type(row.getEnum("type", ExtraCharge.Type::valueOf))
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

  public Uni<Optional<ExtraCharge>> read(String buildingId, String parentReference, long id) {
    final var query = READ.formatted(sqlConfig.separator().column(), sqlConfig.separator().row());
    final var stmt = Stmt.stmt(query, Value.text(buildingId), Value.text(parentReference), Value.number(id));
    return tursoWsService.selectOne(stmt, this::from);
  }

  public Uni<List<ExtraCharge>> select(String buildingId, String parentReference) {

    final var query = SELECT.formatted(sqlConfig.separator().column(), sqlConfig.separator().row(),
        "WHERE extra_charges.building_id = ? AND extra_charges.parent_reference = ?");

    return tursoWsService.selectQuery(Stmt.stmt(query, Value.text(buildingId), Value.text(parentReference)),
        this::from);
  }

  public Uni<Integer> delete(String parentReference, String buildingId, long id) {

    return tursoWsService.executeQueries(
            Stmt.stmt(DELETE, Value.number(id)),
            Stmt.stmt(DELETE_APT, Value.text(parentReference), Value.text(buildingId), Value.number(id)))
        .map(resps -> {
          int affected = 0;
          for (var resp : resps) {
            affected += resp.result().rowCount();
          }
          return affected;
        });
  }

  public record InsertResult(long id, int count) {

  }

  public Uni<InsertResult> insert(ExtraCharge extraCharge, Set<String> apartments) {

    final var insertStmt = Stmt.stmt(INSERT, Value.text(extraCharge.parentReference()),
        Value.text(extraCharge.buildingId()),
        Value.enumV(extraCharge.type()), Value.text(extraCharge.description()),
        Value.number(extraCharge.amount()), Value.enumV(extraCharge.currency()), Value.bool(extraCharge.active()));

    return tursoWsService.selectOne(insertStmt, row -> row.getLong("id"))
        .map(opt -> opt.orElseThrow(() -> new IllegalStateException("Insert failed")))
        .flatMap(id -> {
          final var aptValues = new Value[apartments.size() * 4];

          var i = 0;
          for (var apartment : apartments) {
            aptValues[i++] = Value.text(extraCharge.parentReference());
            aptValues[i++] = Value.text(extraCharge.buildingId());
            aptValues[i++] = Value.number(id);
            aptValues[i++] = Value.text(apartment);
          }

          final var aptValuesParam = Stream.generate(() -> SqlUtil.params(4))
              .map("(%s)"::formatted)
              .limit(apartments.size())
              .collect(Collectors.joining(","));

          final var stmt = Stmt.stmt(INSERT_APT.formatted(COLLECTION_APT, aptValuesParam), aptValues);
          return tursoWsService.executeQuery(stmt)
              .map(executeResp -> executeResp.result().rowCount() + 1)
              .map(count -> new InsertResult(id, count));
        });
  }


  public Uni<Integer> update(ExtraCharge extraCharge) {

    final var apartments = extraCharge.apartments();
    var i = 0;
    final var stmts = new Stmt[apartments.isEmpty() ? 2 : 3];

    stmts[i++] = Stmt.stmt(UPDATE,
        NamedArg.text("description", extraCharge.description()),
        NamedArg.number("amount", extraCharge.amount()),
        NamedArg.enumV("currency", extraCharge.currency()),
        NamedArg.bool("active", extraCharge.active()),
        NamedArg.text("parent_reference", extraCharge.parentReference()),
        NamedArg.number("id", extraCharge.id()));

    if (apartments.isEmpty()) {

      stmts[i] = Stmt.stmt(DELETE_APT, Value.text(extraCharge.parentReference()), Value.number(extraCharge.id()));

    } else {
      final var deleteAptValues = new Value[apartments.size() + 3];
      deleteAptValues[0] = Value.text(extraCharge.parentReference());
      deleteAptValues[1] = Value.text(extraCharge.buildingId());
      deleteAptValues[2] = Value.number(extraCharge.id());

      final var insertAptValues = new Value[apartments.size() * 4];
      var insertAptIndex = 0;
      var deleteAptIndex = 3;
      for (var apartment : apartments) {
        insertAptValues[insertAptIndex++] = Value.text(extraCharge.parentReference());
        insertAptValues[insertAptIndex++] = Value.text(extraCharge.buildingId());
        insertAptValues[insertAptIndex++] = Value.number(extraCharge.id());
        insertAptValues[insertAptIndex++] = Value.text(apartment.number());

        deleteAptValues[deleteAptIndex++] = Value.text(apartment.number());
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
    return tursoWsService.executeQueries(stmtDeleteByReceipt(id, id))
        .map(SqlUtil::rowCount);
  }

  public Stmt[] stmtDeleteByReceipt(String buildingId, String parentReference) {
    final var values = new Value[]{Value.text(buildingId), Value.text(parentReference)};
    final var delete = Stmt.stmt(DELETE_BY, values);
    final var deleteApt = Stmt.stmt(DELETE_APT_BY, values);

    return new Stmt[]{delete, deleteApt};
  }

  public Uni<Integer> deleteByReceipt(String buildingId, String parentReference) {
    final var stmts = stmtDeleteByReceipt(buildingId, parentReference);
    return tursoWsService.executeQueries(stmts)
        .map(SqlUtil::rowCount);
  }

  public Uni<Long> count(String buildingId, String parentReference) {
    return tursoWsService.count(COUNT_BY, Value.text(buildingId), Value.text(parentReference));
  }

  public Uni<Integer> deleteByApartment(String buildingId, String aptNumber) {
    return tursoWsService.executeQuery(
        Stmt.stmt("DELETE FROM %s WHERE building_id = ? AND apt_number = ?".formatted(COLLECTION_APT),
            Value.text(buildingId), Value.text(aptNumber))
    ).map(executeResp -> executeResp.result().rowCount());
  }

}
