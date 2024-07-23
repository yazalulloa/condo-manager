package com.yaz.persistence.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.yaz.core.util.StringUtil;
import com.yaz.persistence.domain.Currency;
import java.math.BigDecimal;
import java.util.Set;
import java.util.UUID;
import lombok.Builder;
import lombok.extern.jackson.Jacksonized;

@Builder(toBuilder = true)
@Jacksonized
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@JsonInclude(JsonInclude.Include.NON_NULL)
public record Debt(
    String buildingId,
    long receiptId,
    String aptNumber,
    String aptName,
    int receipts,
    BigDecimal amount,
    Set<Integer> months,
    BigDecimal previousPaymentAmount,
    Currency previousPaymentAmountCurrency
) {


  private static final String CARD_ID_PREFIX = "debt-card-id-";

  private static String cardId() {
    return CARD_ID_PREFIX + UUID.randomUUID();
  }

  public Keys keys(String cardId) {
    final var debt = this.toBuilder()
        .aptName(null)
        .build();
    return new Keys(buildingId, receiptId, aptNumber, cardId, StringUtil.objHash(debt));
  }

  public Keys keys() {
    return keys(cardId());
  }

  public record Keys(
      String buildingId,
      long receiptId,
      String aptNumber,
      String cardId,
      long hash
  ) {

  }

}
