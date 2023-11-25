package com.yaz.resource.extensions;

import io.quarkus.qute.TemplateExtension;
import java.time.ZoneOffset;
import lombok.extern.slf4j.Slf4j;
import com.yaz.persistence.entities.Rate;
import com.yaz.util.DateUtil;

@TemplateExtension
@Slf4j
public class RateExtensions {

  static String formatCreatedAt(Rate rate) {
    return DateUtil.formatVe(rate.createdAt().atZone(ZoneOffset.UTC));
  }
}
