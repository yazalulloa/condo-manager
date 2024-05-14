package com.yaz.persistence.repository.turso;

import com.yaz.core.util.SqlUtil;
import com.yaz.core.util.StringUtil;
import com.yaz.persistence.domain.Currency;
import com.yaz.persistence.entities.Debt;
import com.yaz.persistence.repository.turso.client.TursoWsService;
import com.yaz.persistence.repository.turso.client.ws.request.Stmt;
import com.yaz.persistence.repository.turso.client.ws.request.Value;
import com.yaz.persistence.repository.turso.client.ws.response.ExecuteResp.Row;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
//@LookupIfProperty(name = "app.repository.impl", stringValue = "turso")
//@Named("turso")
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class DebtRepository {

  private static final String COLLECTION = "debts";

  public static final String INSERT = """
      INSERT INTO %s (building_id, receipt_id, apt_number, receipts, amount, months, previous_payment_amount, 
      previous_payment_amount_currency) VALUES %s
      """;
//  private static final String SELECT_BY_RECEIPT = "SELECT * FROM %s WHERE building_id = ? AND receipt_id = ? ORDER BY apt_number".formatted(
//      COLLECTION);

  private static final String SELECT_BY_RECEIPT = """
      SELECT debts.*, apartments.name as apt_name FROM debts 
      LEFT JOIN apartments ON debts.apt_number = apartments.number
      WHERE debts.building_id = ? AND debts.receipt_id = ? 
      GROUP BY debts.building_id, debts.receipt_id, debts.apt_number
      ORDER BY debts.apt_number
      """.formatted(COLLECTION);

  private static final String DELETE_BY_RECEIPT = "DELETE FROM %s WHERE building_id = ? AND receipt_id = ?".formatted(
      COLLECTION);

  private static final String READ = """
      SELECT debts.*, apartments.name as apt_name 
      FROM debts
      LEFT JOIN apartments ON debts.apt_number = apartments.number
      WHERE debts.building_id = ? AND debts.receipt_id = ? AND debts.apt_number = ?
      """;

  private static final String UPDATE = """
      UPDATE %s SET receipts = ?, amount = ?, months = ?, previous_payment_amount = ?, previous_payment_amount_currency = ? 
      WHERE building_id = ? AND receipt_id = ? AND apt_number = ?
      """
      .formatted(COLLECTION);


  private final TursoWsService tursoWsService;

  Debt from(Row row) {
    final var months = Arrays.stream(row.getString("months").split(","))
        .map(StringUtil::trimFilter)
        .filter(Objects::nonNull)
        .map(Integer::parseInt)
        .collect(Collectors.toSet());
    return Debt.builder()
        .buildingId(row.getString("building_id"))
        .receiptId(row.getLong("receipt_id"))
        .aptNumber(row.getString("apt_number"))
        .aptName(row.getString("apt_name"))
        .receipts(row.getInt("receipts"))
        .amount(row.getBigDecimal("amount"))
        .months(months)
        .previousPaymentAmount(row.getBigDecimal("previous_payment_amount"))
        .previousPaymentAmountCurrency(row.getEnum("previous_payment_amount_currency", Currency::valueOf))
        .build();
  }

  public Stmt stmtSelectByReceipt(String buildingId, long receiptId) {
    return Stmt.stmt(SELECT_BY_RECEIPT, Value.text(buildingId), Value.number(receiptId));
  }


  public Stmt stmtInsert(long receiptId, Collection<Debt> debts) {

    final var values = new Value[8 * debts.size()];
    var i = 0;

    for (Debt debt : debts) {
      values[i++] = Value.text(debt.buildingId());
      values[i++] = Value.number(receiptId);
      values[i++] = Value.text(debt.aptNumber());
      values[i++] = Value.number(debt.receipts());
      values[i++] = Value.number(debt.amount());

      final var months = Optional.ofNullable(debt.months())
          .stream()
          .flatMap(Collection::stream)
          .map(String::valueOf)
          .collect(Collectors.joining(","));

      values[i++] = Value.text(months);
      values[i++] = Value.number(debt.previousPaymentAmount());
      values[i++] = Value.enumV(debt.previousPaymentAmountCurrency());
    }

    final var sql = INSERT.formatted(COLLECTION, SqlUtil.valuesParams(8, debts.size()));

    return Stmt.stmt(sql, values);
  }

  public Uni<List<Debt>> readByReceipt(String buildingId, long receiptId) {
    return tursoWsService.selectQuery(stmtSelectByReceipt(buildingId, receiptId), this::from);
  }

  public Uni<Optional<Debt>> read(String buildingId, long receiptId, String aptNumber) {
    return tursoWsService.selectOne(
        Stmt.stmt(READ, Value.text(buildingId), Value.number(receiptId), Value.text(aptNumber)), this::from);
  }

  public Uni<Integer> update(Debt debt) {

    return tursoWsService.executeQuery(
            Stmt.stmt(UPDATE,
                Value.number(debt.receipts()),
                Value.number(debt.amount()),
                Value.text(debt.months().stream().map(String::valueOf).collect(Collectors.joining(","))),
                Value.number(debt.previousPaymentAmount()),
                Value.enumV(debt.previousPaymentAmountCurrency()),
                Value.text(debt.buildingId()),
                Value.number(debt.receiptId()),
                Value.text(debt.aptNumber())))
        .map(executeResp -> executeResp.result().rowCount());
  }

  public Stmt stmtDeleteByReceipt(String buildingId, long receiptId) {
    return Stmt.stmt(DELETE_BY_RECEIPT, Value.text(buildingId), Value.number(receiptId));
  }

  public Uni<Integer> deleteByReceipt(String buildingId, long receiptId) {
    return tursoWsService.executeQuery(stmtDeleteByReceipt(buildingId, receiptId))
        .map(executeResp -> executeResp.result().rowCount());
  }
}
