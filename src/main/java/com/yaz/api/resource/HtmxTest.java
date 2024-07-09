package com.yaz.api.resource;

import com.yaz.api.domain.HtmxTestResponse;
import com.yaz.core.util.RandomUtil;
import io.quarkus.qute.CheckedTemplate;
import io.quarkus.qute.TemplateInstance;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.PATCH;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import lombok.RequiredArgsConstructor;

@Path("/api/htmx_test")
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class HtmxTest {

  public HtmxTestResponse res() {
    return HtmxTestResponse.builder()
        .random(RandomUtil.randomInt())
        .value(RandomUtil.randomStr(6))
        .name(RandomUtil.randomStr(8))
        .id(RandomUtil.randomInt())
        .is(RandomUtil.getInstance().nextBoolean())
        .build();
  }

  @POST
  @Produces(MediaType.TEXT_HTML)
  public TemplateInstance form() {

    return Templates.form(res());
  }

  @PATCH
  @Produces(MediaType.TEXT_HTML)
  public TemplateInstance patch() {
    return Templates.form(res());
  }

  @GET
  @Produces(MediaType.TEXT_HTML)
  public TemplateInstance getForm() {
    return Templates.form(res());
  }

  @CheckedTemplate
  public static class Templates {

    public static native TemplateInstance form(HtmxTestResponse res);
  }


}
