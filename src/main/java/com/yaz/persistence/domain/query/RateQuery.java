package com.yaz.persistence.domain.query;

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
public class RateQuery {

  private final long lastId;
  private final String date;
  @Builder.Default
  private final SortOrder sortOrder = SortOrder.DESC;
  @Builder.Default
  private final int limit = 30;

  public static RateQuery query(int limit, SortOrder sortOrder) {
    return RateQuery.builder()
        .limit(limit)
        .sortOrder(sortOrder)
        .build();
  }
}
