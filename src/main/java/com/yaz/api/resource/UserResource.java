package com.yaz.api.resource;

import com.yaz.api.domain.response.UserTableResponse;
import com.yaz.core.service.EncryptionService;
import com.yaz.core.service.entity.UserService;
import com.yaz.core.util.ConvertUtil;
import com.yaz.core.util.StringUtil;
import com.yaz.core.util.TemplateUtil;
import com.yaz.persistence.domain.IdentityProvider;
import com.yaz.persistence.domain.query.UserQuery;
import com.yaz.persistence.entities.User;
import io.quarkus.qute.CheckedTemplate;
import io.quarkus.qute.TemplateInstance;
import io.quarkus.security.Authenticated;
import io.quarkus.security.identity.SecurityIdentity;
import io.smallrye.mutiny.Uni;
import jakarta.inject.Inject;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jboss.resteasy.reactive.RestPath;
import org.jboss.resteasy.reactive.RestQuery;

@Path(UserResource.PATH)
@Slf4j
@Authenticated
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class UserResource {

  public static final String PATH = "/api/users";
  public static final String DELETE_PATH = PATH + "/";

  private final UserService service;
  private final EncryptionService encryptionService;

  @CheckedTemplate
  public static class Templates {

    public static native TemplateInstance users(UserTableResponse res);

    public static native TemplateInstance counters(long totalCount);

    public static native TemplateInstance picture(String picture);
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
    final var userId = encryptionService.decrypt(id);
    return service.delete(userId)
        .replaceWith(counters());
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

  @GET
  @Path("picture")
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> picture(@Context SecurityIdentity identity) {
    final var userId = identity.getAttribute("userId");
    if (userId == null) {
      log.info("User id not found in the security identity");
      return TemplateUtil.templateUni(Templates.picture(""));
    }

    return service.read(userId.toString())
        .map(opt -> opt.map(User::picture).orElse(""))
        .map(Templates::picture);
  }
}
