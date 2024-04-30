package com.yaz.api.domain.response;

import java.util.List;
import lombok.Builder;

@Builder
public record ReceiptEditFormInit(
    ReceiptFormDto receiptForm,
    ExtraChargeFormDto extraChargeFormDto,
    List<ExtraChargeTableItem> extraCharges
) {

}
