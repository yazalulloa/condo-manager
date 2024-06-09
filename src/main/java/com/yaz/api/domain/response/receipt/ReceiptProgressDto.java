package com.yaz.api.domain.response.receipt;

import lombok.Builder;

@Builder
public record ReceiptProgressDto(
    String clientId,
    boolean outOfBoundsUpdate,
    String msg,
    boolean clearDialog
) {

}
