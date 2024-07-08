package com.yaz.api.domain.response.receipt;

import com.yaz.api.domain.response.ExpenseCountersDto;
import lombok.Builder;

@Builder(toBuilder = true)
public record ReceiptFormResponse(
    String generalFieldError,
    boolean isError,
    ExpenseCountersDto expenseCountersDto
) {

  public static ReceiptFormResponse error(String msg) {
    return ReceiptFormResponse.builder()
        .generalFieldError(msg)
        .isError(true)
        .build();
  }

  public static ReceiptFormResponse msg(String msg) {
    return ReceiptFormResponse.builder()
        .generalFieldError(msg)
        .build();
  }
}
