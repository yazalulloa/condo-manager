package com.yaz.api.domain.response;

import com.yaz.persistence.domain.Currency;
import java.math.BigDecimal;
import java.util.Collections;
import java.util.Set;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(fluent = true)
@Builder(toBuilder = true)
public class DebtFormDto {

  private final String key;
  private final boolean isEdit;
  private final boolean clearForm;
  private final boolean isUpdate;
  
  private final String apt;
  private final int receipts;
  private final String receiptsFieldError;
  @Builder.Default
  private final BigDecimal amount = BigDecimal.ZERO;
  @Builder.Default
  private final Set<Integer> months = Collections.emptySet();
  private final BigDecimal previousPaymentAmount;
  private final Currency previousPaymentAmountCurrency;

  private final String generalError;

  private final DebtTableItem tableItem;

  private final DebtCountersDto counters;

  public boolean isSuccess() {
    return receiptsFieldError == null && generalError == null;
  }
}
