package com.yaz.api.resource;

import com.google.api.client.auth.oauth2.AuthorizationCodeResponseUrl;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import com.google.api.client.http.GenericUrl;
import com.yaz.api.domain.response.EmailConfigTableItem;
import com.yaz.api.domain.response.EmailConfigTableResponse;
import com.yaz.core.helper.VertxHelper;
import com.yaz.core.service.entity.BuildingService;
import com.yaz.core.service.entity.EmailConfigService;
import com.yaz.core.service.gmail.GmailHelper;
import com.yaz.core.service.gmail.GmailService;
import com.yaz.core.service.gmail.GoogleHelper;
import com.yaz.core.util.DateUtil;
import com.yaz.core.util.MutinyUtil;
import com.yaz.core.util.RandomUtil;
import com.yaz.core.util.RxUtil;
import com.yaz.core.util.StringUtil;
import com.yaz.persistence.domain.query.EmailConfigQuery;
import com.yaz.persistence.entities.EmailConfig;
import io.quarkus.qute.CheckedTemplate;
import io.quarkus.qute.TemplateInstance;
import io.quarkus.security.Authenticated;
import io.reactivex.rxjava3.core.Single;
import io.smallrye.mutiny.Multi;
import io.smallrye.mutiny.Uni;
import io.vertx.core.http.HttpServerRequest;
import io.vertx.core.json.JsonObject;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.UriBuilder;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Base64;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.tuple.Pair;
import org.jboss.resteasy.reactive.RestPath;
import org.jboss.resteasy.reactive.RestQuery;

@Slf4j
@Authenticated
@Path(EmailConfigResource.PATH)
@RequiredArgsConstructor
public class EmailConfigResource {

  public static final String PATH = "/api/email_configs";
  public static final String DELETE_PATH = PATH + "/";

  private final EmailConfigService emailConfigService;
  private final GmailHelper gmailHelper;
  private final GoogleHelper googleHelper;
  private final GmailService gmailService;
  private final VertxHelper vertxHelper;
  private final BuildingService buildingService;

  private String getRedirectUri(HttpServerRequest req) {
    //log.info("getRedirectUri uri: {}", req.uri());
    //log.info("getRedirectUri absoluteURI: {}", req.absoluteURI());

    var uri = req.absoluteURI();
    if (uri.contains("?")) {
      uri = uri.substring(0, uri.indexOf("?"));
    }

    final var url = new GenericUrl(uri);
    if (!uri.startsWith("http://localhost")) {
      url.setScheme("https");
    }

    url.setRawPath(PATH + "/callback");
    return url.build();
  }

  private Response responseRedirect(String userId, HttpServerRequest request) throws IOException {
    final var flow = gmailHelper.flow(userId);
    final var authorizationUrl = flow.newAuthorizationUrl();
    authorizationUrl.setState(userId);
    authorizationUrl.setRedirectUri(getRedirectUri(request));

    final var url = UriBuilder.fromUri(authorizationUrl.build())
        //.queryParam("access_type", "offline")
        .queryParam("prompt", "consent")
        //.queryParam("prompt", "")
        .build()
        .toString();

    // log.info("responseRedirect url: {}", url);

    return Response.noContent()
        .header("HX-Redirect", url)
        .build();
  }

  @GET
  @Path("add")
  public Response redirect(HttpServerRequest request) throws IOException {
    return responseRedirect(RandomUtil.getRandNumb(20), request);
  }

  @GET
  @Path("error")
  public TemplateInstance error(@RestQuery String id) {
    final var json = StringUtil.trimFilter(id);

    if (json == null) {
      return Templates.refresh("/");
    }

    try {
      final var decoded = Base64.getUrlDecoder().decode(json.getBytes());
      final var msg = new String(decoded);
      return Templates.error(msg);
    } catch (Exception e) {
      log.error("error: {}", e.getMessage());
      return Templates.error("Unknown error");
    }
  }

  private Response errorRedirect(String msg) throws URISyntaxException {
    return Response.temporaryRedirect(
        new URI("/email_configs/error/" + Base64.getUrlEncoder().encodeToString(msg.getBytes()))).build();
  }

