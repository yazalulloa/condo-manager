package com.yaz.client.turso.response;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record ResultsItem(
    Response response,
    String type,
    Error error
) {

  @RegisterForReflection
  public record Error(
      String code,
      String message
  ) {

  }
}
