package com.yaz.resource.extensions;

import com.yaz.persistence.domain.Currency;
import com.yaz.persistence.entities.NotificationEvent;
import io.quarkus.qute.TemplateGlobal;

@TemplateGlobal
public class Globals {

  static Currency[] GLO_CURRENCIES = Currency.values;
  static NotificationEvent.Event[] GLO_NOTIFICATION_EVENTS = NotificationEvent.Event.VALUES;
}
