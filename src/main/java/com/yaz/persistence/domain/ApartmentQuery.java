package com.yaz.persistence.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
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
public class ApartmentQuery {

  private final String lastBuildingId;
  private final String lastNumber;
  private final String q;
  private final String building;
  @Builder.Default
  private final int limit = 25;

  public static ApartmentQuery of(String q, String building) {
    return ApartmentQuery.builder().q(q).building(building).build();
  }
}
