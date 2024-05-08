package com.yaz.api.domain.response;

import java.util.List;
import lombok.Builder;

@Builder
public record ExpenseCountersDto(
    long count,
    String commonTotal,
    String unCommonTotal,
    String commonTotalPlusReserveFunds,
    String unCommonTotalPlusReserveFunds,
    List<ExpenseTableItem> reserveFundExpenses
) {

}
