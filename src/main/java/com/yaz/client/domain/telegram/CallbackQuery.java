package com.yaz.client.domain.telegram;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;
import lombok.ToString;
import lombok.experimental.Accessors;
import lombok.experimental.SuperBuilder;
import lombok.extern.jackson.Jacksonized;

@Jacksonized
@SuperBuilder(toBuilder = true)
@Accessors(fluent = true)
@ToString
@Getter
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class CallbackQuery {

  @JsonProperty
  private final String id;

  @JsonProperty
  private final TelegramUser from;

  @JsonProperty
  private final TelegramMessage message;

  @JsonProperty
  private final String inlineMessageId;

  @JsonProperty
  private final String chatInstance;

  @JsonProperty
  private final String data;

}
