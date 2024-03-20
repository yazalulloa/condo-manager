package com.yaz.client.domain.telegram;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import java.util.List;
import lombok.Builder;
import lombok.extern.jackson.Jacksonized;

@Jacksonized
@Builder(toBuilder = true)
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record TelegramMessage(
    long messageId, TelegramUser from,
    Chat senderChat, long date,
    TelegramUser forwardFrom, Chat forwardFromChat,
    long forwardFromMessageId, String forwardSignature,
    String forwardSenderName, long forwardDate,
    boolean isAutomaticForward,
    com.yaz.client.domain.telegram.TelegramMessage replyToMessage,
    TelegramUser viaBot, long editDate,
    boolean hasProtectedContent, String mediaGroupId,
    String authorSignature, String text,
    List<EntitiesItem> entities, TelegramUser newChatParticipant,
    TelegramUser newChatMember, List<TelegramUser> newChatMembers,
    TelegramUser leftChatParticipant, TelegramUser leftChatMember,
    Chat chat, InlineKeyboardMarkup replyMarkup) {

}