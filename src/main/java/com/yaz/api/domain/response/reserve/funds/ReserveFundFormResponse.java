package com.yaz.api.domain.response.reserve.funds;

import com.yaz.api.domain.response.ExpenseCountersDto;
import com.yaz.api.domain.response.ExpenseTableItem;
import com.yaz.api.domain.response.ReserveFundCountersDto;
import com.yaz.api.domain.response.ReserveFundTableItem;
import lombok.Builder;

@Builder(toBuilder = true)
public record ReserveFundFormResponse(

    String nameFieldError,
    String fundFieldError,
    String expenseFieldError,
    String payFieldError,
    String generalFieldError,

    ReserveFundTableItem tableItem,

    ReserveFundCountersDto counters,
    ExpenseCountersDto expenseCountersDto,

    ExpenseTableItem expenseTableItem
) {

  public boolean isSuccess() {
    return nameFieldError == null && fundFieldError == null && expenseFieldError == null && payFieldError == null
        && generalFieldError == null;
  }

}
