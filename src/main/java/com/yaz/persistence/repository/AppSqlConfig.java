package com.yaz.persistence.repository;

import io.smallrye.config.ConfigMapping;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

//@StaticInitSafe
@ConfigMapping(prefix = "app.sql")
public interface AppSqlConfig {

  @NotNull
  Separator separator();


  interface Separator {

    @NotBlank
    String column();

    @NotBlank
    String row();
  }

}
