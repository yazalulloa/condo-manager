package com.yaz.resource;

import com.yaz.persistence.domain.IdentityProvider;
import com.yaz.persistence.domain.query.UserQuery;
import com.yaz.resource.domain.response.UserTableResponse;
import com.yaz.service.EmailConfigService;
import com.yaz.service.NotificationEventService;
import com.yaz.service.OidcDbTokenService;
import com.yaz.service.TelegramChatService;
import com.yaz.service.UserService;
import com.yaz.util.ConvertUtil;
import com.yaz.util.StringUtil;
import io.quarkus.qute.CheckedTemplate;
import io.quarkus.qute.TemplateInstance;
import io.smallrye.mutiny.Uni;
import jakarta.inject.Inject;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jboss.resteasy.reactive.RestPath;
import org.jboss.resteasy.reactive.RestQuery;

@Path(UserResource.PATH)
@Slf4j
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class UserResource {

  public static final String PATH = "/api/users";
  public static final String DELETE_PATH = PATH + "/";

  private final UserService service;
  private final EmailConfigService emailConfigService;
  private final OidcDbTokenService tokenService;
  private final NotificationEventService notificationEventService;
  private final TelegramChatService telegramChatService;

  @CheckedTemplate
  public static class Templates {

    public static native TemplateInstance users(UserTableResponse res);

    public static native TemplateInstance counters(long totalCount);
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
        .replaceWith(counters())
        .eventually(() -> tokenService.deleteByUser(id))
        .eventually(() -> emailConfigService.delete(id))
        .eventually(() -> notificationEventService.deleteByUser(id))
        .eventually(() -> telegramChatService.deleteByUser(id));
  }

  @GET
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> users(@RestQuery String lastId, @RestQuery String identityProvider,
      @RestQuery String q) {

    final var userQuery = UserQuery.builder()
        .lastId(StringUtil.trimFilter(lastId))
        .identityProvider(ConvertUtil.valueOfEnum(IdentityProvider.class, identityProvider))
        .q(StringUtil.trimFilter(q))
        .build();

    return service.table(userQuery)
        .map(Templates::users);
  }
}
