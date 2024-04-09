package com.yaz.core.service.domain;

import io.smallrye.config.ConfigMapping;
import jakarta.validation.constraints.NotBlank;

@ConfigMapping(prefix = "app.encryption")
public interface EncryptionConfig {

  @NotBlank
  String secretKey();

  @NotBlank
  String separator();

  @NotBlank
  String algorithm();

  @NotBlank
  String transformation();

  int ivSize();

  int parameterSpecLen();

}
