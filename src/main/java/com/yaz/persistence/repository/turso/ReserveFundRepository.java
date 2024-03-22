package com.yaz.persistence.repository.turso;

import com.yaz.persistence.entities.Expense;
import com.yaz.persistence.entities.ReserveFund;
import com.yaz.persistence.repository.turso.client.TursoWsService;
import com.yaz.persistence.repository.turso.client.ws.request.Stmt;
import com.yaz.persistence.repository.turso.client.ws.request.Value;
import com.yaz.persistence.repository.turso.client.ws.response.ExecuteResp.Row;
import com.yaz.util.SqlUtil;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
//@LookupIfProperty(name = "app.repository.impl", stringValue = "turso")
//@Named("turso")
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class ReserveFundRepository {

  private static final String COLLECTION = "reserve_funds";

  private static final String SELECT_BY_BUILDING = "SELECT * FROM %s WHERE building_id = ? ORDER BY id".formatted(
      COLLECTION);
  private static final String INSERT = """
      INSERT INTO %s (building_id, id, name, fund, expense, pay, active, type, expense_type, add_to_expenses) VALUES (%s)
      """.formatted(COLLECTION, SqlUtil.params(10));

  private static final String UPDATE = """
      UPDATE %s SET name = ?, fund = ?, expense = ?, pay = ?, active = ?, type = ?, expense_type = ?, add_to_expenses = ? 
      WHERE building_id = ? AND id = ?
      """.formatted(COLLECTION);

  private static final String DELETE = "DELETE FROM %s WHERE building_id = ? AND id = ?".formatted(COLLECTION);
  private static final String DELETE_BY_BUILDING = "DELETE FROM %s WHERE building_id = ?".formatted(COLLECTION);

  private final TursoWsService tursoWsService;


  public Uni<Long> count() {
    return tursoWsService.count("id", COLLECTION);
  }

  public Uni<Integer> delete(String buildingId, String id) {
    return tursoWsService.executeQuery(Stmt.stmt(DELETE, Value.text(buildingId), Value.text(id)))
        .map(executeResp -> executeResp.result().rowCount());
  }

  public Uni<Integer> deleteByBuilding(String buildingId) {
    return tursoWsService.executeQuery(Stmt.stmt(DELETE_BY_BUILDING, Value.text(buildingId)))
        .map(executeResp -> executeResp.result().rowCount());
  }

  public Uni<Integer> insert(ReserveFund reserveFund) {
    return tursoWsService.executeQuery(INSERT, Value.text(reserveFund.buildingId()), Value.text(reserveFund.id()),
            Value.text(reserveFund.name()), Value.number(reserveFund.fund()), Value.number(reserveFund.expense()),
            Value.number(reserveFund.pay()), Value.bool(reserveFund.active()), Value.enumV(reserveFund.type()),
            Value.enumV(reserveFund.expenseType()), Value.bool(reserveFund.addToExpenses()))
        .map(executeResp -> executeResp.result().rowCount());
  }

  public Uni<Integer> update(ReserveFund reserveFund) {
    return tursoWsService.executeQuery(UPDATE, Value.text(reserveFund.name()), Value.number(reserveFund.fund()),
            Value.number(reserveFund.expense()), Value.number(reserveFund.pay()), Value.bool(reserveFund.active()),
            Value.enumV(reserveFund.type()), Value.enumV(reserveFund.expenseType()),
            Value.bool(reserveFund.addToExpenses()), Value.text(reserveFund.buildingId()), Value.text(reserveFund.id()))
        .map(executeResp -> executeResp.result().rowCount());
  }

  public Uni<List<ReserveFund>> selectByBuilding(String buildingId) {
    return tursoWsService.selectQuery(Stmt.stmt(SELECT_BY_BUILDING, Value.text(buildingId)), this::from);
  }

  private ReserveFund from(Row row) {
    return ReserveFund.builder()
        .buildingId(row.getString("building_id"))
        .id(row.getString("id"))
        .name(row.getString("name"))
        .fund(row.getBigDecimal("fund"))
        .expense(row.getBigDecimal("expense"))
        .pay(row.getBigDecimal("pay"))
        .active(row.getBoolean("active"))
        .type(row.getEnum("type", ReserveFund.Type::valueOf))
        .expenseType(row.getEnum("expense_type", Expense.Type::valueOf))
        .addToExpenses(row.getBoolean("add_to_expenses"))
        .build();
  }

}
