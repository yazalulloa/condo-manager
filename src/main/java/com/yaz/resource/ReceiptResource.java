package com.yaz.resource;

import com.yaz.persistence.domain.query.ReceiptQuery;
import com.yaz.persistence.entities.Receipt.Keys;
import com.yaz.resource.domain.response.ReceiptPdfResponse;
import com.yaz.resource.domain.response.ReceiptTableResponse;
import com.yaz.service.EncryptionService;
import com.yaz.service.domain.FileResponse;
import com.yaz.service.entity.ReceiptService;
import com.yaz.service.pdf.ReceiptPdfService;
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
import jakarta.ws.rs.core.Response;
import java.io.File;
import java.util.Optional;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jboss.resteasy.reactive.RestPath;
import org.jboss.resteasy.reactive.RestQuery;
import org.jboss.resteasy.reactive.RestResponse;
import org.jboss.resteasy.reactive.RestResponse.ResponseBuilder;

@Path(ReceiptResource.PATH)
@Slf4j
//@Authenticated
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class ReceiptResource {

  public static final String PATH = "/api/receipts";
  public static final String DELETE_PATH = PATH + "/";

  private final ReceiptService service;
  private final EncryptionService encryptionService;
  private final ReceiptPdfService receiptPdfService;

  @CheckedTemplate
  public static class Templates {

    public static native TemplateInstance receipts(ReceiptTableResponse res);

    public static native TemplateInstance counters(long totalCount);

    public static native TemplateInstance pdfs(ReceiptPdfResponse res);
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

  @GET
  @Path("download_zip/{keys}")
  public Uni<Response> buildZipDownload(@NotBlank @RestPath String keys) {
    final var key = encryptionService.decryptObj(keys, Keys.class);

    return receiptPdfService.zipDownload(key.buildingId(), key.id())
        .map(FileResponse::path)
        .map(File::toString)
        .map(encryptionService::encrypt)
        .map(str -> PATH + "/download/" + str)
        .map(str -> Response.ok()
            .header("HX-Redirect", str)
            .build());
  }

  @GET
  @Path("zip_download/{path}")
  public Response redirectZipDownload(@NotBlank @RestPath String path) {
    return Response.ok()
        .header("HX-Redirect", PATH + "/download/" + path)
        .build();
  }

  @GET
  @Path("download/{path}")
  @Produces(MediaType.APPLICATION_OCTET_STREAM)
  public RestResponse<File> download(@NotBlank @RestPath String path) {
    final var str = encryptionService.decrypt(path);
    final var file = new File(str);

    return ResponseBuilder.ok(file)
        .header("Content-Disposition", "attachment; filename=" + file.getName())
        .build();
  }

  @GET
  @Path("pdf/{path}/{fileName}")
  @Produces("application/pdf")
  public RestResponse<File> pdf(@NotBlank @RestPath String path, @NotBlank @RestPath String fileName) {
    final var str = encryptionService.decrypt(path);
    final var file = new File(str);

    return ResponseBuilder.ok(file)
        .header("Content-Type", "application/pdf")
        .build();
  }

  @GET
  @Path("pdfs")
  @Produces(MediaType.TEXT_HTML)
  public Uni<Response> pdfs(@RestQuery String id) {
    final var str = StringUtil.trimFilter(id);
    if (str == null) {
      return Uni.createFrom().item(Response.ok()
          .header("HX-Redirect", "/")
          .build());
    }

    final var key = encryptionService.decryptObj(str, Keys.class);

    return receiptPdfService.pdfResponse(key.buildingId(), key.id())
        .map(Templates::pdfs)
        .map(templateInstance -> Response.ok(templateInstance).build());
  }
}
