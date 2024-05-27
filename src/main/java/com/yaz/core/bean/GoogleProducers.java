package com.yaz.core.bean;

import com.yaz.core.service.gmail.GoogleHelper;
import com.yaz.core.service.gmail.domain.GmailConfig;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.Produces;

public class GoogleProducers {

  @Produces
  @ApplicationScoped
  GoogleHelper producesAuthorizationCodeFlowHelper(GmailConfig config) {
    return new GoogleHelper(config);
  }
}
