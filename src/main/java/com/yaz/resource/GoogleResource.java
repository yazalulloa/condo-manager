package com.yaz.resource;

import com.google.api.client.auth.oauth2.AuthorizationCodeResponseUrl;
import com.google.api.client.http.GenericUrl;
import com.google.api.services.gmail.GmailScopes;
import com.yaz.bean.GmailHelper;
import com.yaz.persistence.entities.EmailConfig;
import com.yaz.service.EmailConfigService;
import com.yaz.util.DateUtil;
import com.yaz.util.FileUtil;
import com.yaz.util.MutinyUtil;
import com.yaz.util.RandomUtil;
import com.yaz.util.RxUtil;
import io.quarkus.oidc.UserInfo;
import io.quarkus.qute.CheckedTemplate;
import io.quarkus.qute.TemplateInstance;
import io.quarkus.security.Authenticated;
import io.quarkus.security.identity.SecurityIdentity;
import io.reactivex.rxjava3.core.Single;
import io.smallrye.mutiny.Uni;
import io.vertx.core.http.HttpServerRequest;
import io.vertx.core.json.JsonObject;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.UriBuilder;
import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Objects;
import lombok.extern.slf4j.Slf4j;

//@Slf4j
//@Authenticated
//@Path(GoogleResource.PATH)
//public class GoogleResource {
//
//  public static List<String> SCOPES = List.of(GmailScopes.GMAIL_LABELS, GmailScopes.GMAIL_SEND);
//  public static final String PATH = "/api/google";
////  /**
////   * Lock on the flow and credential.
////   */
////  private final Lock lock = new ReentrantLock();
////
////  /**
////   * Persisted credential associated with the current request or {@code null} for none.
////   */
////  private Credential credential;
////
////  private AuthorizationCodeFlow flow;
//
//
//  @Inject
//  UserInfo userInfo;
//  @Inject
//  SecurityIdentity identity;
//
//
//  private final GmailHelper googleHelper;
//  private final EmailConfigService emailConfigService;
//
//  @Inject
//  public GoogleResource(GmailHelper googleHelper, EmailConfigService emailConfigService) {
//    this.googleHelper = googleHelper;
//    this.emailConfigService = emailConfigService;
//  }
//
//  @GET
//  @Path("redirect")
//  public Response redirect(HttpServerRequest request) throws URISyntaxException, IOException {
//
//    final var userId = getUserId();
//    final var flow = googleHelper.flow(userId);
//    final var credential = flow.loadCredential(userId);
//
//    // if credential found with an access token, invoke the user code
//    if (credential != null && credential.getAccessToken() != null) {
//      googleHelper.testNoError(credential);
//      log.info("return null");
//      return Response.noContent().build();
//
//    }
//    // redirect to the authorization flow
//    final var authorizationUrl = flow.newAuthorizationUrl();
//    authorizationUrl.setState(RandomUtil.randomIntStr(10));
//    authorizationUrl.setRedirectUri(getRedirectUri(request));
//
//    final var service = authorizationUrl.build();
//
//    final var url = UriBuilder.fromUri(service)
//        //.queryParam("access_type", "offline")
//        .queryParam("prompt", "consent")
//        //.queryParam("prompt", "")
//        .build()
//        .toString();
//
//    return Response.noContent()
//        .header("HX-Redirect", url)
//        .build();
//
////    return Response.status(Status.FOUND).location(new URI(url))
////        .header("Access-Control-Allow-Origin", "*")
////        .build();
//  }
//
////  @GET
////  @Path("redirect")
////  public TemplateInstance redirect() throws URISyntaxException {
////    final var url = new GoogleBrowserClientRequestUrl(
////        "99115268508-nictg92majsd95mvlchtp0smuhqsf3u1.apps.googleusercontent.com",
////        "http://localhost:13835/api/google/callback", SCOPES).setState(RandomUtil.randomIntStr(10)).build();
////
////    return Templates.redirect(url);
////  }
//
//
//  @GET
//  @Path("callback")
//  public Uni<Response> callback(HttpServerRequest request) {
//
//    final var single = Single.defer(() -> {
//      final var responseUrl = new AuthorizationCodeResponseUrl(request.absoluteURI() + "?" + request.query());
//      log.info("callback: {}", request.uri());
//
//      final var code = responseUrl.getCode();
//      if (responseUrl.getError() != null) {
//        final var jsonObject = new JsonObject()
//            .put("error", responseUrl.getError())
//            .put("errorDescription", responseUrl.getErrorDescription())
//            .put("errorUri", responseUrl.getErrorUri());
//
//        return Single.just(Response.status(200).entity(jsonObject).build());
//      } else if (code == null) {
//        return Single.just(Response.status(400).entity("Missing authorization code").build());
//      } else {
//
//        final var flow = googleHelper.flow(getUserId());
//
//        final var redirectUri = getRedirectUri(request);
//        log.info("callback redirectUri: {}", redirectUri);
//
//        final var response = flow.newTokenRequest(code).setRedirectUri(redirectUri).execute();
//        final var userId = getUserId();
//        log.info("token response: {}", response);
//        final var credential = flow.createAndStoreCredential(response, userId);
//        googleHelper.testNoError(credential);
//        final var fileName = GmailHelper.DIR + "/" + userId + "/StoredCredential";
//        final var hash = FileUtil.checksumInputStream(new File(fileName));
//        final var fileSize = FileUtil.fileSize(new File(fileName));
//        final var file = Files.readAllBytes(Paths.get(fileName));
//
//        final var emailConfig = EmailConfig.builder()
//            .userId(userId)
//            .file(file)
//            .fileSize(fileSize)
//            .hash(hash)
//            .active(true)
//            .isAvailable(true)
//            .hasRefreshToken(credential.getRefreshToken() != null)
//            .expiresIn(credential.getExpirationTimeMilliseconds())
//            .createdAt(DateUtil.utcLocalDateTime())
//            .build();
//
//        final var responseUni = emailConfigService.create(emailConfig)
//            .replaceWith(Response.temporaryRedirect(new URI("/")).build());
//
//        return RxUtil.single(responseUni);
//      }
//    });
//
//    return MutinyUtil.toUni(single);
//  }
//
//  private String getUserId() {
//    final var userId = Objects.requireNonNull(identity.getAttribute("userId")).toString();
//    log.info("userId: {}", userId);
//    return userId;
//  }
//
//
//  protected String getRedirectUri(HttpServerRequest req) {
//    //log.info("getRedirectUri uri: {}", req.uri());
//    //log.info("getRedirectUri absoluteURI: {}", req.absoluteURI());
//
//    var uri = req.absoluteURI();
//    if (uri.contains("?")) {
//      uri = uri.substring(0, uri.indexOf("?"));
//    }
//
//    final var url = new GenericUrl(uri);
//    url.setRawPath("/api/google/callback");
//    return url.build();
//  }
//}
