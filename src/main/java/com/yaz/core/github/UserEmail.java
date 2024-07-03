package com.yaz.core.github;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record UserEmail(
    String email,
    boolean primary,
    boolean verified,
    String visibility
) {

}
