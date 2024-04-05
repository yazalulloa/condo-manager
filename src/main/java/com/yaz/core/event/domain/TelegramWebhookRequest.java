package com.yaz.core.event.domain;

import io.vertx.core.MultiMap;

public record TelegramWebhookRequest(MultiMap headers, String body) {

}
