package com.yaz.persistence.entities;

import io.quarkus.qute.TemplateEnum;
import java.time.LocalDateTime;
import lombok.Builder;

@Builder
public record NotificationEvent(
    String userId, Event event, LocalDateTime createdAt
) {

  @TemplateEnum
  public enum Event {
    APP_STARTUP,
    APP_SHUTTING_DOWN,
    NEW_RATE,
    CONFIG_EMAIL_FAILED_CHECK;

    public static final Event[] VALUES = values();
  }

}
