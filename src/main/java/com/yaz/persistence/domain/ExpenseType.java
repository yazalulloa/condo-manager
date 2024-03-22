package com.yaz.persistence.domain;

import io.quarkus.qute.TemplateEnum;

@TemplateEnum
public enum ExpenseType {
  COMMON, UNCOMMON;

  public static final ExpenseType[] VALUES = values();
}
