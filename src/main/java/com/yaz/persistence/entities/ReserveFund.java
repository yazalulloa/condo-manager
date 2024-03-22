package com.yaz.persistence.entities;

import com.yaz.persistence.domain.ExpenseType;
import com.yaz.persistence.domain.ReserveFundType;
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
    ReserveFundType type,
    ExpenseType expenseType,
    Boolean addToExpenses
) {

  public Keys keys() {
    return new Keys(buildingId, id);
  }

  public record Keys(String buildingId,
                     String id) {

  }
}
