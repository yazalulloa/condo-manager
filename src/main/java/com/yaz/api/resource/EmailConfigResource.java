package com.yaz.api.resource;

import com.google.api.client.auth.oauth2.AuthorizationCodeResponseUrl;
import com.google.api.client.http.GenericUrl;
import com.yaz.api.domain.response.EmailConfigTableItem;
import com.yaz.api.domain.response.EmailConfigTableResponse;
import com.yaz.core.helper.VertxHelper;
import com.yaz.core.service.entity.EmailConfigService;
import com.yaz.core.service.gmail.GmailHelper;
import com.yaz.core.service.gmail.GmailService;
import com.yaz.core.util.DateUtil;
import com.yaz.core.util.MutinyUtil;
import com.yaz.core.util.RandomUtil;
import com.yaz.core.util.RxUtil;
import com.yaz.core.util.StringUtil;
import com.yaz.persistence.domain.query.EmailConfigQuery;
import com.yaz.persistence.entities.EmailConfig;
import io.quarkus.qute.CheckedTemplate;
import io.quarkus.qute.TemplateInstance;
import io.quarkus.security.identity.SecurityIdentity;
import io.reactivex.rxjava3.core.Single;
import io.smallrye.mutiny.Uni;
import io.vertx.core.http.HttpServerRequest;
import io.vertx.core.json.JsonObject;
import jakarta.inject.Inject;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.UriBuilder;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jboss.resteasy.reactive.RestPath;
import org.jboss.resteasy.reactive.RestQuery;

@Slf4j
@Path(EmailConfigResource.PATH)
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class EmailConfigResource {

  public static final String PATH = "/api/email_configs";
  public static final String DELETE_PATH = PATH + "/";

  private final EmailConfigService service;
  private final GmailHelper gmailHelper;
  private final GmailService gmailService;
  private final VertxHelper vertxHelper;

  @CheckedTemplate
  public static class Templates {

    public static native TemplateInstance table(EmailConfigTableResponse res);

    public static native TemplateInstance counters(long totalCount);

    public static native TemplateInstance refresh(String url);

    public static native TemplateInstance item(EmailConfigTableItem res);
  }


  private String getUserId(SecurityIdentity identity) {
    final var userId = Objects.requireNonNull(identity.getAttribute("userId")).toString();
    log.info("userId: {}", userId);
    return userId;
  }

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
    authorizationUrl.setState(RandomUtil.randomIntStr(10));
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
  public Uni<?> redirect(HttpServerRequest request, @Context SecurityIdentity securityContext)
      throws URISyntaxException, IOException {
    log.info("securityContext: {}", securityContext);

    final var userId = getUserId(securityContext);
    final var single = gmailService.loadItem(userId)
        .map(item -> {

          if (item.getItem().shouldGetNewOne() || item.getItem().emailConfig().stacktrace() != null) {
            return responseRedirect(userId, request);
          } else {
            final var tableItem = item.toBuilder()
                .outOfBoundUpdate(true)
                .build();
            return Templates.item(tableItem);
          }

        })
        .switchIfEmpty(Single.fromCallable(() -> responseRedirect(userId, request)));

    return MutinyUtil.toUni(single);

  }

  @GET
  @Path("callback")
  public Uni<Response> callback(HttpServerRequest request, @Context SecurityIdentity identity) {

    final var single = Single.defer(() -> {
      final var responseUrl = new AuthorizationCodeResponseUrl(request.absoluteURI() + "?" + request.query());
      // log.info("callback: {}", request.uri());

      final var code = responseUrl.getCode();
      if (responseUrl.getError() != null) {
        final var jsonObject = new JsonObject()
            .put("error", responseUrl.getError())
            .put("errorDescription", responseUrl.getErrorDescription())
            .put("errorUri", responseUrl.getErrorUri());

        return Single.just(Response.status(200).entity(jsonObject).build());
      } else if (code == null) {
        return Single.just(Response.status(400).entity("Missing authorization code").build());
      } else {

        final var flow = gmailHelper.flow(getUserId(identity));

        final var redirectUri = getRedirectUri(request);
        //log.info("callback redirectUri: {}", redirectUri);

        final var response = flow.newTokenRequest(code).setRedirectUri(redirectUri).execute();
        final var userId = getUserId(identity);
        //log.info("token response: {}", response);
        final var credential = flow.createAndStoreCredential(response, userId);

        return RxUtil.completable(gmailHelper.testCredential(credential))
            .andThen(vertxHelper.fileWithHash(GmailHelper.DIR + "/" + userId + "/StoredCredential"))
            .map(fileWithHash -> {
              final var emailConfig = EmailConfig.builder()
                  .userId(userId)
                  .file(fileWithHash.buffer().getBytes())
                  .fileSize(fileWithHash.fileSize())
                  .hash(fileWithHash.crc32())
                  .active(true)
                  .isAvailable(true)
                  .hasRefreshToken(credential.getRefreshToken() != null)
                  .expiresIn(credential.getExpirationTimeMilliseconds())
                  .createdAt(DateUtil.utcLocalDateTime())
                  .build();

              return service.create(emailConfig)
                  .replaceWith(Response.temporaryRedirect(new URI("/")).build());
            })
            .flatMap(RxUtil::single);
      }
    });

    return MutinyUtil.toUni(single);
  }

  @GET
  @Path("counters")
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> counters() {
    return service.count()
        .map(Templates::counters);
  }

  @DELETE
  @Path("{id}")
  @Produces
  public Uni<TemplateInstance> delete(@RestPath String id) {
    return service.delete(id)
        .replaceWith(counters());
  }

  @GET
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> configs(@RestQuery String lastId, @RestQuery String user) {

    final var query = EmailConfigQuery.builder()
        .lastId(StringUtil.trimFilter(lastId))
        .user(StringUtil.trimFilter(user))
        .build();

    return service.table(query)
        .map(Templates::table);
  }

  @PUT
  @Path("check/{id}")
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> check(@RestPath String id) {

    final var single = gmailService.loadItem(id)
        .map(Templates::item)
        .switchIfEmpty(Single.fromCallable(() -> {
          return Templates.refresh("/");
        }));

    return MutinyUtil.toUni(single);
  }
}
