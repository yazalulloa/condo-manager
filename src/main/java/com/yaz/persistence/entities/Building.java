package com.yaz.persistence.entities;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.Accessors;
import lombok.extern.jackson.Jacksonized;
import com.yaz.persistence.domain.Currency;

@Jacksonized
@Builder(toBuilder = true)
@Accessors(fluent = true)
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class Building {

  @JsonProperty
  private final String id;
  @JsonProperty
  private final String name;
  @JsonProperty
  private final String rif;
  @JsonProperty
  private final Currency mainCurrency;
  @JsonProperty
  private final Currency debtCurrency;
  @JsonProperty
  private final Set<Currency> currenciesToShowAmountToPay;
  /*@JsonProperty
  private final List<ExtraCharge> extraCharges;*/
  @JsonProperty
  private final Boolean fixedPay;
  @JsonProperty
  private final BigDecimal fixedPayAmount;

  @JsonProperty
  private final Boolean roundUpPayments;
  @JsonProperty
  private final Long amountOfApts;

    /*@JsonProperty
    private final List<ReserveFund> reserveFunds;*/

  @JsonProperty
  private final String emailConfig;

  @JsonProperty
  private final LocalDateTime createdAt;

  @JsonProperty
  private final LocalDateTime updatedAt;
}
