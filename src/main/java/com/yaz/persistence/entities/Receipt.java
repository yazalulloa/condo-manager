package com.yaz.persistence.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
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
    LocalDateTime updatedAt,
    List<Expense> expenses,
    List<ExtraCharge> extraCharges,
    List<Debt> debts
) {


  public Keys keys() {
    return new Keys(buildingId, id);
  }

  public record Keys(
      String buildingId,
      long id
  ) {

  }
}
