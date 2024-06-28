package com.yaz.api.domain.response.debt;

import com.yaz.api.domain.response.DebtTableItem;
import java.util.List;
import lombok.Builder;

@Builder(toBuilder = true)
public record DebtInitFormDto(
    String key,
    int debtReceiptsTotal,
    String debtTotal,
    List<DebtTableItem> debts
) {

}
