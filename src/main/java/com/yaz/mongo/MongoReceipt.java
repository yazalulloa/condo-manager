package com.yaz.mongo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.yaz.persistence.domain.Currency;
import com.yaz.persistence.entities.Expense;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Month;
import java.util.List;
import java.util.Set;
import lombok.Builder;
import lombok.extern.jackson.Jacksonized;


@Builder(toBuilder = true)
@Jacksonized
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@JsonInclude(JsonInclude.Include.NON_NULL)
public record MongoReceipt(
    String buildingId,
    String id,
    int year,
    Month month,
    LocalDate date,
    long rateId,
    boolean sent,
    LocalDateTime lastSent,
    LocalDateTime createdAt,
    LocalDateTime updatedAt,

    List<Expense> expenses,
    List<MongoExtraCharge> extraCharges,
    List<MongoDebt> debts
) {

  @Builder(toBuilder = true)
  @Jacksonized
  @JsonIgnoreProperties(ignoreUnknown = true)
  @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
  @JsonInclude(JsonInclude.Include.NON_NULL)
  public record MongoExtraCharge(
      String aptNumber,
      String name,
      String description,
      double amount,
      Currency currency
  ) {

  }

  @Builder(toBuilder = true)
  @Jacksonized
  @JsonIgnoreProperties(ignoreUnknown = true)
  @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
  @JsonInclude(JsonInclude.Include.NON_NULL)
  public record MongoDebt(
      String aptNumber,

      String name,

      int receipts,

      BigDecimal amount,

      Set<Month> months,

      BigDecimal previousPaymentAmount,

      Currency previousPaymentAmountCurrency
  ) {

  }
}
