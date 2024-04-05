package com.yaz.core.service.domain;

import io.smallrye.config.ConfigMapping;
import jakarta.validation.constraints.NotBlank;

@ConfigMapping(prefix = "app.encryption")
public interface EncryptionConfig {

  @NotBlank
  String secretKey();

  String separator();

}
