package com.yaz.persistence.entities;

import com.yaz.persistence.domain.ExpenseType;
import com.yaz.persistence.domain.ReserveFundType;
import java.math.BigDecimal;
import java.util.UUID;
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

  private static final String CARD_ID_PREFIX = "reserve-fund-item-id-";

  private static String cardId() {
    return CARD_ID_PREFIX + UUID.randomUUID();
  }

  public Keys keys() {
    return new Keys(buildingId, id, 0, cardId());
  }

  public record Keys(String buildingId,
                     String id,
                     long receiptId,
                     String cardId) {

    public static Keys ofBuilding(String buildingId) {
      return new Keys(buildingId, buildingId, 0, ReserveFund.cardId());
    }

    public static Keys newReceipt(long receiptId, String buildingId) {
      return new Keys(buildingId, buildingId, receiptId, ReserveFund.cardId());
    }
  }
}
