package com.yaz.util;

import io.quarkus.security.identity.SecurityIdentity;
import java.util.Objects;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class SecurityUtil {

  public static String getUserId(SecurityIdentity identity) {
    final var userId = Objects.requireNonNull(identity.getAttribute("userId")).toString();
    //log.info("userId: {}", userId);
    return userId;
  }

}
