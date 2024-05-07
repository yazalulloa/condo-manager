package com.yaz.api.domain.response;

import lombok.Builder;

@Builder(toBuilder = true)
public record ReserveFundCountersDto(
    long count

) {

}
