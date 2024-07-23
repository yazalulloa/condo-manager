package com.yaz.core.job;

import com.yaz.core.service.gmail.GmailChecker;
import com.yaz.core.util.MutinyUtil;
import io.micrometer.core.annotation.Timed;
import io.quarkus.scheduler.Scheduled;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor
public class EmailConfigJob {

  private final GmailChecker gmailChecker;

  @Scheduled(delay = 1, every = "30M")
  @Timed(value = "email_config_job.check_all", description = "[Email Config Job] A measure of how long it takes to check all email configurations")
  Uni<Void> runAsStart() {
    return MutinyUtil.toUni(gmailChecker.checkAll());
  }
}
