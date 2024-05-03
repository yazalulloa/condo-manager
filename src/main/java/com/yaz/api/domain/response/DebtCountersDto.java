package com.yaz.api.domain.response;

import lombok.Builder;

@Builder
public record DebtCountersDto(
    long count,
    int receipts,
    String total
) {

}
