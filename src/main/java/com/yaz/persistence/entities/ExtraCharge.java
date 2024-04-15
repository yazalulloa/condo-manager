package com.yaz.persistence.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.yaz.persistence.domain.Currency;
import java.util.List;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.Accessors;
import lombok.extern.jackson.Jacksonized;

@Builder(toBuilder = true)
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@JsonInclude(JsonInclude.Include.NON_NULL)
public record ExtraCharge(
    String buildingId,
    String secondaryId,
    long id,
    Type type,
    String description,
    double amount,
    Currency currency,
    boolean active,
    List<Apt> apartments
) {


  public Keys keys() {
    return new Keys(buildingId, secondaryId, id);
  }

  public enum Type {
    BUILDING, RECEIPT
  }


  @Builder(toBuilder = true)
  public record Apt(String number, String name) {

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
    private final long id;
  }
}
