package com.yaz.persistence.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.yaz.persistence.domain.IdentityProvider;
import io.vertx.core.json.JsonObject;
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
@JsonInclude(JsonInclude.Include.NON_NULL)
public class User {

  private final String id;
  private final String providerId;
  private final IdentityProvider provider;
  private final String email;
  private final String username;
  private final String name;
  private final String picture;
  private final JsonObject data;
  private final LocalDateTime createdAt;
  private final LocalDateTime lastLoginAt;
  private final TelegramChat telegramChat;

  @Builder

  public record TelegramChat(
      Long chatId, String username, String firstName
  ) {

    public boolean hasChat() {
      return chatId != null;
    }

  }
}
