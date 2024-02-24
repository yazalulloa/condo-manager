package com.yaz.persistence.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.yaz.persistence.domain.IdentityProvider;
import java.time.LocalDateTime;
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
public class OidcDbToken {

  private final String id;
  private final String idToken;
  private final String accessToken;
  private final String refreshToken;
  private final Long expiresIn;
  private final User user;
  private final LocalDateTime createdAt;
  private final LocalDateTime updatedAt;


  @Jacksonized
  @Builder(toBuilder = true)
  @Accessors(fluent = true)
  @Data
  @JsonIgnoreProperties(ignoreUnknown = true)
  @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
  public static class User {
    private final String id;
    private final String providerId;
    private final IdentityProvider provider;
    private final String email;
    private final String username;
    private final String name;
    private final String picture;
  }
}
