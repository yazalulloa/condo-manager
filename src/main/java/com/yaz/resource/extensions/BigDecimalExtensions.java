package com.yaz.resource.extensions;

import io.quarkus.qute.TemplateExtension;
import java.math.BigDecimal;

@TemplateExtension
public class BigDecimalExtensions {

  static Double toDouble(BigDecimal val) {
    return val.doubleValue();
  }
}
