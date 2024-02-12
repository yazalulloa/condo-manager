package com.yaz.persistence;

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
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import com.yaz.persistence.domain.query.BuildingQuery;
import com.yaz.persistence.domain.Currency;
import com.yaz.persistence.domain.MySqlQueryRequest;
import com.yaz.persistence.domain.query.SortOrder;
import com.yaz.persistence.entities.Building;
import com.yaz.util.SqlUtil;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class BuildingRepository {


  private static final String COLLECTION = "buildings";
  private static final String SELECT = "SELECT * FROM %s".formatted(COLLECTION);
  private static final String READ = "SELECT * FROM %s WHERE id = ?".formatted(COLLECTION);
  private static final String DELETE_BY_ID = "DELETE FROM %s WHERE id = ?".formatted(COLLECTION);
  private static final String INSERT = """
      INSERT INTO %s (id, name, rif, main_currency, debt_currency, currencies_to_show_amount_to_pay, fixed_pay, fixed_pay_amount, round_up_payments, amount_of_apts, created_at) VALUES (%s);
      """.formatted(COLLECTION, SqlUtil.params(11));

  private static final String UPDATE = """
      UPDATE %s SET name = ?, rif = ?, main_currency = ?, debt_currency = ?, currencies_to_show_amount_to_pay = ?, fixed_pay = ?, fixed_pay_amount = ?, round_up_payments = ?, updated_at = ? WHERE id = ?;
      """.formatted(COLLECTION);

  private static final String REPLACE = """
      REPLACE INTO %s (id, name, rif, main_currency, debt_currency, currencies_to_show_amount_to_pay, fixed_pay, fixed_pay_amount, round_up_payments, amount_of_apts, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
      """.formatted(COLLECTION);

  private static final String EXISTS = "SELECT id FROM %s WHERE id = ? LIMIT 1".formatted(
      COLLECTION);

  private static final String SELECT_ALL_IDS = "SELECT id FROM %s ORDER BY id".formatted(COLLECTION);

  private final MySqlService mySqlService;

  public Uni<Long> count() {
    return mySqlService.totalCount(COLLECTION);
  }

  public Uni<Integer> delete(String id) {

    return mySqlService.request(MySqlQueryRequest.normal(DELETE_BY_ID, Tuple.of(id)))
        .map(SqlResult::rowCount);
  }

  public Uni<List<Building>> select(BuildingQuery query) {
    final var stringBuilder = new StringBuilder(SELECT);

    final var lastId = query.lastId();

    final var isLastIdFilter = lastId != null && !lastId.isEmpty();
    if (isLastIdFilter) {
      final var direction = query.sortOrder() == SortOrder.DESC ? "<" : ">";
      stringBuilder.append(" WHERE id ").append(direction).append(" ?");
    }

    stringBuilder.append(" ORDER BY id ").append(query.sortOrder().name()).append(" LIMIT ?");

    var filterSize = 2;
    if (isLastIdFilter) {
      filterSize++;
    }

    final var params = new ArrayTuple(filterSize);
    if (isLastIdFilter) {
      params.addValue(lastId);
    }

    params.addValue(query.limit());

    final var queryRequest = MySqlQueryRequest.normal(stringBuilder.toString(), params);

    return mySqlService.request(queryRequest)
        .map(rows -> SqlUtil.toList(rows, this::from));
  }

  public Building from(Row row) {
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
        .amountOfApts(row.getLong("amount_of_apts"))
        .createdAt(row.getLocalDateTime("created_at"))
        .updatedAt(row.getLocalDateTime("updated_at"))
        .build();
  }

  private Tuple tuple(Building building) {
    final var params = new ArrayTuple(10);
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
    params.addValue(building.amountOfApts());
    params.addValue(building.createdAt());
    params.addValue(building.updatedAt());

    return Tuple.newInstance(params);
  }

  public Uni<RowSet<Row>> replace(Collection<Building> buildings) {

    final var tuples = buildings.stream()
        .map(this::tuple)
        .toList();

    final var mySqlBatch = MySqlQueryRequest.batch(REPLACE, tuples);

    return mySqlService.request(mySqlBatch);
  }

  public Uni<RowSet<Row>> selectAllIds() {
    return mySqlService.request(MySqlQueryRequest.normal(SELECT_ALL_IDS));
  }

  public Uni<Boolean> exists(String buildingId) {
    final var queryRequest = MySqlQueryRequest.normal(EXISTS, Tuple.of(buildingId));
    return mySqlService.request(queryRequest)
        .map(RowSet::iterator)
        .map(RowIterator::hasNext);
  }

  public Uni<Optional<Building>> read(String buildingId) {
    final var queryRequest = MySqlQueryRequest.normal(READ, Tuple.of(buildingId));
    return mySqlService.request(queryRequest)
        .map(rows -> Optional.of(rows.iterator())
            .filter(RowIterator::hasNext)
            .map(RowIterator::next)
            .map(this::from));
  }

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
    // params.addString(building.emailConfig());
    params.addValue(building.updatedAt());
    params.addValue(building.id());

    final var queryRequest = MySqlQueryRequest.normal(UPDATE, params);

    return mySqlService.request(queryRequest)
        .map(SqlResult::rowCount);
  }

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
    params.addValue(building.amountOfApts());
    params.addValue(building.createdAt());

    final var queryRequest = MySqlQueryRequest.normal(INSERT, params);

    return mySqlService.request(queryRequest)
        .map(SqlResult::rowCount);
  }
}
