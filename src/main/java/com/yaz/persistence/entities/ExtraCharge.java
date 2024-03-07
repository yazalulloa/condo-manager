package com.yaz.persistence.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.yaz.persistence.domain.Currency;
import java.util.List;
import lombok.AllArgsConstructor;
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
public class ExtraCharge {

  private final String buildingId;
  private final String secondaryId;
  private final String id;
  private final String description;
  private final double amount;
  private final Currency currency;
  private final boolean active;
  private final List<Apt> apartments;

  public Keys keys() {
    return new Keys(buildingId, secondaryId, id);
  }

  @Jacksonized
  @Builder(toBuilder = true)
  @Data
  @AllArgsConstructor
  public static class Apt {

    private final String number;
    private final String name;
  }

  @Jacksonized
  @Builder(toBuilder = true)
  @Accessors(fluent = true)
  @Data
  @JsonIgnoreProperties(ignoreUnknown = true)
  @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
  @JsonInclude(JsonInclude.Include.NON_NULL)
  public static class Keys {

    @JsonProperty
    private final String buildingId;
    @JsonProperty
    private final String secondaryId;
    @JsonProperty
    private final String id;
  }
}
