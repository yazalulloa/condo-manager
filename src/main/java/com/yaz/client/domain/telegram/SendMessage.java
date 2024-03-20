package com.yaz.client.domain.telegram;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;
import lombok.experimental.Accessors;
import lombok.extern.jackson.Jacksonized;

@Jacksonized
@Builder(toBuilder = true)
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record SendMessage(
    Long chatId,
    String text,
    ParseMode parseMode,
    Boolean disableWebPagePreview,
    Boolean disableNotification,
    Long replyToMessageId,
    Boolean allowSendingWithoutReply,
    Object replyMarkup
) {

}
