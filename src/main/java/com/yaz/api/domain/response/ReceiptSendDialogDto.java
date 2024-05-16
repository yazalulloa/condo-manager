package com.yaz.api.domain.response;

import com.yaz.persistence.entities.ExtraCharge.Apt;
import java.time.LocalDate;
import java.util.List;
import lombok.Builder;

@Builder
public record ReceiptSendDialogDto(
    String key,
    String buildingId,
    int year,
    String month,
    LocalDate date,
    List<Apt> apartments
    ) {

}
