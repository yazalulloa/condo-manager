package com.yaz.api.resource;

import com.yaz.core.util.EnvParams;
import com.yaz.core.util.SystemUtil;
import io.quarkus.cache.CacheManager;
import io.quarkus.security.Authenticated;
import io.smallrye.mutiny.Uni;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.nodes.Element;

@Slf4j
@Authenticated
@Path(ResourcesResource.PATH)
@RequiredArgsConstructor
public class ResourcesResource {

  public static final String PATH = "/api/resources";

  private final EnvParams envParams;
  private final CacheManager cacheManager;

  @GET
  @Produces(MediaType.TEXT_HTML)
  public Uni<String> resources() {
    final var html = new Element("div")
        .attr("hx-get", "/api/resources")
        .attr("hx-trigger", "load delay:1s")
        .attr("hx-swap", "outerHTML")
        .appendChild(new Element("p").text("STARTED AT: " + envParams.getAppStartedAtZonedDateTime()))
        .appendChild(new Element("p").text("IP: " + envParams.currentIp()))
        .appendChild(new Element("p").text(SystemUtil.processorsStr()))
        .appendChild(new Element("p").text(SystemUtil.maxMemoryStr()))
        .appendChild(new Element("p").text(SystemUtil.totalMemoryStr()))
        .appendChild(new Element("p").text(SystemUtil.freeMemoryStr()))
        .appendChild(new Element("p").text(SystemUtil.usedMemoryStr()))
        .appendChild(new Element("p").text(SystemUtil.freeSpaceStr()))
        .appendChild(new Element("p").text(SystemUtil.usableSpaceStr()))
        .appendChild(new Element("p").text(SystemUtil.totalSpaceStr()))
        .appendChild(new Element("p").text(SystemUtil.usedSpaceStr()))
        .toString();
    return Uni.createFrom().item(() -> html);
  }


}
