package com.yaz.core.service.gmail;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow.Builder;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.auth.oauth2.GooglePublicKeysManager;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.gmail.Gmail;
import com.google.api.services.gmail.GmailScopes;
import com.yaz.core.service.gmail.domain.GmailConfig;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.experimental.Accessors;

@Accessors(fluent = true)
@RequiredArgsConstructor
public final class GoogleHelper {

  public static final List<String> SCOPES = List.of("openid", "email", "profile", GmailScopes.GMAIL_LABELS,
      GmailScopes.GMAIL_SEND);

  private final GmailConfig gmailConfig;

  @Getter(lazy = true)
  private final NetHttpTransport httpTransport = initHttpTransport();

  @Getter(lazy = true)
  private final GsonFactory jsonFactory = initJsonFactory();

  @Getter(lazy = true)
  private final GooglePublicKeysManager publicKeysManager = initGooglePublicKeysManager();

  @Getter(lazy = true)
  private final GoogleIdTokenVerifier googleIdTokenVerifier = initGoogleIdTokenVerifier();

  private GoogleIdTokenVerifier initGoogleIdTokenVerifier() {
    assert gmailConfig != null;
    return new GoogleIdTokenVerifier.Builder(publicKeysManager())
        .setAudience(List.of(gmailConfig.clientId()))
        .build();
  }


  private NetHttpTransport initHttpTransport() {
    return new NetHttpTransport();
  }

  private GsonFactory initJsonFactory() {
    return GsonFactory.getDefaultInstance();
  }

  private GooglePublicKeysManager initGooglePublicKeysManager() {
    return new GooglePublicKeysManager(httpTransport(), jsonFactory());
  }

  public GoogleAuthorizationCodeFlow flow(String userId) throws IOException {
    final var file = Paths.get(GmailHelper.DIR, userId).toFile();
    file.mkdirs();
    final var dataStoreFactory = new FileDataStoreFactory(file);
    return new Builder(httpTransport(), jsonFactory(), gmailConfig.clientId(), gmailConfig.clientSecret(),
        SCOPES)
        .setDataStoreFactory(dataStoreFactory)
        .setAccessType("offline")
        //.setAccessType("online")
        .build();
  }

  public Gmail gmail(Credential credential) {
    return new Gmail.Builder(httpTransport(), jsonFactory(), credential)
        .setApplicationName(gmailConfig.appName())
        .build();
  }


}
