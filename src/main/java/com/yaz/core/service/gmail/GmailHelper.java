package com.yaz.core.service.gmail;

import com.google.api.client.auth.oauth2.AuthorizationCodeFlow;
import com.google.api.client.auth.oauth2.Credential;
import io.smallrye.mutiny.Uni;
import io.smallrye.mutiny.infrastructure.Infrastructure;
import io.vertx.rxjava3.core.Vertx;
import jakarta.enterprise.context.ApplicationScoped;
import java.io.File;
import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FileUtils;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor
public class GmailHelper {

  public static final String DIR = "gmail-configs";

  private static final Map<String, AuthorizationCodeFlow> FLOW_MAP = new ConcurrentHashMap<>();
  private static final Map<String, GmailHolder> HOLDER_MAP = new ConcurrentHashMap<>();
  private final Vertx vertx;
  private final GoogleHelper googleHelper;

  public boolean clearFlow(String userId) {
    return clearFlow(userId, true);
  }

  public boolean clearFlow(String userId, boolean deleteDir) {
    final var path = DIR + "/" + userId;
    try {
      if (deleteDir) {
        FileUtils.deleteDirectory(new File(path));
      }
      FLOW_MAP.remove(userId);
      HOLDER_MAP.remove(userId);
      return true;
    } catch (IOException e) {
      log.error("Failed to delete {} Error: ", path, e);
      return false;
    }
  }


  public AuthorizationCodeFlow flow(String userId) throws IOException {
    final var flow = FLOW_MAP.get(userId);
    if (flow != null) {
      return flow;
    }

    final var newFlow = googleHelper.flow(userId);
    FLOW_MAP.put(userId, newFlow);
    return newFlow;
  }


  public Uni<Void> testCredential(Credential credential) {
    return Uni.createFrom().deferred(() -> {
      try {

//    log.info("credential: expires {} expires milliseconds {} access token {} refresh token {}",
//        credential.getExpiresInSeconds(), credential.getExpirationTimeMilliseconds(), credential.getAccessToken(),
//        credential.getRefreshToken());

        final var gmail = googleHelper.gmail(credential);
        //final var profile = gmail.users().getProfile("me").execute();
        // log.info("profile: {}", profile);
        final var labels = gmail.users().labels().list("me").execute().getLabels();
        return Uni.createFrom().voidItem();
      } catch (Exception e) {

        return Uni.createFrom().failure(e);
      }
    }).runSubscriptionOn(Infrastructure.getDefaultWorkerPool());

  }

  public Credential credential(String userId) throws IOException {
    return flow(userId).loadCredential(userId);
  }

  public GmailHolder gmail(String userId) {
    return HOLDER_MAP.computeIfAbsent(userId, k -> {
      try {
        final var credential = credential(userId);
        return new GmailHolder(userId, vertx, credential, googleHelper.gmail(credential));
      } catch (IOException e) {
        log.error("Failed to create GmailHolder", e);
        return null;
      }
    });
  }
}
