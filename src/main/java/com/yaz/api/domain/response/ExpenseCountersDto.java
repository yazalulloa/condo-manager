package com.yaz.api.domain.response;

import lombok.Builder;

@Builder
public record ExpenseCountersDto(
    long count,
    String commonTotal,
    String unCommonTotal
) {

}
