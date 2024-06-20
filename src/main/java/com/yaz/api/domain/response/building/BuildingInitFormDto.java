package com.yaz.api.domain.response.building;

import com.yaz.api.domain.response.EmailConfigDto;
import com.yaz.persistence.domain.Currency;
import java.math.BigDecimal;
import java.util.List;
import lombok.Builder;

@Builder(toBuilder = true)
public record BuildingInitFormDto(
    boolean isEdit,
    String key,
    List<EmailConfigDto> emailConfigs,

    String id,
    String name,
    String rif,
    Currency mainCurrency,
    Currency debtCurrency,
    String currenciesToShowAmountToPay,
    boolean fixedPay,
    BigDecimal fixedPayAmount,
    Boolean roundUpPayments,
    String emailConfigId
) {

}
