package com.yaz.api.domain.response;

import lombok.Builder;

@Builder(toBuilder = true)
public record ReserveFundCountersDto(
    long count,
    ExpenseCountersDto expenseCountersDto

) {

  public static ReserveFundCountersDto count(long count) {
    return ReserveFundCountersDto.builder()
        .count(count)
        .build();
  }

}
