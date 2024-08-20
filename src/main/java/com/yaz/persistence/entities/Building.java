package com.yaz.persistence.entities;


import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.yaz.core.util.StringUtil;
import com.yaz.persistence.domain.Currency;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;
import lombok.Builder;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@Builder(toBuilder = true)
public record Building(
    String id,
    String name,
    String rif,
    Currency mainCurrency,
    Currency debtCurrency,
    Set<Currency> currenciesToShowAmountToPay,
    boolean fixedPay,
    BigDecimal fixedPayAmount,
    Boolean roundUpPayments,
    String emailConfigId,
    LocalDateTime createdAt,
    LocalDateTime updatedAt,
    String configEmail,
    Long aptCount) {

  public Keys keys() {
    return new Keys(id, 0);
  }

  public Keys keysWithHash() {
    final var building = this.toBuilder()
        .createdAt(null)
        .updatedAt(null)
        .aptCount(null)
        .configEmail(null)
        .build();
    return new Keys(id, StringUtil.objHash(building));
  }

  public record Keys(String id, long hash) {

  }
}
