package com.yaz.core.service.domain;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.yaz.persistence.entities.Debt;
import com.yaz.persistence.entities.Expense;
import com.yaz.persistence.entities.ExtraCharge;
import com.yaz.persistence.entities.Receipt;
import java.util.List;
import lombok.Builder;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@Builder(toBuilder = true)
public record ReceiptRecord(
    Receipt receipt,
    List<Expense> expenses,
    List<ExtraCharge> extraCharges,
    List<Debt> debts
) {

}
