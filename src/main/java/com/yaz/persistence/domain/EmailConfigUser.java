package com.yaz.persistence.domain;

import com.yaz.persistence.entities.EmailConfig;
import lombok.Builder;

public record EmailConfigUser(
    User user,
    EmailConfig emailConfig
) {


  public boolean hasExpired() {
    return emailConfig.expiresIn() < System.currentTimeMillis();
  }
  public boolean shouldGetNewOne() {

    return hasExpired() && !emailConfig.hasRefreshToken();
  }

  @Builder
  public record User(
      String providerId,
      IdentityProvider provider,
      String email,
      String username,
      String name,
      String picture
  ) {

  }

}
