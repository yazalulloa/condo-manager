package com.yaz.persistence.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import java.time.LocalDateTime;
import lombok.Builder;

@Builder(toBuilder = true)
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@JsonInclude(JsonInclude.Include.NON_NULL)
public record EmailConfig(
    String userId,
    String email,
    String name,
    String picture,
    String givenName,
    byte[] file,
    long fileSize,
    long hash,
    boolean active,
    boolean isAvailable,
    boolean hasRefreshToken,
    Long expiresIn,
    LocalDateTime createdAt,
    LocalDateTime updatedAt,
    LocalDateTime lastCheckAt,
    String stacktrace) {

}
