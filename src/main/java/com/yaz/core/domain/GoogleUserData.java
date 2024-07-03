package com.yaz.core.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;
import lombok.experimental.Accessors;
import lombok.extern.jackson.Jacksonized;

@Jacksonized
@Builder(toBuilder = true)
@Accessors(fluent = true)
@ToString
@Getter
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@AllArgsConstructor
@EqualsAndHashCode
public class GoogleUserData {

  // google unique id
  @JsonProperty
  private final String sub;

  @JsonProperty
  private final String givenName;

  @JsonProperty
  private final String name;

  @JsonProperty
  private final String email;

  @JsonProperty
  private final Boolean emailVerified;

  @JsonProperty
  private final String picture;

  @JsonProperty
  private final String locale;

  //The time the ID token was issued. Represented in Unix time (integer seconds).
  @JsonProperty
  private final long iat;

  //Expiration time on or after which the ID token must not be accepted. Represented in Unix time (integer seconds).
  @JsonProperty
  private final long exp;

  @JsonProperty
  private final String atHash;

  @JsonProperty
  private final String accessToken;

  @JsonProperty
  private final long expiresIn;

  @JsonProperty
  private final String scope;

  @JsonProperty
  private final String tokenType;

  @JsonProperty
  private final String idToken;
}
