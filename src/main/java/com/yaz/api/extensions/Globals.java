package com.yaz.api.extensions;

import com.yaz.persistence.domain.Currency;
import com.yaz.persistence.domain.ExpenseType;
import com.yaz.persistence.domain.ReserveFundType;
import com.yaz.persistence.entities.NotificationEvent;
import io.quarkus.qute.TemplateGlobal;

@TemplateGlobal
public class Globals {

  static Currency[] GLO_CURRENCIES = Currency.values;
  static NotificationEvent.Event[] GLO_NOTIFICATION_EVENTS = NotificationEvent.Event.VALUES;

  static ReserveFundType[] GLO_RESERVE_FUND_TYPES = ReserveFundType.VALUES;

  static ExpenseType[] GLO_EXPENSE_TYPES = ExpenseType.VALUES;

  static MonthType[] GLO_MONTH_TYPES = {
      new MonthType(1, "Enero"),
      new MonthType(2, "Febrero"),
      new MonthType(3, "Marzo"),
      new MonthType(4, "Abril"),
      new MonthType(5, "Mayo"),
      new MonthType(6, "Junio"),
      new MonthType(7, "Julio"),
      new MonthType(8, "Agosto"),
      new MonthType(9, "Septiembre"),
      new MonthType(10, "Octubre"),
      new MonthType(11, "Noviembre"),
      new MonthType(12, "Diciembre")
  };

  public record MonthType(
      int month,
      String name
  ) {

  }
}
