package com.yaz.api.domain.response;

import java.util.List;
import lombok.Builder;

@Builder
public record ReceiptFormDto(
    String key,
    int month,
    int year,
    int[] years,
    String buildingName,
    String date,
    long rateId,
    RateTableResponse rates
) {

}