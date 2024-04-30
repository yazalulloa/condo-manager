package com.yaz.api.extensions;

import com.yaz.persistence.entities.Expense;
import com.yaz.persistence.entities.ExtraCharge;
import com.yaz.persistence.entities.Rate;
import com.yaz.core.util.DateUtil;
import io.quarkus.qute.TemplateExtension;
import java.time.ZoneOffset;
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
}
