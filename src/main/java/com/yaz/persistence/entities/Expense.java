package com.yaz.persistence.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.yaz.persistence.domain.Currency;
import com.yaz.persistence.domain.ExpenseType;
import java.math.BigDecimal;
import java.util.UUID;
import lombok.Builder;
import lombok.extern.jackson.Jacksonized;

@Builder(toBuilder = true)
@Jacksonized
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@JsonInclude(JsonInclude.Include.NON_NULL)
public record Expense(
    String buildingId,
    long receiptId,
    long id,
    String description,
    BigDecimal amount,
    Currency currency,
    boolean reserveFund,
    ExpenseType type
) {

  private static final String CARD_ID_PREFIX = "expense-card-id-";

  private static String cardId() {
    return CARD_ID_PREFIX + UUID.randomUUID();
  }

  public Keys keys(long rateId) {
    return new Keys(buildingId, receiptId, id, rateId, cardId());
  }

  public record Keys(
      String buildingId,
      long receiptId,
      long id,
      long rateId,
      String cardId) {

    public static Keys of(String buildingId, long receiptId, long rateId) {
      return new Keys(buildingId, receiptId, 0, rateId, Expense.cardId());
    }
  }
}
