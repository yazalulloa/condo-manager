package com.yaz.api.domain.response;

import java.util.Collection;
import lombok.Builder;

@Builder
public record ReceiptTableResponse(
    ReceiptCountersDto countersDto,
    String nextPageUrl,
    Collection<ReceiptTableItem> results) {

}
