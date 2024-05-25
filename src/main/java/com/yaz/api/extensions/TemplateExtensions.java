package com.yaz.api.extensions;

import com.yaz.api.domain.EditAttr;
import com.yaz.api.domain.response.DebtTableItem;
import com.yaz.api.extensions.Globals.MonthType;
import com.yaz.core.util.DateUtil;
import com.yaz.core.util.DecimalUtil;
import com.yaz.persistence.entities.Debt;
import com.yaz.persistence.entities.Expense;
import com.yaz.persistence.entities.ExtraCharge;
import com.yaz.persistence.entities.Rate;
import io.quarkus.qute.TemplateExtension;
import io.vertx.core.json.Json;
import java.time.ZoneOffset;
import java.util.Base64;
import java.util.Optional;

@TemplateExtension
public class TemplateExtensions {

  static String formatCreatedAt(Rate rate) {
    return Optional.ofNullable(rate.createdAt())
        .map(dateTime -> dateTime.atZone(ZoneOffset.UTC))
        .map(DateUtil::formatVe)
        .orElse("");
  }


  static String formatAmount(ExtraCharge extraCharge) {
    return extraCharge.currency().numberFormat().format(extraCharge.amount());
  }

  static String formatAmount(Expense expense) {
    return expense.currency().numberFormat().format(expense.amount());
  }

  static String formatPreviousPaymentAmount(Debt debt) {
    if (debt.previousPaymentAmount() == null || debt.previousPaymentAmountCurrency() == null
        || DecimalUtil.equalsToZero(debt.previousPaymentAmount())) {
      return "";
    }
    return debt.previousPaymentAmountCurrency().numberFormat().format(debt.previousPaymentAmount());
  }

  static String formatAmount(DebtTableItem item) {

    if (item.currency() == null || item.item() == null || item.item().amount() == null) {
      return "";
    }

    return item.currency().numberFormat().format(item.item().amount());
  }

  public static String monthFromInt(int i) {
    for (MonthType type : Globals.GLO_MONTH_TYPES) {
      if (type.month() == i) {
        return type.name();
      }
    }

    return "";
  }

  public static String format(EditAttr editAttr) {

    final var json = Json.encode(editAttr);
    return Base64.getUrlEncoder().encodeToString(json.getBytes());
  }
}
