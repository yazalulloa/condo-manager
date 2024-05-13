package com.yaz.persistence.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.yaz.core.util.StringUtil;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.extern.jackson.Jacksonized;


@Builder(toBuilder = true)
@Jacksonized
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@JsonInclude(JsonInclude.Include.NON_NULL)
public record Receipt(
    String buildingId,
    long id,
    int year,
    int month,
    LocalDate date,
    long rateId,
    boolean sent,
    LocalDateTime lastSent,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {


  public Keys keys() {
    return new Keys(buildingId, id, 0);
  }

  public Keys keysWithHash() {
    final var receipt = this.toBuilder()
        .sent(false)
        .lastSent(null)
        .createdAt(null)
        .updatedAt(null)
        .build();

    return new Keys(buildingId, id, StringUtil.objHash(receipt));
  }

  public record Keys(
      String buildingId,
      long id,
      long hash
  ) {

  }
}
