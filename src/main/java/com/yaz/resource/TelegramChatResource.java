package com.yaz.resource;


import io.quarkus.security.identity.SecurityIdentity;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Response;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.eclipse.microprofile.config.inject.ConfigProperty;

@Path(TelegramChatResource.PATH)
@Slf4j
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class TelegramChatResource {

  public static final String PATH = "/api/telegram_chats";
  public static final String DELETE_PATH = PATH + "/";

  @ConfigProperty(name = "app.telegram.start_url")
  String startUrl;
  @Inject
  SecurityIdentity identity;

  @GET
  @Path("start_url")
  public Response startUrl() {
    final var userId = identity.getAttribute("userId");
    if (userId == null) {
      return Response.status(Response.Status.UNAUTHORIZED).build();
    }
    return Response.temporaryRedirect(URI.create(startUrl + userId)).build();
  }

}
