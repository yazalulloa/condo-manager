package com.yaz.persistence.domain.request;

import com.yaz.persistence.entities.Debt;
import com.yaz.persistence.entities.Expense;
import com.yaz.persistence.entities.ExtraCharge;
import com.yaz.persistence.entities.Receipt;
import java.util.List;
import lombok.Builder;

@Builder
public record ReceiptCreateRequest(
    Receipt receipt,
    List<Expense> expenses,
    List<ExtraCharge> extraCharges,
    List<Debt> debts
) {

}
