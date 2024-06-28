package com.yaz.api.domain.response.receipt;

import com.yaz.api.domain.response.ReceiptFormDto;
import com.yaz.api.domain.response.debt.DebtInitFormDto;
import com.yaz.api.domain.response.extra.charge.ExtraChargeInitFormDto;
import com.yaz.api.domain.response.reserve.funds.ReserveFundInitFormDto;
import com.yaz.persistence.entities.ExtraCharge.Apt;
import java.util.List;
import lombok.Builder;

@Builder(toBuilder = true)
public record ReceiptInitFormDto(

    ReceiptFormDto receiptForm,

    List<Apt> apts,
    ExtraChargeInitFormDto extraChargeDto,

    ReserveFundInitFormDto reserveFundDto,
    DebtInitFormDto debtDto
) {

}
