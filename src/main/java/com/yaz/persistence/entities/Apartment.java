package com.yaz.persistence.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;
import lombok.Builder;


@Builder
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record Apartment(
    String buildingId,
    String number,
    String name,
    BigDecimal aliquot,
    Set<String> emails,
    LocalDateTime createdAt,
    LocalDateTime updatedAt) {

  public Keys keys() {
    return new Keys(buildingId, number, UUID.randomUUID().toString());
  }

  public record Keys(
      String buildingId,
      String number,
      String cardId) {

  }
}
