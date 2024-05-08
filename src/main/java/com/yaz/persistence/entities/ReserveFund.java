package com.yaz.persistence.entities;

import com.yaz.core.util.StringUtil;
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
    return keys(0);
  }

  public Keys keys(long receiptId, String cardId) {
    return new Keys(buildingId, id, receiptId, cardId, StringUtil.objHash(this));
  }

  public Keys keys(long receiptId) {
    return keys(receiptId, cardId());
  }

  public record Keys(String buildingId,
                     String id,
                     long receiptId,
                     String cardId,
                     long hash) {

    public static Keys ofBuilding(String buildingId) {
      return new Keys(buildingId, buildingId, 0, ReserveFund.cardId(), 0);
    }

    public static Keys newReceipt(long receiptId, String buildingId) {
      return new Keys(buildingId, buildingId, receiptId, ReserveFund.cardId(), 0);
    }
  }
}
