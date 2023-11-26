package com.yaz.resource.extensions;

import com.yaz.persistence.domain.Currency;
import io.quarkus.qute.TemplateGlobal;

@TemplateGlobal
public class Globals {

  static Currency[] GLO_CURRENCIES = Currency.values;
}
