package com.yaz.util;

import java.time.Instant;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class EnvUtil {

  private static final String APP_STARTED_AT = "APP_STARTED_AT";
  private static final String CURRENT_IP = "CURRENT_IP";

  private EnvUtil() {
  }

  public static long getLong(String key) {
    return Optional.ofNullable(System.getenv(key))
        .map(str -> {
          try {
            return Long.parseLong(str);
          } catch (Exception e) {
            return null;
          }
        })
        .orElseThrow();
  }

  public static int getInt(String key, int dflt) {
    return Optional.ofNullable(System.getenv(key))
        .map(str -> {
          try {
            return Integer.parseInt(str);
          } catch (Exception e) {
            return null;
          }
        })
        .orElse(dflt);
  }

  public static boolean bool(String key) {
    return Optional.ofNullable(System.getenv(key))
        .map(str -> {
          try {
            return Boolean.parseBoolean(str);
          } catch (Exception e) {
            return false;
          }
        })
        .orElse(false);
  }

  public static void saveCurrentIp(String ip) {
    System.setProperty(CURRENT_IP, ip);
  }

  public static String currentIp() {
    return Optional.ofNullable(System.getProperty(CURRENT_IP))
        .orElse("");
  }

  public static String cloud() {
    return Optional.ofNullable(System.getenv("CLOUD_PROVIDER"))
        .orElse("");
  }

  public static boolean isShowDir() {
    return bool("SHOW_DIR");
  }

  public static boolean sendNotifications() {
    return bool("SEND_NOTIFICATIONS");
  }

  public static void saveAppStartedAt() {
    System.setProperty(APP_STARTED_AT, String.valueOf(System.currentTimeMillis()));
  }

  public static Long getAppStartedAt() {
    return Optional.ofNullable(System.getProperty(APP_STARTED_AT))
        .map(Long::valueOf)
        .orElse(null);
  }

  public static String addEnvInfo(String msg) {
    return addEnvInfo(msg, true);
  }

  public static String addEnvInfo(String msg, boolean addTimeUp) {

    final var builder = new StringBuilder(msg);
    Optional.of(cloud())
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

          final var duration = ConvertUtil.formatDuration(millis);

          return "%nFecha de inicio %s%nTIME UP %s".formatted(dateTime, duration);
        })
        .ifPresent(str -> builder.append(" ").append(str));

    return builder.toString();
  }
}
