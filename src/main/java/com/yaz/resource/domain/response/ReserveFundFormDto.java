package com.yaz.resource.domain.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.yaz.persistence.domain.ExpenseType;
import com.yaz.persistence.domain.ReserveFundType;
import java.math.BigDecimal;
import lombok.Builder;
import lombok.Data;
import lombok.extern.jackson.Jacksonized;

@Jacksonized
@Builder(toBuilder = true)
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class ReserveFundFormDto {

  private final boolean isEdit;
  private final boolean clearForm;
  private final String key;
  private final String cardId;
  private final String name;
  private final String nameFieldError;
  private final BigDecimal fund;
  private final String fundFieldError;
  private final BigDecimal expense;
  private final String expenseFieldError;
  private final BigDecimal pay;
  private final String payFieldError;
  @Builder.Default
  private final boolean active = true;
  @Builder.Default
  private final ReserveFundType type = ReserveFundType.PERCENTAGE;
  @Builder.Default
  private final ExpenseType expenseType = ExpenseType.COMMON;
  @Builder.Default
  private final boolean addToExpenses = true;


  private final ReserveFundTableItem tableItem;

  public boolean isSuccess() {
    return nameFieldError == null && fundFieldError == null && expenseFieldError == null && payFieldError == null;
  }
}
