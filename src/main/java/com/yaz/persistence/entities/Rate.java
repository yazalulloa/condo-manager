package com.yaz.persistence.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.Accessors;
import lombok.extern.jackson.Jacksonized;
import com.yaz.persistence.domain.Currency;

@Jacksonized
@Builder(toBuilder = true)
@Accessors(fluent = true)
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Rate {

  @JsonProperty
  private final Long id;

  @JsonProperty
  private final Currency fromCurrency;

  @JsonProperty
  private final Currency toCurrency;

  @JsonProperty
  private final BigDecimal rate;

  @JsonProperty
  private final LocalDate dateOfRate;

  @JsonProperty
  private final Source source;

  @JsonProperty
  private final LocalDateTime createdAt;

  @JsonProperty
  private final String description;

  @JsonProperty
  private final Long hash;

  @JsonProperty
  private final String etag;

  @JsonProperty
  private final String lastModified;


  public enum Source {
    BCV, PLATFORM;

    public static final Source[] VALUES = values();
  }
}
