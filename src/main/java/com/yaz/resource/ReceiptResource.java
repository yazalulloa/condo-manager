package com.yaz.resource;

import com.yaz.persistence.domain.query.ReceiptQuery;
import com.yaz.persistence.entities.Receipt.Keys;
import com.yaz.resource.domain.response.ReceiptTableResponse;
import com.yaz.service.EncryptionService;
import com.yaz.service.ReceiptService;
import com.yaz.util.StringUtil;
import io.quarkus.qute.CheckedTemplate;
import io.quarkus.qute.TemplateInstance;
import io.smallrye.mutiny.Uni;
import jakarta.inject.Inject;
import jakarta.validation.constraints.NotBlank;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import java.util.Optional;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jboss.resteasy.reactive.RestPath;
import org.jboss.resteasy.reactive.RestQuery;

@Path(ReceiptResource.PATH)
@Slf4j
//@Authenticated
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class ReceiptResource {

  public static final String PATH = "/api/receipts";
  public static final String DELETE_PATH = PATH + "/";

  private final ReceiptService service;
  private final EncryptionService encryptionService;

  @CheckedTemplate
  public static class Templates {

    public static native TemplateInstance receipts(ReceiptTableResponse res);

    public static native TemplateInstance counters(long totalCount);
  }

  @GET
  @Path("counters")
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> counters(@RestQuery Set<String> building) {

//    final var apartmentQuery = ApartmentQuery.builder()
//        .q(StringUtil.trimFilter(q))
//        .buildings(building)
//        .build();
//
//    return apartmentService.counters(apartmentQuery)
//        .map(ApartmentsResource.Templates::counters);

    return service.count()
        .map(Templates::counters);
  }

  @GET
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> receipts(@RestQuery String nextPage, @RestQuery Set<String> building) {
    final var nextKeys = Optional.ofNullable(nextPage)
        .map(StringUtil::trimFilter)
        .map(str -> encryptionService.decryptObj(str, Keys.class));

    final var receiptQuery = ReceiptQuery.builder()
        .lastBuildingId(nextKeys.map(Keys::buildingId).orElse(null))
        .lastId(nextKeys.map(Keys::id).orElse(null))
        .buildings(building)
        .build();

    return service.table(receiptQuery)
        .map(Templates::receipts);
  }

  @DELETE
  @Path("{keys}")
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> delete(@NotBlank @RestPath String keys, @RestQuery Set<String> building) {
    final var key = encryptionService.decryptObj(keys, Keys.class);

    return service.delete(key.buildingId(), key.id())
        .replaceWith(counters(building));
  }
}
