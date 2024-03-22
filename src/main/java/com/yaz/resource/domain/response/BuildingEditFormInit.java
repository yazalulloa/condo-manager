package com.yaz.resource.domain.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import java.util.List;
import lombok.Builder;
import lombok.Data;
import lombok.extern.jackson.Jacksonized;

@Jacksonized
@Builder(toBuilder = true)
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class BuildingEditFormInit {

  private final BuildingFormDto buildingFormDto;
  private final ExtraChargeFormDto extraChargeFormDto;
  private final List<ExtraChargeTableItem> extraCharges;
  private final List<ReserveFundTableItem> reserveFunds;
}
