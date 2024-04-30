package com.yaz.api.domain.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.yaz.persistence.domain.Currency;

import com.yaz.persistence.entities.ExtraCharge.Apt;
import java.math.BigDecimal;
import java.util.Collections;
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
public class ExtraChargeFormDto {

  private final String key;
  private final boolean isEdit;
  private final boolean clearForm;
  //private final String buildingId;
  //private final String id;
  private final String description;
  private final String descriptionFieldError;
  @Builder.Default
  private final BigDecimal amount = BigDecimal.ONE;
  private final String amountFieldError;
  @Builder.Default
  private final Currency currency = Currency.VED;
  @Builder.Default
  private final boolean active = true;
  private final List<Apt> apartments;

  private final Long count;

  @Builder.Default
  private final Set<String> aptChecked = Collections.emptySet();
  private final String apartmentFieldError;
  private final boolean refreshGrid;
  private final ExtraChargeTableItem tableItem;

  public boolean isSuccess() {
    return descriptionFieldError == null && amountFieldError == null && apartmentFieldError == null;
  }

}
