package com.yaz.api.domain.response;

import com.yaz.persistence.domain.Currency;
import com.yaz.persistence.domain.ExpenseType;
import java.math.BigDecimal;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(fluent = true)
@Builder(toBuilder = true)
public class ExpenseFormDto {

  private final String key;
  private final boolean isEdit;
  private final boolean clearForm;
  private final String description;
  private final String descriptionFieldError;
  @Builder.Default
  private final BigDecimal amount = BigDecimal.ONE;
  private final String amountFieldError;
  @Builder.Default
  private final Currency currency = Currency.VED;
  @Builder.Default
  private final ExpenseType type = ExpenseType.COMMON;

  private final String generalError;

  private final ExpenseTableItem tableItem;

  private final ExpenseCountersDto counters;


  public boolean isSuccess() {
    return descriptionFieldError == null && amountFieldError == null && generalError == null;
  }
}
