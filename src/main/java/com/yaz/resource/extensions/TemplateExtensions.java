package com.yaz.resource.extensions;

import com.yaz.persistence.entities.ExtraCharge;
import com.yaz.persistence.entities.Rate;
import com.yaz.util.DateUtil;
import io.quarkus.qute.TemplateExtension;
import java.time.ZoneOffset;

@TemplateExtension
public class TemplateExtensions {

  static String formatCreatedAt(Rate rate) {
    return DateUtil.formatVe(rate.createdAt().atZone(ZoneOffset.UTC));
  }


  static String formatAmount(ExtraCharge extraCharge) {
    return extraCharge.currency().numberFormat().format(extraCharge.amount());
  }
}
