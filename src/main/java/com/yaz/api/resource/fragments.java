package com.yaz.api.resource;

import io.quarkus.qute.CheckedTemplate;
import io.quarkus.qute.TemplateInstance;

public class fragments {
  @CheckedTemplate
  public static class Fragments {

    public static native TemplateInstance rateInfo(String msg);
  }
}