  @GET
  @Path("callback")
  public Uni<Response> callback(HttpServerRequest request) {

    final var single = Single.defer(() -> {
          final var responseUrl = new AuthorizationCodeResponseUrl(request.absoluteURI() + "?" + request.query());
          // log.info("callback: {}", request.uri());

          final var code = responseUrl.getCode();
          if (responseUrl.getError() != null) {
            final var jsonObject = new JsonObject()
                .put("error", responseUrl.getError())
                .put("errorDescription", responseUrl.getErrorDescription())
                .put("errorUri", responseUrl.getErrorUri());

            log.error("callback error: {}", jsonObject);

            final var error = Optional.ofNullable(responseUrl.getErrorDescription())
                .orElse(responseUrl.getError());

            return Single.just(errorRedirect(error));
          } else if (code == null) {
            return Single.just(errorRedirect("Missing code"));
          } else {

            //final var userId = getUserId(identity);
            final var userId = request.params().get("state");
            final var flow = gmailHelper.flow(userId);

            final var redirectUri = getRedirectUri(request);
            //log.info("callback redirectUri: {}", redirectUri);

            final var response = (GoogleTokenResponse) flow.newTokenRequest(code).setRedirectUri(redirectUri).execute();

            final var completeScopes = GoogleHelper.SCOPES.stream()
                .map(scope -> response.getScope().contains(scope))
                .reduce(Boolean::logicalAnd)
                .orElse(false);

            if (!completeScopes) {
              return Single.just(errorRedirect("Missing functionality"));
            }

            log.debug("token response: {}", response);
            final var googleIdToken = googleHelper.googleIdTokenVerifier().verify(response.getIdToken());
            final var payload = googleIdToken.getPayload();

            log.debug("googleIdToken: {}", googleIdToken);
            final var credential = flow.createAndStoreCredential(response, userId);

            return RxUtil.completable(gmailHelper.testCredential(credential))
                .andThen(vertxHelper.fileWithHash(GmailHelper.DIR + "/" + userId + "/StoredCredential"))
                .map(fileWithHash -> {
                  final var emailConfig = EmailConfig.builder()
                      .subject(payload.getSubject())
                      .email(payload.getEmail())
                      .name(payload.get("name").toString())
                      .picture(payload.get("picture").toString())
                      .givenName(payload.get("given_name").toString())
                      .id(userId)
                      .file(fileWithHash.buffer().getBytes())
                      .fileSize(fileWithHash.fileSize())
                      .hash(fileWithHash.crc32())
                      .active(true)
                      .isAvailable(true)
                      .hasRefreshToken(credential.getRefreshToken() != null)
                      .expiresIn(credential.getExpirationTimeMilliseconds())
                      .createdAt(DateUtil.utcLocalDateTime())
                      .build();

                  return emailConfigService.create(emailConfig)
                      .flatMap(this::changeBuildings)
                      .replaceWith(Response.temporaryRedirect(new URI("/")).build());
                })
                .flatMap(RxUtil::single);
          }
        })
        .onErrorReturn(throwable -> {
          log.error("callback error: ", throwable);
          return errorRedirect("Unknown error");
        });

    return MutinyUtil.toUni(single);
  }

  @GET
  @Path("counters")
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> counters() {
    return emailConfigService.count()
        .map(Templates::counters);
  }

  @DELETE
  @Path("{id}")
  @Produces
  public Uni<TemplateInstance> delete(@RestPath String id) {
    return emailConfigService.delete(id)
        .replaceWith(counters());
  }

  @GET
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> configs(@RestQuery String lastId, @RestQuery String user) {

    final var query = EmailConfigQuery.builder()
        .lastId(StringUtil.trimFilter(lastId))
        .user(StringUtil.trimFilter(user))
        .build();

    return emailConfigService.table(query)
        .map(Templates::table);
  }

  @PUT
  @Path("check/{id}")
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> check(@RestPath String id) {

    final var single = gmailService.loadItem(id)
        .map(Templates::item)
        .switchIfEmpty(Single.fromCallable(() -> Templates.refresh("/")));

    return MutinyUtil.toUni(single);
  }

  private Uni<Void> changeBuildings(EmailConfig emailConfig) {
    return emailConfigService.selectByEmail(emailConfig.email(), emailConfig.id())
        .flatMap(list -> {
          return Multi.createFrom().iterable(list)
              .onItem()
              .transformToUni(config -> {
                return buildingService.updateEmailConfig(config.id(), emailConfig.id());
              })
              .merge()
              .collect()
              .asList()
              .map(l -> l.stream().reduce(Integer::sum).orElse(0))
              .flatMap(buildingsChanged -> {

                return Multi.createFrom().iterable(list)
                    .map(EmailConfig::id)
                    .onItem()
                    .transformToUni(emailConfigService::delete)
                    .merge()
                    .collect()
                    .asList()
                    .map(l -> l.stream().reduce(Integer::sum).orElse(0))
                    .map(emailConfigsDeleted -> {
                      return Pair.of(buildingsChanged, emailConfigsDeleted);
                    });

              });
        })
        .invoke(pair -> log.debug("buildingsChanged: {} emailConfigsDeleted {}", pair.getLeft(), pair.getRight()))
        .replaceWithVoid();
  }

  @CheckedTemplate
  public static class Templates {

    public static native TemplateInstance table(EmailConfigTableResponse res);

    public static native TemplateInstance counters(long totalCount);

    public static native TemplateInstance refresh(String url);

    public static native TemplateInstance item(EmailConfigTableItem res);

    public static native TemplateInstance error(String msg);
  }
}
