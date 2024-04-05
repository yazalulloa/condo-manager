package com.yaz.api.domain.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.yaz.persistence.domain.Currency;
import java.math.BigDecimal;
import java.util.List;
import java.util.Set;
import lombok.Builder;
import lombok.Data;
import lombok.extern.jackson.Jacksonized;

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


//  private final List<ExtraChargeRequest> extraCharges = List.of(
//      ExtraChargeRequest.builder()
//          .id("1")
//          .description("Extra Charge 1")
//          .amount(100.32)
//          .currency(Currency.USD)
//          .active(true)
//          .apartments(List.of(
//              new ExtraChargeRequest.Apt("101", "Test 101"),
//              new ExtraChargeRequest.Apt("102", "Test 102"),
//              new ExtraChargeRequest.Apt("103", "Test 103")
//          ))
//          .build(),
//
//      ExtraChargeRequest.builder()
//          .id("2")
//          .description("Extra Charge 2")
//          .amount(200.32)
//          .currency(Currency.VED)
//          .active(false)
//          .apartments(List.of(
//              new ExtraChargeRequest.Apt("201", "Test 201"),
//              new ExtraChargeRequest.Apt("202", "Test 202"),
//              new ExtraChargeRequest.Apt("203", "Test 203")
//          ))
//          .build()
//  );

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
