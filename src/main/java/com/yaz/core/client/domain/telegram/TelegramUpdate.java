package com.yaz.core.client.domain.telegram;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;
import lombok.extern.jackson.Jacksonized;

@Jacksonized
@Builder(toBuilder = true)
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record TelegramUpdate(
    long updateId,
    TelegramMessage message,
    TelegramMessage editedMessage,
    TelegramMessage channelPost,
    TelegramMessage editedChannelPost,
    InlineQuery inlineQuery,
    CallbackQuery callbackQuery) {

}