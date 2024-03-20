package com.yaz.event.domain;

import io.vertx.core.MultiMap;

public record TelegramWebhookRequest(MultiMap headers, String body) {

}
