package com.yaz.resource.extensions;

import com.yaz.persistence.domain.Currency;
import com.yaz.persistence.domain.ExpenseType;
import com.yaz.persistence.entities.NotificationEvent;
import com.yaz.persistence.domain.ReserveFundType;
import io.quarkus.qute.TemplateGlobal;

@TemplateGlobal
public class Globals {

  static Currency[] GLO_CURRENCIES = Currency.values;
  static NotificationEvent.Event[] GLO_NOTIFICATION_EVENTS = NotificationEvent.Event.VALUES;

  static ReserveFundType[] GLO_RESERVE_FUND_TYPES = ReserveFundType.VALUES;

  static ExpenseType[] GLO_EXPENSE_TYPES = ExpenseType.VALUES;
}
