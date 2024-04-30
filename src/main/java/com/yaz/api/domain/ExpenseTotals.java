package com.yaz.api.domain;

import com.yaz.persistence.domain.Currency;
import java.math.BigDecimal;
import lombok.Builder;

@Builder

public record ExpenseTotals(
    Total unCommon,
    Total common
) {

  public String formatCommon() {
    return common.currency.format(common.amount);
  }

  public String formatUnCommon() {
    return unCommon.currency.format(unCommon.amount);
  }

  public record Total(
      BigDecimal amount,
      Currency currency
  ) {

  }

}
