package com.yaz.resource.domain.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import java.math.BigDecimal;
import java.util.List;
import java.util.Set;
import lombok.Builder;
import lombok.Data;
import lombok.extern.jackson.Jacksonized;
import com.yaz.persistence.domain.Currency;

@Jacksonized
@Builder(toBuilder = true)
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class BuildingFormDto {

  private final boolean isEdit;
  private final String generalFieldError;
  private final String id;
  private final String idFieldError;
  private final boolean readOnlyId;
  private final String name;
  private final String nameFieldError;
  private final String rif;
  private final String rifFieldError;
  private final Currency mainCurrency;
  private final String mainCurrencyFieldError;
  private final Currency debtCurrency;
  private final String debtCurrencyFieldError;
  private final Set<Currency> currenciesToShowAmountToPay;
  private final boolean fixedPay;
  private final BigDecimal fixedPayAmount;
  private final String fixedPayAmountFieldError;
  private final boolean roundUpPayments;
  private final String emailConfig;
  private final List<EmailConfigDto> emailConfigs;
  private final String emailConfigFieldError;
  private final boolean shouldRedirect;
  private final boolean isNew;

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
