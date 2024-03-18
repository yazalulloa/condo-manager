package com.yaz.persistence.domain.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.yaz.persistence.domain.Currency;
import com.yaz.persistence.entities.ExtraCharge;
import java.util.Set;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.Accessors;
import lombok.extern.jackson.Jacksonized;

@Jacksonized
@Builder(toBuilder = true)
@Accessors(fluent = true)
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ExtraChargeCreateRequest {

  private final String buildingId;
  private final String secondaryId;
  private final ExtraCharge.Type type;
  private final String description;
  private final double amount;
  private final Currency currency;
  private final boolean active;
  private final Set<String> apartments;
}
