package com.yaz.persistence.entities;

import com.yaz.persistence.domain.Currency;
import java.math.BigDecimal;
import lombok.Builder;

@Builder
public record Expense(
    String description,
    BigDecimal amount,
    Currency currency,
    Boolean reserveFund,
    Type type
) {

  public enum Type {
    COMMON, UNCOMMON;

    public static final Type[] VALUES = values();
  }
}
