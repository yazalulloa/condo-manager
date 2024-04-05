package com.yaz.api.extensions;

import com.yaz.core.util.DateUtil;
import com.yaz.core.util.FileUtil;
import io.quarkus.qute.TemplateExtension;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@TemplateExtension
public class StringExtensions {

  static String fromEpoch(Long epoch) {
    if (epoch == null) {
      return "";
    }

    final var dateTime = Instant.ofEpochSecond(epoch).atZone(ZoneOffset.UTC);
    return DateUtil.formatVe(dateTime);
  }

  static String fromEpochMillis(Long epoch) {
    if (epoch == null) {
      return "";
    }

    final var dateTime = Instant.ofEpochMilli(epoch).atZone(ZoneOffset.UTC);
    return DateUtil.formatVe(dateTime);
  }

  static String formatDate(LocalDateTime dateTime) {
    if (dateTime == null) {
      return "";
    }

    return DateUtil.formatVe(dateTime.atZone(ZoneOffset.UTC));
  }

  static String formatFileSize(Long fileSize) {
    if (fileSize == null) {
      return "";
    }

    return FileUtil.byteCountToDisplaySize(fileSize);
  }
}
