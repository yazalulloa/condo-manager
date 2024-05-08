package com.yaz.api.domain.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.yaz.persistence.domain.ExpenseType;
import com.yaz.persistence.domain.ReserveFundType;
import java.math.BigDecimal;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.Accessors;
import lombok.extern.jackson.Jacksonized;

@Jacksonized
@Builder(toBuilder = true)
@Data
@Accessors(fluent = true)
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class ReserveFundFormDto {

  private final boolean isEdit;
  private final boolean clearForm;
  private final String key;
  private final String name;
  private final String nameFieldError;
  @Builder.Default
  private final BigDecimal fund = BigDecimal.ZERO;
  private final String fundFieldError;
  @Builder.Default
  private final BigDecimal expense = BigDecimal.ZERO;
  private final String expenseFieldError;
  @Builder.Default
  private final BigDecimal pay = BigDecimal.ONE;
  private final String payFieldError;
  @Builder.Default
  private final boolean active = true;
  @Builder.Default
  private final ReserveFundType type = ReserveFundType.PERCENTAGE;
  @Builder.Default
  private final ExpenseType expenseType = ExpenseType.COMMON;
  @Builder.Default
  private final boolean addToExpenses = true;

  private final String generalError;


  private final ReserveFundTableItem tableItem;
  private final ReserveFundCountersDto counters;

  public boolean isSuccess() {
    return nameFieldError == null && fundFieldError == null && expenseFieldError == null && payFieldError == null && generalError == null;
  }
}
