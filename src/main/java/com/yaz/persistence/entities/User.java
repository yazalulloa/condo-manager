package com.yaz.persistence.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.yaz.persistence.domain.IdentityProvider;
import io.vertx.core.json.JsonObject;
import java.time.LocalDateTime;
import java.util.Set;
import lombok.Builder;


@Builder(toBuilder = true)
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@JsonInclude(JsonInclude.Include.NON_NULL)
public record User(
    String id,
    String providerId,
    IdentityProvider provider,
    String email,
    String username,
    String name,
    String picture,
    JsonObject data,
    LocalDateTime createdAt,
    LocalDateTime lastLoginAt,
    TelegramChat telegramChat,
    Set<NotificationEvent.Event> notificationEvents
) {

  @Builder
  public record TelegramChat(
      Long chatId, String username, String firstName
  ) {

    public boolean hasChat() {
      return chatId != null;
    }

  }
}
