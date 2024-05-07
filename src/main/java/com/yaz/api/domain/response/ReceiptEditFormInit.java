package com.yaz.api.domain.response;

import java.util.List;
import lombok.Builder;

@Builder
public record ReceiptEditFormInit(
    ReceiptFormDto receiptForm,
    ExtraChargeFormDto extraChargeFormDto,
    List<ExtraChargeTableItem> extraCharges,
    String totalUnCommonExpenses,
    String totalCommonExpenses,
    ExpenseFormDto expenseFormDto,
    List<ExpenseTableItem> expenses,
    List<DebtTableItem> debts,
    int debtReceiptsTotal,
    String debtTotal,
    List<ReserveFundTableItem> reserveFunds,
    ReserveFundFormDto reserveFundFormDto
) {

}
