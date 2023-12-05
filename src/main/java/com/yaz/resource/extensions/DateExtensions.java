package com.yaz.resource.extensions;

import com.yaz.util.DateUtil;
import io.quarkus.qute.TemplateExtension;
import java.time.Instant;
import java.time.ZoneOffset;

@TemplateExtension
public class DateExtensions {

  static String fromEpoch(Long epoch) {
    final var dateTime = Instant.ofEpochSecond(epoch).atZone(ZoneOffset.UTC);
    return DateUtil.formatVe(dateTime);
  }
}
