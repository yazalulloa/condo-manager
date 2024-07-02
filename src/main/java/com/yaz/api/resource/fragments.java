package com.yaz.api.resource;

import io.quarkus.qute.CheckedTemplate;
import io.quarkus.qute.TemplateInstance;
import io.quarkus.security.Authenticated;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import org.jboss.resteasy.reactive.Cache;

@ApplicationScoped
@Authenticated
@Path("/api/stc")
public class fragments {

  public static final int CACHE_MAX_AGE = 21600;

  @CheckedTemplate
  public static class Fragments {

    public static native TemplateInstance rateInfo(String msg);

    public static native TemplateInstance currencyData();

    public static native TemplateInstance reserveFundTypes();

    public static native TemplateInstance expenseTypes();

    public static native TemplateInstance csrf();
  }

  @GET
  @Path("/currencies")
  @Cache(maxAge = CACHE_MAX_AGE)
  @Produces(MediaType.TEXT_HTML)
  public TemplateInstance currencyData() {
    return Fragments.currencyData();
  }

  @GET
  @Path("/reserveFundTypes")
  @Cache(maxAge = CACHE_MAX_AGE)
  @Produces(MediaType.TEXT_HTML)
  public TemplateInstance reserveFundTypes() {
    return Fragments.reserveFundTypes();
  }

  @GET
  @Path("/expenseTypes")
  @Cache(maxAge = CACHE_MAX_AGE)
  @Produces(MediaType.TEXT_HTML)
  public TemplateInstance expenseTypes() {
    return Fragments.expenseTypes();
  }

  @GET
  @Path("csrf")
  @Produces(MediaType.TEXT_HTML)
  public TemplateInstance csrf() {
    return Fragments.csrf();
  }
}
