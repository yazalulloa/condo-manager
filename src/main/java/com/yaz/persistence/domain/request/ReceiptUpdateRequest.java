package com.yaz.persistence.domain.request;

import java.time.LocalDate;
import lombok.Builder;

@Builder(toBuilder = true)
public record ReceiptUpdateRequest(
    long id,
    int year,
    int month,
    LocalDate date,
    long rateId
) {

}
