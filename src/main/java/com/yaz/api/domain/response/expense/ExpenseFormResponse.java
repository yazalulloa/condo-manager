package com.yaz.api.domain.response.expense;

import com.yaz.api.domain.response.ExpenseCountersDto;
import com.yaz.api.domain.response.ExpenseTableItem;
import lombok.Builder;

@Builder(toBuilder = true)
public record ExpenseFormResponse(
    String descriptionFieldError,
    String amountFieldError,
    String generalFieldError,

    ExpenseTableItem tableItem,
    ExpenseCountersDto counters
) {

  public boolean isSuccess() {
    return descriptionFieldError == null && amountFieldError == null && generalFieldError == null;
  }

}
