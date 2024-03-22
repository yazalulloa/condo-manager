package com.yaz.persistence.domain;

import io.quarkus.qute.TemplateEnum;

@TemplateEnum
public enum ReserveFundType {
  FIXED_PAY, PERCENTAGE;


  public static final ReserveFundType[] VALUES = values();
}
