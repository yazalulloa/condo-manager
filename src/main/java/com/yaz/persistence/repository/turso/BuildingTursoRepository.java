package com.yaz.persistence.repository.turso;

import com.yaz.client.turso.response.TursoResponse;
import com.yaz.persistence.domain.Currency;
import com.yaz.persistence.domain.query.BuildingQuery;
import com.yaz.persistence.entities.Building;
import com.yaz.persistence.repository.BuildingRepository;
import com.yaz.util.SqlUtil;
import com.yaz.util.StringUtil;
import io.quarkus.arc.lookup.LookupIfProperty;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
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
@LookupIfProperty(name = "app.repository.impl", stringValue = "turso")
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
      LIMIT %s
      """;
  private static final String READ = "SELECT * FROM %s WHERE id = %s";
  private static final String DELETE = "DELETE FROM %s WHERE id = %s";
  private static final String INSERT = """
      INSERT INTO %s (id, name, rif, main_currency, debt_currency, currencies_to_show_amount_to_pay, fixed_pay, fixed_pay_amount, 
      round_up_payments, email_config_id) VALUES (%s);
      """;

  private static final String UPDATE = """
      UPDATE %s SET name = %s, rif = %s, main_currency = %s, debt_currency = %s, currencies_to_show_amount_to_pay = %s, fixed_pay = %s,
            fixed_pay_amount = %s, round_up_payments = %s, email_config_id = %s WHERE id = %s;
      """;

  private static final String INSERT_IGNORE = """
      INSERT INTO %s (id, name, rif, main_currency, debt_currency, currencies_to_show_amount_to_pay, fixed_pay, fixed_pay_amount, 
      round_up_payments) VALUES %s ON CONFLICT DO NOTHING;
      """;


  private static final String EMAIL_CONFIG_DELETED = "UPDATE %s SET email_config_id = NULL WHERE id IN (%s)";

  private static final String EXISTS = "SELECT id FROM %s WHERE id = %s LIMIT 1";

  private static final String SELECT_ALL_IDS = "SELECT id FROM %s ORDER BY id".formatted(COLLECTION);
  private static final String SELECT_BY_EMAIL_CONFIG = "SELECT id FROM %s WHERE email_config_id = %s";

  private final TursoService tursoService;

  @Override
  public Uni<Long> count() {
    return tursoService.count("id", COLLECTION);
  }

  @Override
  public Uni<Integer> delete(String id) {
    final var sql = DELETE.formatted(COLLECTION, SqlUtil.escape(id));
    return tursoService.executeQuery(sql)
        .map(TursoResponse::affectedRows);
  }

  private String selectQuery(BuildingQuery query) {
    final var lastId = StringUtil.trimFilter(query.lastId());
    if (lastId == null) {
      return SELECT.formatted("", query.limit());
    } else {
      return SELECT.formatted("WHERE buildings.id > " + SqlUtil.escape(lastId), query.limit());
    }
  }

  @Override
  public Uni<List<Building>> select(BuildingQuery query) {

    return tursoService.executeQuery(selectQuery(query))
        .map(TursoResponse::result)
        .map(result -> SqlUtil.toList(result.rows(), this::from));
  }

  private Building from(TursoResponse.Row row) {

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
    final var values = buildings.stream()
        .map(building -> Stream.of(
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
                building.roundUpPayments()
            )
            .map(SqlUtil::escape)
            .collect(Collectors.joining(",")))
        .map("(%s)"::formatted)
        .collect(Collectors.joining(","));
    final var sql = INSERT_IGNORE.formatted(COLLECTION, values);

    return tursoService.executeQuery(sql)
        .map(TursoResponse::affectedRows);
  }

  @Override
  public Uni<List<String>> selectAllIds() {
    return tursoService.executeQuery(SELECT_ALL_IDS)
        .map(TursoResponse::result)
        .map(result -> result.rows().stream()
            .map(row -> row.getString("id"))
            .toList());
  }

  @Override
  public Uni<Boolean> exists(String buildingId) {
    return tursoService.executeQuery(EXISTS.formatted(COLLECTION, SqlUtil.escape(buildingId)))
        .map(TursoResponse::result)
        .map(result -> !result.rows().isEmpty());
  }

  @Override
  public Uni<Optional<Building>> read(String buildingId) {

    return tursoService.executeQuery(READ.formatted(COLLECTION, SqlUtil.escape(buildingId)))
        .map(TursoResponse::result)
        .map(result -> result.one(this::from));
  }

  @Override
  public Uni<Integer> update(Building building) {

    final var sql = UPDATE.formatted(
        COLLECTION,
        SqlUtil.escape(building.name()),
        SqlUtil.escape(building.rif()),
        SqlUtil.escape(building.mainCurrency().name()),
        SqlUtil.escape(building.debtCurrency().name()),
        SqlUtil.escape(building.currenciesToShowAmountToPay().stream()
            .map(Enum::name)
            .collect(Collectors.joining(","))),
        building.fixedPay(),
        building.fixedPayAmount(),
        building.roundUpPayments(),
        SqlUtil.escape(building.emailConfigId()),
        SqlUtil.escape(building.id())
    );

    return tursoService.executeQuery(sql)
        .map(TursoResponse::affectedRows);
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

    final var params = insertParams(building);

    final var sql = INSERT.formatted(COLLECTION, params);

    return tursoService.executeQuery(sql)
        .map(TursoResponse::affectedRows);
  }

  @Override
  public Uni<Integer> updateEmailConfig(Set<String> ids) {
    final var values = ids.stream().map(SqlUtil::escape)
        .collect(Collectors.joining(","));

    final var sql = EMAIL_CONFIG_DELETED.formatted(COLLECTION, values);

    return tursoService.executeQuery(sql)
        .map(TursoResponse::affectedRows);
  }

  @Override
  public Uni<Set<String>> selectByEmailConfig(String id) {

    return tursoService.executeQuery(SELECT_BY_EMAIL_CONFIG.formatted(COLLECTION, SqlUtil.escape(id)))
        .map(TursoResponse::result)
        .map(result -> result.rows().stream()
            .map(row -> row.getString("id"))
            .collect(Collectors.toSet()));
  }
}
