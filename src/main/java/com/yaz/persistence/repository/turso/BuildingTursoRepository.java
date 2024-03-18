package com.yaz.persistence.repository.turso;

import com.yaz.persistence.domain.Currency;
import com.yaz.persistence.domain.query.BuildingQuery;
import com.yaz.persistence.entities.Building;
import com.yaz.persistence.repository.BuildingRepository;
import com.yaz.persistence.repository.turso.client.TursoWsService;
import com.yaz.persistence.repository.turso.client.ws.request.Stmt;
import com.yaz.persistence.repository.turso.client.ws.request.Value;
import com.yaz.persistence.repository.turso.client.ws.response.ExecuteResp;
import com.yaz.util.SqlUtil;
import com.yaz.util.StringUtil;
import io.quarkus.arc.lookup.LookupIfProperty;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
////@LookupIfProperty(name = "app.repository.impl", stringValue = "turso")
//@Named("turso")
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class BuildingTursoRepository implements BuildingRepository {

  private static final String COLLECTION = "buildings";
  private static final String SELECT = """
      SELECT buildings.*, users.email as config_email, COUNT(apartments.building_id) as apt_count
      FROM buildings
      LEFT JOIN users ON buildings.email_config_id = users.id
      LEFT JOIN apartments ON buildings.id = apartments.building_id 
      %s
      GROUP BY buildings.id
      ORDER BY buildings.id
      LIMIT ?
      """;
  private static final String READ = "SELECT * FROM %s WHERE id = ?".formatted(COLLECTION);
  private static final String DELETE = "DELETE FROM %s WHERE id = ?".formatted(COLLECTION);
  private static final String INSERT = """
      INSERT INTO %s (id, name, rif, main_currency, debt_currency, currencies_to_show_amount_to_pay, fixed_pay, fixed_pay_amount, 
      round_up_payments, email_config_id) VALUES (%s);
      """.formatted(COLLECTION, SqlUtil.params(10));

  private static final String UPDATE = """
      UPDATE %s SET name = ?, rif = ?, main_currency = ?, debt_currency = ?, currencies_to_show_amount_to_pay = ?, fixed_pay = ?,
            fixed_pay_amount = ?, round_up_payments = ?, email_config_id = ? WHERE id = ?;
      """.formatted(COLLECTION);

  private static final String INSERT_IGNORE = """
      INSERT INTO %s (id, name, rif, main_currency, debt_currency, currencies_to_show_amount_to_pay, fixed_pay, fixed_pay_amount, 
      round_up_payments) VALUES %s ON CONFLICT DO NOTHING;
      """;


  private static final String EMAIL_CONFIG_DELETED = "UPDATE %s SET email_config_id = NULL WHERE id IN (%s)";

  private static final String EXISTS = "SELECT id FROM %s WHERE id = ? LIMIT 1".formatted(COLLECTION);

  private static final String SELECT_ALL_IDS = "SELECT id FROM %s ORDER BY id".formatted(COLLECTION);
  private static final String SELECT_BY_EMAIL_CONFIG = "SELECT id FROM %s WHERE email_config_id = ?".formatted(
      COLLECTION);


  private final TursoWsService tursoWsService;

  @Override
  public Uni<Long> count() {
    return tursoWsService.count("id", COLLECTION);
  }

  @Override
  public Uni<Integer> delete(String id) {

    return tursoWsService.executeQuery(DELETE, Value.text(id))
        .map(e -> e.result().rowCount());
  }

  @Override
  public Uni<List<Building>> select(BuildingQuery query) {

    final var lastId = StringUtil.trimFilter(query.lastId());
    final var values = new ArrayList<Value>();
    var whereClause = "";

    if (lastId != null) {
      whereClause = "WHERE buildings.id > ?";
      values.add(Value.text(lastId));
    }

    values.add(Value.number(query.limit()));

    final var sql = SELECT.formatted(whereClause);

    return tursoWsService.selectQuery(sql, values, this::from);
  }

  private Building from(ExecuteResp.Row row) {

    final var currenciesToShowAmountToPay = Optional.ofNullable(row.getString("currencies_to_show_amount_to_pay"))
        .map(str -> str.split(","))
        .stream()
        .flatMap(Arrays::stream)
        .map(Currency::valueOf)
        .collect(Collectors.toSet());

    return Building.builder()
        .id(row.getString("id"))
        .name(row.getString("name"))
        .rif(row.getString("rif"))
        .mainCurrency(row.getEnum("main_currency", Currency::valueOf))
        .debtCurrency(row.getEnum("debt_currency", Currency::valueOf))
        .currenciesToShowAmountToPay(currenciesToShowAmountToPay)
        .fixedPay(row.getBoolean("fixed_pay"))
        .fixedPayAmount(row.getBigDecimal("fixed_pay_amount"))
        .roundUpPayments(row.getBoolean("round_up_payments"))
        .emailConfigId(row.getString("email_config_id"))
        .createdAt(row.getLocalDateTime("created_at"))
        .updatedAt(row.getLocalDateTime("updated_at"))
        .configEmail(row.getString("config_email"))
        .aptCount(row.getLong("apt_count"))
        .build();
  }

  @Override
  public Uni<Integer> insertIgnore(Collection<Building> buildings) {

    final var values = buildings.stream().flatMap(building -> {
      return Stream.of(
          Value.text(building.id()), Value.text(building.name()),
          Value.text(building.rif()), Value.enumV(building.mainCurrency()), Value.enumV(building.debtCurrency()),
          Value.text(building.currenciesToShowAmountToPay().stream()
              .map(Enum::name)
              .collect(Collectors.joining(","))),
          Value.bool(building.fixedPay()), Value.number(building.fixedPayAmount()),
          Value.bool(building.roundUpPayments())
      );
    }).toArray(Value[]::new);

    final var params = Stream.generate(() -> SqlUtil.params(9))
        .map("(%s)"::formatted)
        .limit(buildings.size())
        .collect(Collectors.joining(","));

    return tursoWsService.executeQuery(INSERT_IGNORE.formatted(COLLECTION, params), values)
        .map(e -> e.result().rowCount());
  }

  @Override
  public Uni<List<String>> selectAllIds() {
    return tursoWsService.selectQuery(SELECT_ALL_IDS, row -> row.getString("id"));
  }

  @Override
  public Uni<Boolean> exists(String buildingId) {

    return tursoWsService.selectOne(Stmt.stmt(EXISTS, Value.text(buildingId)), row -> row.getString("id") != null)
        .map(opt -> opt.orElse(false));
  }

  @Override
  public Uni<Optional<Building>> read(String buildingId) {

    return tursoWsService.selectOne(Stmt.stmt(READ, Value.text(buildingId)), this::from);
  }

  @Override
  public Uni<Integer> update(Building building) {

    final var currenciesToShowAmountToPay = building.currenciesToShowAmountToPay().stream()
        .map(Enum::name)
        .collect(Collectors.joining(","));

    return tursoWsService.executeQuery(UPDATE, Value.text(building.name()), Value.text(building.rif()),
            Value.enumV(building.mainCurrency()), Value.enumV(building.debtCurrency()),
            Value.text(currenciesToShowAmountToPay),
            Value.bool(building.fixedPay()), Value.number(building.fixedPayAmount()),
            Value.bool(building.roundUpPayments()),
            Value.text(building.emailConfigId()), Value.text(building.id()))
        .map(e -> e.result().rowCount());

  }

  private String insertParams(Building building) {
    return Stream.of(
            building.id(),
            building.name(),
            building.rif(),
            building.mainCurrency().name(),
            building.debtCurrency().name(),
            building.currenciesToShowAmountToPay().stream()
                .map(Enum::name)
                .collect(Collectors.joining(",")),
            building.fixedPay(),
            building.fixedPayAmount(),
            building.roundUpPayments(),
            building.emailConfigId()
        )
        .map(SqlUtil::escape)
        .collect(Collectors.joining(","));
  }

  @Override
  public Uni<Integer> insert(Building building) {

    return tursoWsService.executeQuery(INSERT, Value.text(building.id()), Value.text(building.name()),
            Value.text(building.rif()), Value.enumV(building.mainCurrency()), Value.enumV(building.debtCurrency()),
            Value.text(building.currenciesToShowAmountToPay().stream()
                .map(Enum::name)
                .collect(Collectors.joining(","))),
            Value.bool(building.fixedPay()), Value.number(building.fixedPayAmount()),
            Value.bool(building.roundUpPayments()), Value.text(building.emailConfigId()))
        .map(e -> e.result().rowCount());

//    final var params = insertParams(building);
//
//    final var sql = INSERT.formatted(COLLECTION, params);
//
//    return tursoService.executeQuery(sql)
//        .map(TursoResponse::affectedRows);
  }

  @Override
  public Uni<Integer> updateEmailConfig(Set<String> ids) {
    final var values = ids.stream()
        .map(Value::text)
        .toArray(Value[]::new);

    final var sql = EMAIL_CONFIG_DELETED.formatted(COLLECTION, SqlUtil.params(ids.size()));

    return tursoWsService.executeQuery(sql, values)
        .map(e -> e.result().rowCount());
  }

  @Override
  public Uni<Set<String>> selectByEmailConfig(String id) {
    return tursoWsService.selectQuerySet(Stmt.stmt(SELECT_BY_EMAIL_CONFIG, Value.text(id)), row -> row.getString("id"));
  }
}
