package com.yaz.persistence.repository.turso;

import com.yaz.persistence.domain.Currency;
import com.yaz.persistence.domain.ExpenseType;
import com.yaz.persistence.entities.Expense;
import com.yaz.persistence.repository.turso.client.ws.request.Stmt;
import com.yaz.persistence.repository.turso.client.ws.request.Value;
import com.yaz.persistence.repository.turso.client.ws.response.ExecuteResp.Row;
import com.yaz.util.SqlUtil;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
//@LookupIfProperty(name = "app.repository.impl", stringValue = "turso")
//@Named("turso")
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class ExpenseRepository {

  private static final String COLLECTION = "expenses";

  private static final String SELECT_BY_RECEIPT = "SELECT * FROM %s WHERE building_id = ? AND receipt_id = ? ORDER BY id".formatted(
      COLLECTION);

  private static final String DELETE_BY_RECEIPT = "DELETE FROM %s WHERE building_id = ? AND receipt_id = ?".formatted(
      COLLECTION);

  private static final String INSERT = """
      INSERT INTO %s (building_id, receipt_id, description, amount, currency, reserve_fund, type) VALUES %s
      """;


  public Stmt stmtSelectByReceipt(String buildingId, String receiptId) {
    return Stmt.stmt(SELECT_BY_RECEIPT, Value.text(buildingId), Value.text(receiptId));
  }

  public Stmt stmtDeleteByReceipt(String buildingId, long receiptId) {
    return Stmt.stmt(DELETE_BY_RECEIPT, Value.text(buildingId), Value.number(receiptId));
  }

  public Stmt stmtInsert(long receiptId, Expense expense) {
    return stmtInsert(receiptId, Collections.singletonList(expense));
  }

  public Stmt stmtInsert(long receiptId, List<Expense> expenses) {
    final var values = new Value[7 * expenses.size()];

    var i = 0;
    for (Expense expense : expenses) {
      values[i++] = Value.text(expense.buildingId());
      values[i++] = Value.number(receiptId);
      values[i++] = Value.text(expense.description());
      values[i++] = Value.number(expense.amount());
      values[i++] = Value.enumV(expense.currency());
      values[i++] = Value.bool(expense.reserveFund());
      values[i++] = Value.enumV(expense.type());
    }

    final var params = Stream.generate(() -> SqlUtil.params(7))
        .limit(expenses.size())
        .map("(%s)"::formatted)
        .collect(Collectors.joining(", "));

    final var sql = INSERT.formatted(COLLECTION, params);
    return Stmt.stmt(sql, values);
  }


  Expense from(Row row) {
    return Expense.builder()
        .buildingId(row.getString("building_id"))
        .receiptId(row.getLong("receipt_id"))
        .id(row.getLong("id"))
        .description(row.getString("description"))
        .amount(row.getBigDecimal("amount"))
        .currency(row.getEnum("currency", Currency::valueOf))
        .reserveFund(row.getBoolean("reserve_fund"))
        .type(row.getEnum("type", ExpenseType::valueOf))
        .build();
  }
}
