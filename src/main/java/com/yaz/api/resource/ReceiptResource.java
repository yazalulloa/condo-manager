package com.yaz.api.resource;

import com.yaz.api.domain.response.ReceiptCountersDto;
import com.yaz.api.domain.response.ReceiptInitDto;
import com.yaz.api.domain.response.ReceiptPdfResponse;
import com.yaz.api.domain.response.ReceiptProgressUpdate;
import com.yaz.api.domain.response.ReceiptTableResponse;
import com.yaz.core.service.EncryptionService;
import com.yaz.core.service.SendReceiptService;
import com.yaz.core.service.csv.ReceiptParser;
import com.yaz.core.service.domain.FileResponse;
import com.yaz.core.service.entity.BuildingService;
import com.yaz.core.service.entity.ReceiptService;
import com.yaz.core.service.pdf.ReceiptPdfService;
import com.yaz.core.util.DateUtil;
import com.yaz.core.util.MutinyUtil;
import com.yaz.core.util.StringUtil;
import com.yaz.persistence.domain.query.ReceiptQuery;
import com.yaz.persistence.entities.Receipt.Keys;
import io.quarkus.qute.CheckedTemplate;
import io.quarkus.qute.TemplateInstance;
import io.smallrye.mutiny.Uni;
import io.vertx.core.json.Json;
import jakarta.inject.Inject;
import jakarta.validation.constraints.NotBlank;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.io.File;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jboss.resteasy.reactive.RestForm;
import org.jboss.resteasy.reactive.RestPath;
import org.jboss.resteasy.reactive.RestQuery;
import org.jboss.resteasy.reactive.RestResponse;
import org.jboss.resteasy.reactive.RestResponse.ResponseBuilder;
import org.jboss.resteasy.reactive.multipart.FileUpload;

@Path(ReceiptResource.PATH)
@Slf4j
//@Authenticated
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class ReceiptResource {

  public static final String PATH = "/api/receipts";
  public static final String DELETE_PATH = PATH + "/";

  private final ReceiptService service;
  private final BuildingService buildingService;
  private final EncryptionService encryptionService;
  private final ReceiptPdfService receiptPdfService;
  private final SendReceiptService sendReceiptService;
  private final ReceiptParser receiptParser;

  @CheckedTemplate
  public static class Templates {

    public static native TemplateInstance receipts(ReceiptTableResponse res);

    public static native TemplateInstance counters(ReceiptCountersDto dto);

    public static native TemplateInstance pdfs(ReceiptPdfResponse res);

    public static native TemplateInstance init(ReceiptInitDto dto);

    public static native TemplateInstance progress(String key);

    public static native TemplateInstance progressUpdate(ReceiptProgressUpdate res);
  }

  @GET
  @Path("init")
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> init() {
    final var buildingsUni = buildingService.ids();
    final var tableResponseUni = service.table(ReceiptQuery.builder().build());

    return Uni.combine().all()
        .unis(buildingsUni, tableResponseUni)
        .with((buildings, tableResponse) -> ReceiptInitDto.builder()
            .table(tableResponse)
            .buildings(buildings)
            .build())
        .map(Templates::init);
  }

  @GET
  @Path("counters")
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> counters(@RestQuery("building_input") Set<String> building,
      @RestQuery("month_input") Set<Integer> months,
      @RestQuery("date_input") String date) {

//    final var apartmentQuery = ApartmentQuery.builder()
//        .q(StringUtil.trimFilter(q))
//        .buildings(building)
//        .build();
//
//    return apartmentService.counters(apartmentQuery)
//        .map(ApartmentsResource.Templates::counters);

    return service.counters(ReceiptQuery.builder()
            .buildings(building)
            .month(Optional.ofNullable(months)
                .stream()
                .flatMap(Set::stream)
                .filter(Objects::nonNull)
                .filter(i -> i > 0 && i < 13)
                .mapToInt(x -> x)
                .toArray())
            .date(DateUtil.isValidLocalDate(date) ? date : null)
            .build())
        .map(Templates::counters);
  }

  @GET
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> receipts(
      @RestQuery String nextPage,
      @RestQuery("building_input") Set<String> building,
      @RestQuery("month_input") Set<Integer> months,
      @RestQuery("date_input") String date) {

    final var nextKeys = Optional.ofNullable(nextPage)
        .map(StringUtil::trimFilter)
        .map(str -> encryptionService.decryptObj(str, Keys.class));

    final var month = Optional.ofNullable(months)
        .stream()
        .flatMap(Set::stream)
        .filter(Objects::nonNull)
        .filter(i -> i > 0 && i < 13)
        .mapToInt(x -> x)
        .toArray();

    final var receiptQuery = ReceiptQuery.builder()
        .lastId(nextKeys.map(Keys::id).orElse(null))
        .buildings(building)
        .month(month)
        .date(DateUtil.isValidLocalDate(date) ? date : null)
        .build();

    return service.table(receiptQuery)
        .map(Templates::receipts);
  }

  @DELETE
  @Path("{keys}")
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> delete(@NotBlank @RestPath String keys,
      @RestForm("building_input") Set<String> building,
      @RestForm("month_input") Set<Integer> months,
      @RestForm("date_input") String date) {
    final var key = encryptionService.decryptObj(keys, Keys.class);

    return service.delete(key.buildingId(), key.id())
        .replaceWith(counters(building, months, date));
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

  @POST
  @Path("send_zip/{keys}")
  public Uni<Response> sendZip(@NotBlank @RestPath String keys) {
    final var key = encryptionService.decryptObj(keys, Keys.class);

    final var responseSingle = sendReceiptService.sendZip(key.buildingId(), key.id())
        .doOnError(t -> log.error("ERROR_SENDING_RECEIPT_ZIP", t))
        .toSingleDefault(Response.noContent().build());

    return MutinyUtil.toUni(responseSingle);
  }

  @POST
  @Path("send/{keys}")
  public Uni<TemplateInstance> sendReceipts(@NotBlank @RestPath String keys) {
    final var key = encryptionService.decryptObj(keys, Keys.class);

    final var clientId = UUID.randomUUID().toString();

    sendReceiptService.sendReceipts(key.buildingId(), key.id(), clientId)
        .subscribe(() -> {
        }, t -> log.error("ERROR_SENDING_RECEIPTS", t));

    return Uni.createFrom().item(Templates.progress(clientId));
  }

  @POST
  @Path("file")
  @Consumes(MediaType.MULTIPART_FORM_DATA)
  @Produces(MediaType.TEXT_PLAIN)
  public Uni<Response> upload(@RestForm FileUpload file) {

    final var responseSingle = receiptParser.parse(file.fileName(), file.uploadedFile())
        .map(csvReceipt -> {
          log.info("Receipt parsed: {}", csvReceipt);

          final var json = Json.encode(csvReceipt);
          final var body = encryptionService.encrypt(json);
          return Response.ok(body).build();
        });

    return MutinyUtil.toUni(responseSingle);
  }

}
