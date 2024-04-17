package com.yaz.persistence.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.yaz.persistence.domain.Currency;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Builder;

@Builder(toBuilder = true)
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@JsonInclude(JsonInclude.Include.NON_NULL)
public record Rate(
    Long id,
    Currency fromCurrency,
    Currency toCurrency,
    BigDecimal rate,
    LocalDate dateOfRate,
    Source source,
    LocalDateTime createdAt,
    String description,
    Long hash,
    String etag,
    String lastModified) {


  public enum Source {
    BCV, PLATFORM;

    public static final Source[] VALUES = values();
  }

}
