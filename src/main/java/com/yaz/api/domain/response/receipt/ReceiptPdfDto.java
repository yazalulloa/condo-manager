package com.yaz.api.domain.response.receipt;

import com.yaz.persistence.entities.Receipt;
import lombok.Builder;

@Builder
public record ReceiptPdfDto(
    Receipt receipt,
    String clientId,
    ReceiptProgressDto progressDto
) {

}
