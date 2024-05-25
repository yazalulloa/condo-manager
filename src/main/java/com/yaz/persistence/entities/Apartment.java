package com.yaz.persistence.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.yaz.core.util.StringUtil;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;
import lombok.Builder;


@Builder(toBuilder = true)
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

  private static final String CARD_ID_PREFIX = "apartment-card-id-";

  private static String cardId() {
    return CARD_ID_PREFIX + UUID.randomUUID();
  }

  public Keys keys() {
    final var apartment = this.toBuilder()
        .createdAt(null)
        .updatedAt(null)
        .build();
    return new Keys(buildingId, number, StringUtil.objHash(apartment), cardId());
  }

  public Keys keysWithHash(String cardId) {
    final var apartment = this.toBuilder()
        .createdAt(null)
        .updatedAt(null)
        .build();
    return new Keys(buildingId, number, StringUtil.objHash(apartment), cardId);
  }

  public record Keys(
      String buildingId,
      String number,
      long hash,
      String cardId) {

  }
}
