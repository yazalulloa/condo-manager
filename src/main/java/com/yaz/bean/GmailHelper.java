package com.yaz.bean;

import com.google.api.client.auth.oauth2.AuthorizationCodeFlow;
import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.auth.oauth2.TokenResponseException;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.gmail.Gmail;
import com.google.api.services.gmail.GmailScopes;
import com.yaz.persistence.entities.EmailConfig;
import com.yaz.util.DateUtil;
import com.yaz.util.FileUtil;
import io.smallrye.mutiny.Uni;
import io.smallrye.mutiny.infrastructure.Infrastructure;
import io.smallrye.mutiny.unchecked.Unchecked;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.eclipse.microprofile.config.inject.ConfigProperty;

@Slf4j
@ApplicationScoped
public class GmailHelper {

  public static final String DIR = "gmail";
  public static final List<String> SCOPES = List.of(GmailScopes.GMAIL_LABELS, GmailScopes.GMAIL_SEND);
  private final NetHttpTransport httpTransport = new NetHttpTransport();

  private final GsonFactory jsonFactory = GsonFactory.getDefaultInstance();

  private static final Map<String, AuthorizationCodeFlow> FLOW_MAP = new ConcurrentHashMap<>();

  private final String googleClientId;
  private final String googleClientSecret;
  private final String appName;

  @Inject
  public GmailHelper(
      @ConfigProperty(name = "app.gmail-google-client-id") String googleClientId,
      @ConfigProperty(name = "app.gmail-google-client-secret") String googleClientSecret,
      @ConfigProperty(name = "app.gmail-app-name") String appName) {
    this.googleClientId = googleClientId;
    this.googleClientSecret = googleClientSecret;
    this.appName = appName;
  }

  private AuthorizationCodeFlow initFlow(String userId) throws IOException {
    final var dataStoreFactory = new FileDataStoreFactory(new File(DIR + "/" + userId));
    return new GoogleAuthorizationCodeFlow.Builder(httpTransport, jsonFactory, googleClientId, googleClientSecret,
        SCOPES)
        .setDataStoreFactory(dataStoreFactory)
        .setAccessType("offline")
        //.setAccessType("online")
        .build();
  }

  public boolean clearFlow(String userId) {
    final var path = DIR + "/" + userId;
    try {
      FileUtils.deleteDirectory(new File(path));
      FLOW_MAP.remove(userId);
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

    final var newFlow = initFlow(userId);
    FLOW_MAP.put(userId, newFlow);
    return newFlow;
  }


  public Uni<Void> testCredential(Credential credential) {
    return Uni.createFrom().deferred(() -> {
      try {

//    log.info("credential: expires {} expires milliseconds {} access token {} refresh token {}",
//        credential.getExpiresInSeconds(), credential.getExpirationTimeMilliseconds(), credential.getAccessToken(),
//        credential.getRefreshToken());

        final var gmail = gmail(credential);
        final var labels = gmail.users().labels().list("me").execute().getLabels();
        return Uni.createFrom().voidItem();
      } catch (Exception e) {

        return Uni.createFrom().failure(e);
      }
    }).runSubscriptionOn(Infrastructure.getDefaultWorkerPool());

  }

  public Gmail gmail(Credential credential) {
    return new Gmail.Builder(httpTransport, jsonFactory, credential)
        .setApplicationName(appName)
        .build();
  }

  public Uni<EmailConfig> check(EmailConfig emailConfig) {

    return Uni.createFrom()
        .deferred(() -> {
          try {
            final var path = Paths.get(DIR, emailConfig.userId(), "StoredCredential");
            final var file = path.toFile();
            if (!file.exists()) {
              clearFlow(emailConfig.userId());
              log.info("File does not exists, writing  file");
              Paths.get(DIR, emailConfig.userId()).toFile().mkdirs();
              Files.write(file.toPath(), emailConfig.file());
            } else {
              final var hash = FileUtil.checksumInputStream(file);
              if (emailConfig.hash() != hash) {
                log.info("File changed, writing new file");
                clearFlow(emailConfig.userId());
                Paths.get(DIR, emailConfig.userId()).toFile().mkdirs();
                Files.write(file.toPath(), emailConfig.file());
                final var newHash = FileUtil.checksumInputStream(file);
                if (newHash != emailConfig.hash()) {
                  log.error("File changed, but hash is different");
                }
              }

            }

            final var flow = flow(emailConfig.userId());
            final var credential = flow.loadCredential(emailConfig.userId());

            return testCredential(credential)
                .map(Unchecked.function(v -> {
                  final var hash = FileUtil.checksumInputStream(file);
                  final var fileSize = FileUtil.fileSize(file);
                  final var bytes = Files.readAllBytes(path);

                  if (emailConfig.hash() != hash) {

                    return emailConfig.toBuilder()
                        .file(bytes)
                        .fileSize(fileSize)
                        .hash(hash)
                        .active(true)
                        .isAvailable(true)
                        .hasRefreshToken(credential.getRefreshToken() != null)
                        .expiresIn(credential.getExpirationTimeMilliseconds())
                        .updatedAt(DateUtil.utcLocalDateTime())
                        .lastCheckAt(DateUtil.utcLocalDateTime())
                        .stacktrace(null)
                        .build();
                  }

                  return emailConfig.toBuilder()
                      .lastCheckAt(DateUtil.utcLocalDateTime())
                      .stacktrace(null)
                      .isAvailable(true)
                      .build();
                }));


          } catch (Exception e) {
            if (e instanceof TokenResponseException) {
              log.debug("Error gmail check: {}", e.getMessage());
            } else {
              log.error("Error gmail check: ", e);
            }
            final var stacktrace = ExceptionUtils.getStackTrace(e);

            final var config = emailConfig.toBuilder()
                .isAvailable(false)
                .updatedAt(DateUtil.utcLocalDateTime())
                .lastCheckAt(DateUtil.utcLocalDateTime())
                .stacktrace(e.getMessage())
                .build();

            return Uni.createFrom().item(config);
          }
        }).runSubscriptionOn(Infrastructure.getDefaultWorkerPool());


  }
}
