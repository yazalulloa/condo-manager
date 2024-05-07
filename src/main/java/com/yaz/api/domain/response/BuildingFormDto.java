package com.yaz.api.domain.response;

import com.yaz.persistence.domain.Currency;
import java.math.BigDecimal;
import java.util.List;
import java.util.Set;
import lombok.Builder;


@Builder(toBuilder = true)
public record BuildingFormDto(
    boolean isEdit,
    String generalFieldError,
    String id,
    String idFieldError,
    boolean readOnlyId,
    String name,
    String nameFieldError,
    String rif,
    String rifFieldError,
    Currency mainCurrency,
    String mainCurrencyFieldError,
    Currency debtCurrency,
    String debtCurrencyFieldError,
    Set<Currency> currenciesToShowAmountToPay,
    boolean fixedPay,
    BigDecimal fixedPayAmount,
    String fixedPayAmountFieldError,
    boolean roundUpPayments,
    String emailConfig,
    List<EmailConfigDto> emailConfigs,
    String emailConfigFieldError,
    boolean shouldRedirect,
    boolean isNew) {

  public boolean isSuccess() {
    return generalFieldError == null
        && idFieldError == null
        && nameFieldError == null
        && rifFieldError == null
        && mainCurrencyFieldError == null
        && debtCurrencyFieldError == null
        && fixedPayAmountFieldError == null
        && emailConfigFieldError == null;
  }

}
