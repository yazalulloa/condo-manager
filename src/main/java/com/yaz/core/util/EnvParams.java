package com.yaz.core.util;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.time.Instant;
import java.util.Optional;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.eclipse.microprofile.config.inject.ConfigProperty;

@ApplicationScoped
@Data
@Slf4j
public class EnvParams {

  private static final String APP_STARTED_AT = "APP_STARTED_AT";
  private static final String CURRENT_IP = "CURRENT_IP";

  private final String cloud;
  private final boolean isShowDir;
  private final boolean sendNotifications;

  @Inject
  public EnvParams(
      @ConfigProperty(name = "app.cloud-provider") String cloud,
      @ConfigProperty(name = "app.is-show-dir", defaultValue = "false") boolean isShowDir,
      @ConfigProperty(name = "app.send-notifications", defaultValue = "false") boolean sendNotifications) {
    this.cloud = cloud;
    this.isShowDir = isShowDir;
    this.sendNotifications = sendNotifications;
  }

  public void saveCurrentIp(String ip) {
    System.setProperty(CURRENT_IP, ip);
  }

  public String currentIp() {
    return Optional.ofNullable(System.getProperty(CURRENT_IP))
        .orElse("");
  }

  public void saveAppStartedAt() {
    System.setProperty(APP_STARTED_AT, String.valueOf(System.currentTimeMillis()));
  }

  public Long getAppStartedAt() {
    return Optional.ofNullable(System.getProperty(APP_STARTED_AT))
        .map(Long::valueOf)
        .orElse(null);
  }

  public String addEnvInfo(String msg) {
    return addEnvInfo(msg, true);
  }

  public String addEnvInfo(String msg, boolean addTimeUp) {

    final var builder = new StringBuilder(msg);
    Optional.of(cloud)
        .filter(s -> !s.isEmpty())
        .ifPresent(str -> builder.append("\n").append("CLOUD: ").append(str));

    Optional.of(currentIp())
        .filter(s -> !s.isEmpty())
        .ifPresent(str -> builder.append("\n").append("IP: ").append(str));

    SystemUtil.systemInfo()
        .forEach(str -> builder.append("\n").append(str));

    Optional.ofNullable(getAppStartedAt())
        .map(millis -> {

          final var date = Instant.ofEpochMilli(millis).atZone(DateUtil.VE_ZONE);
          final var dateTime = DateUtil.formatVe(date);

          if (!addTimeUp) {
            return "\nFecha de inicio: " + dateTime;
          }

          final var timeUp = System.currentTimeMillis() - millis;
          //log.info("APP_STARTED_AT {}", timeUp);
          String duration;

          if (timeUp < 1000) {
            duration = timeUp + "ms";
          } else {
            duration = ConvertUtil.formatDuration(timeUp);
          }

          return "%nFecha de inicio %s%nTIME UP: %s".formatted(dateTime, duration);
        })
        .ifPresent(str -> builder.append(" ").append(str));

    return builder.toString();
  }
}
