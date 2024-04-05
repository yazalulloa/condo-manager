package com.yaz.core.service.gmail.domain;

import io.smallrye.config.ConfigMapping;
import io.smallrye.config.WithDefault;
import jakarta.validation.constraints.NotBlank;
import java.util.Set;

@ConfigMapping(prefix = "app.gmail")
public interface GmailConfig {

  @NotBlank
  String clientId();
  @NotBlank
  String clientSecret();
  @NotBlank
  String appName();

  Set<String> receiptTo();
  @WithDefault("false")
  boolean useAlternativeReceiptTo();

}
