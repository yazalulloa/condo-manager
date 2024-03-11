package com.yaz.persistence.repository.mysql;

import com.yaz.persistence.domain.Currency;
import com.yaz.persistence.domain.MySqlQueryRequest;
import com.yaz.persistence.domain.query.BuildingQuery;
import com.yaz.persistence.domain.query.SortOrder;
import com.yaz.persistence.entities.Building;
import com.yaz.persistence.repository.BuildingRepository;
import com.yaz.util.SqlUtil;
import io.quarkus.arc.lookup.LookupIfProperty;
import io.smallrye.mutiny.Uni;
import io.vertx.mutiny.sqlclient.Row;
import io.vertx.mutiny.sqlclient.RowIterator;
import io.vertx.mutiny.sqlclient.RowSet;
import io.vertx.mutiny.sqlclient.SqlResult;
import io.vertx.mutiny.sqlclient.Tuple;
import io.vertx.sqlclient.impl.ArrayTuple;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@LookupIfProperty(name = "app.repository.impl", stringValue = "mysql")
//@Named("mysql")
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class BuildingMySqlRepository implements BuildingRepository {

  private static final String COLLECTION = "buildings";
  private static final String SELECT = """
      SELECT buildings.*, BIN_TO_UUID(email_config_id) as email_config, users.email as config_email, COUNT(apartments.building_id) as apt_count
      FROM buildings
      LEFT JOIN users ON buildings.email_config_id = users.id
      LEFT JOIN apartments ON buildings.id = apartments.building_id 
      GROUP BY buildings.id
      """;
  private static final String READ = """
      SELECT *, BIN_TO_UUID(email_config_id) as email_config FROM %s WHERE id = ?
      """.formatted(COLLECTION);
  private static final String DELETE_BY_ID = "DELETE FROM %s WHERE id = ?".formatted(COLLECTION);
  private static final String INSERT = """
      INSERT INTO %s (id, name, rif, main_currency, debt_currency, currencies_to_show_amount_to_pay, fixed_pay, fixed_pay_amount, 
      round_up_payments, email_config_id) VALUES (%s, UUID_TO_BIN(?));
      """.formatted(COLLECTION, SqlUtil.params(9));

  private static final String UPDATE = """
      UPDATE %s SET name = ?, rif = ?, main_currency = ?, debt_currency = ?, currencies_to_show_amount_to_pay = ?, fixed_pay = ?,
            fixed_pay_amount = ?, round_up_payments = ?, email_config_id = UUID_TO_BIN(?) WHERE id = ?;
      """.formatted(COLLECTION);

  private static final String INSERT_IGNORE = """
      INSERT IGNORE INTO %s (id, name, rif, main_currency, debt_currency, currencies_to_show_amount_to_pay, fixed_pay, fixed_pay_amount, 
      round_up_payments) VALUES (%s);
      """.formatted(COLLECTION, SqlUtil.params(9));


  private static final String EMAIL_CONFIG_DELETED = "UPDATE %s SET email_config_id = NULL WHERE id = ?".formatted(
      COLLECTION);

  private static final String EXISTS = "SELECT id FROM %s WHERE id = ? LIMIT 1".formatted(
      COLLECTION);

  private static final String SELECT_ALL_IDS = "SELECT id FROM %s ORDER BY id".formatted(COLLECTION);
  private static final String SELECT_BY_EMAIL_CONFIG = "SELECT id FROM %s WHERE email_config_id = UUID_TO_BIN(?)".formatted(COLLECTION);

  private final MySqlService mySqlService;

  @Override
  public Uni<Long> count() {
    return mySqlService.totalCount(COLLECTION);
  }

  @Override
  public Uni<Integer> delete(String id) {

    return mySqlService.request(DELETE_BY_ID, Tuple.of(id))
        .map(SqlResult::rowCount);
  }

  @Override
  public Uni<List<Building>> select(BuildingQuery query) {
    final var stringBuilder = new StringBuilder(SELECT);

    final var lastId = query.lastId();

    final var isLastIdFilter = lastId != null && !lastId.isEmpty();
    if (isLastIdFilter) {
      final var direction = query.sortOrder() == SortOrder.DESC ? "<" : ">";
      stringBuilder.append(" WHERE id ").append(direction).append(" ?");
    }

    stringBuilder.append(" ORDER BY buildings.id ").append(query.sortOrder().name()).append(" LIMIT ?");

    var filterSize = 2;
    if (isLastIdFilter) {
      filterSize++;
    }

    final var params = new ArrayTuple(filterSize);
    if (isLastIdFilter) {
      params.addValue(lastId);
    }

    params.addValue(query.limit());

    return mySqlService.request(stringBuilder.toString(), params)
        .map(rows -> SqlUtil.toList(rows, this::from));
  }

  private Building from(Row row) {
    final var currenciesToShowAmountToPay = Arrays.stream(row.getString("currencies_to_show_amount_to_pay").split(","))
        .map(Currency::valueOf)
        .collect(Collectors.toSet());

    return Building.builder()
        .id(row.getString("id"))
        .name(row.getString("name"))
        .rif(row.getString("rif"))
        .mainCurrency(Optional.ofNullable(row.getString("main_currency")).map(Currency::valueOf).orElse(null))
        .debtCurrency(Optional.ofNullable(row.getString("debt_currency")).map(Currency::valueOf).orElse(null))
        .currenciesToShowAmountToPay(currenciesToShowAmountToPay)
        .fixedPay(row.getBoolean("fixed_pay"))
        .fixedPayAmount(row.getBigDecimal("fixed_pay_amount"))
        .roundUpPayments(row.getBoolean("round_up_payments"))
        .createdAt(SqlUtil.getValue(row, "created_at", Row::getLocalDateTime))
        .updatedAt(SqlUtil.getValue(row, "updated_at", Row::getLocalDateTime))
        .emailConfigId(SqlUtil.getValue(row, "email_config", Row::getString))
        .configEmail(SqlUtil.getValue(row, "config_email", Row::getString))
        .aptCount(SqlUtil.getValue(row, "apt_count", Row::getLong))
        .build();
  }

  @Override
  public Uni<Integer> insertIgnore(Collection<Building> buildings) {

    final var tuples = buildings.stream()
        .map(building -> {
          final var params = new ArrayTuple(9);
          params.addValue(building.id());
          params.addValue(building.name());
          params.addValue(building.rif());
          params.addValue(building.mainCurrency().name());
          params.addValue(building.debtCurrency().name());
          final var currenciesToShowAmountToPay = building.currenciesToShowAmountToPay().stream()
              .map(Enum::name)
              .collect(Collectors.joining(","));
          params.addValue(currenciesToShowAmountToPay);
          params.addValue(building.fixedPay());
          params.addValue(building.fixedPayAmount());
          params.addValue(building.roundUpPayments());

          return Tuple.newInstance(params);
        })
        .toList();

    final var mySqlBatch = MySqlQueryRequest.batch(INSERT_IGNORE, tuples);

    return mySqlService.request(mySqlBatch)
        .map(SqlResult::rowCount);
  }

  @Override
  public Uni<List<String>> selectAllIds() {
    return mySqlService.request(SELECT_ALL_IDS)
        .map(rows -> SqlUtil.toList(rows, row -> row.getString("id")));
  }

  @Override
  public Uni<Boolean> exists(String buildingId) {

    return mySqlService.request(EXISTS, Tuple.of(buildingId))
        .map(RowSet::iterator)
        .map(RowIterator::hasNext);
  }

  @Override
  public Uni<Optional<Building>> read(String buildingId) {

    return mySqlService.request(READ, Tuple.of(buildingId))
        .map(rows -> Optional.of(rows.iterator())
            .filter(RowIterator::hasNext)
            .map(RowIterator::next)
            .map(this::from));
  }

  @Override
  public Uni<Integer> update(Building building) {

    final var params = new ArrayTuple(10);
    params.addValue(building.name());
    params.addValue(building.rif());
    params.addValue(building.mainCurrency().name());
    params.addValue(building.debtCurrency().name());
    final var currenciesToShowAmountToPay = building.currenciesToShowAmountToPay().stream()
        .map(Enum::name)
        .collect(Collectors.joining(","));
    params.addValue(currenciesToShowAmountToPay);
    params.addValue(building.fixedPay());
    params.addValue(building.fixedPayAmount());
    params.addValue(building.roundUpPayments());
    params.addString(building.emailConfigId());
    params.addValue(building.id());

    return mySqlService.request(UPDATE, params)
        .map(SqlResult::rowCount);
  }

  @Override
  public Uni<Integer> insert(Building building) {

    final var params = new ArrayTuple(11);

    params.addValue(building.id());
    params.addValue(building.name());
    params.addValue(building.rif());
    params.addValue(building.mainCurrency().name());
    params.addValue(building.debtCurrency().name());
    final var currenciesToShowAmountToPay = building.currenciesToShowAmountToPay().stream()
        .map(Enum::name)
        .collect(Collectors.joining(","));
    params.addValue(currenciesToShowAmountToPay);
    params.addValue(building.fixedPay());
    params.addValue(building.fixedPayAmount());
    params.addValue(building.roundUpPayments());
    params.addString(building.emailConfigId());

    return mySqlService.request(INSERT, params)
        .map(SqlResult::rowCount);
  }

  @Override
  public Uni<Integer> updateEmailConfig(Set<String> ids) {
    return mySqlService.request(MySqlQueryRequest.batch(EMAIL_CONFIG_DELETED, ids.stream().map(Tuple::of).toList()))
        .map(SqlResult::rowCount);
  }

  @Override
  public Uni<Set<String>> selectByEmailConfig(String id) {

    return mySqlService.request(SELECT_BY_EMAIL_CONFIG, Tuple.of(id))
        .map(rows -> SqlUtil.toList(rows, row -> row.getString("id")))
        .map(Set::copyOf);
  }
}
