package com.yaz.api.resource;

import io.quarkus.qute.CheckedTemplate;
import io.quarkus.qute.TemplateInstance;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import org.jboss.resteasy.reactive.Cache;

@ApplicationScoped
@Path("/api/stc")
public class fragments {

  @CheckedTemplate
  public static class Fragments {

    public static native TemplateInstance rateInfo(String msg);

    public static native TemplateInstance currencyData();
  }

  @GET
  @Path("/currencies")
  @Cache(maxAge = 21600)
  @Produces(MediaType.TEXT_HTML)
  public TemplateInstance currencyData() {
    return Fragments.currencyData();
  }
}
