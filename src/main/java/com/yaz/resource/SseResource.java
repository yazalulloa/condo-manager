package com.yaz.resource;

import io.quarkus.security.Authenticated;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.sse.SseEventSink;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import com.yaz.service.ServerSideEventHelper;
import org.jboss.resteasy.reactive.RestPath;

@Path("/sse")
@Slf4j
@Authenticated
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class SseResource {

  private final ServerSideEventHelper serverSideEventHelper;

  @GET
  @Path("/{key}")
  @Produces(MediaType.SERVER_SENT_EVENTS)
  public void consume(@RestPath String key, @Context SseEventSink sseEventSink) {
    serverSideEventHelper.addSink(key, sseEventSink);
  }
}
