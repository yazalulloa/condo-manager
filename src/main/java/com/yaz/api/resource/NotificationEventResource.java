package com.yaz.api.resource;

import com.yaz.core.service.entity.NotificationEventService;
import com.yaz.persistence.entities.NotificationEvent;
import io.quarkus.security.Authenticated;
import io.smallrye.mutiny.Uni;
import jakarta.inject.Inject;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jboss.resteasy.reactive.RestForm;
import org.jboss.resteasy.reactive.RestPath;

@Slf4j
@Authenticated
@Path(NotificationEventResource.PATH)
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class NotificationEventResource {

  public static final String PATH = "/api/notification_events";
  public static final String DELETE_PATH = PATH + "/";

  private final NotificationEventService service;


  @POST
  @Path("{userId}/{event}")
  @Produces(MediaType.TEXT_HTML)
  public Uni<Response> insert(
      @RestPath String userId, @RestPath NotificationEvent.Event event, @RestForm boolean mode) {

    return Uni.createFrom().deferred(() -> {
      if (mode) {
        return service.insert(userId, event);
      }
      return service.delete(userId, event);

    }).replaceWith(Response.noContent().build());
  }
}
