package com.yaz.api.domain.response.debt;

import com.yaz.api.domain.response.DebtCountersDto;
import com.yaz.api.domain.response.DebtTableItem;
import lombok.Builder;

@Builder(toBuilder = true)
public record DebtFormResponse(
    String generalFieldError,
    DebtTableItem tableItem,
    DebtCountersDto counters
) {

  public boolean isSuccess() {
    return generalFieldError == null;
  }

}
