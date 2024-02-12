package com.yaz.persistence.domain.query;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.yaz.persistence.domain.IdentityProvider;
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
public class UserQuery {

  private final String lastId;
  private final IdentityProvider identityProvider;
  private final String q;
  @Builder.Default
  private final SortOrder sortOrder = SortOrder.DESC;
  @Builder.Default
  private final int limit = 30;
}
