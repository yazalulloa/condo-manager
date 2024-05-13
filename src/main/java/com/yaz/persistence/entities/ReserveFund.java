package com.yaz.persistence.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.yaz.core.util.StringUtil;
import com.yaz.persistence.domain.ExpenseType;
import com.yaz.persistence.domain.ReserveFundType;
import java.math.BigDecimal;
import java.util.UUID;
import lombok.Builder;

@Builder(toBuilder = true)
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record ReserveFund(
    String buildingId,
    long id,
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
                     long id,
                     long receiptId,
                     String cardId,
                     long hash) {

    public static Keys ofBuilding(String buildingId) {
      return new Keys(buildingId, 0, 0, ReserveFund.cardId(), 0);
    }

    public static Keys newReceipt(long receiptId, String buildingId) {
      return new Keys(buildingId, 0, receiptId, ReserveFund.cardId(), 0);
    }
  }
}
