package com.yaz.persistence.entities;

import java.math.BigDecimal;
import lombok.Builder;

@Builder
public record ReserveFund(
    String buildingId,
    String id,
    String name,
    BigDecimal fund,
    BigDecimal expense,
    BigDecimal pay,
    Boolean active,
    Type type,
    Expense.Type expenseType,
    Boolean addToExpenses
) {

  public enum Type {
    FIXED_PAY, PERCENTAGE;


    public static final Type[] VALUES = values();
  }
}
