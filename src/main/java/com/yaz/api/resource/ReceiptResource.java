package com.yaz.api.resource;

import com.yaz.api.domain.response.ExtraChargeFormDto;
import com.yaz.api.domain.response.ExtraChargeTableItem;
import com.yaz.api.domain.response.ReceiptCountersDto;
import com.yaz.api.domain.response.ReceiptEditFormInit;
import com.yaz.api.domain.response.ReceiptFileFormDto;
import com.yaz.api.domain.response.ReceiptFormDto;
import com.yaz.api.domain.response.ReceiptInitDto;
import com.yaz.api.domain.response.ReceiptPdfResponse;
import com.yaz.api.domain.response.ReceiptProgressUpdate;
import com.yaz.api.domain.response.ReceiptTableResponse;
import com.yaz.api.resource.fragments.Fragments;
import com.yaz.core.service.EncryptionService;
import com.yaz.core.service.SendReceiptService;
import com.yaz.core.service.TranslationProvider;
import com.yaz.core.service.csv.CsvReceipt;
import com.yaz.core.service.csv.ReceiptParser;
import com.yaz.core.service.domain.FileResponse;
import com.yaz.core.service.entity.ApartmentService;
import com.yaz.core.service.entity.BuildingService;
import com.yaz.core.service.entity.DebtService;
import com.yaz.core.service.entity.ExpenseService;
import com.yaz.core.service.entity.ExtraChargeService;
import com.yaz.core.service.entity.RateService;
import com.yaz.core.service.entity.ReceiptService;
import com.yaz.core.service.pdf.ReceiptPdfService;
import com.yaz.core.util.DateUtil;
import com.yaz.core.util.MutinyUtil;
import com.yaz.core.util.StringUtil;
import com.yaz.persistence.domain.query.RateQuery;
import com.yaz.persistence.domain.query.ReceiptQuery;
import com.yaz.persistence.domain.query.SortOrder;
import com.yaz.persistence.domain.request.ReceiptUpdateRequest;
import com.yaz.persistence.entities.ExtraCharge;
import com.yaz.persistence.entities.Receipt;
import com.yaz.persistence.entities.Receipt.Keys;
import io.quarkus.qute.CheckedTemplate;
import io.quarkus.qute.TemplateInstance;
import io.reactivex.rxjava3.core.Single;
import io.smallrye.mutiny.Uni;
import io.vertx.core.json.Json;
import jakarta.inject.Inject;
import jakarta.validation.constraints.NotBlank;
import jakarta.ws.rs.BeanParam;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.PATCH;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.io.File;
import java.io.IOException;
import java.time.Duration;
import java.time.LocalDate;
import java.time.Month;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.ArrayUtils;
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
  private final TranslationProvider translationProvider;
  private final RateService rateService;
  private final ExpenseService expenseService;
  private final ExtraChargeService extraChargeService;
  private final DebtService debtService;
  private final ApartmentService apartmentService;

  @CheckedTemplate
  public static class Templates {

    public static native TemplateInstance receipts(ReceiptTableResponse res);

    public static native TemplateInstance counters(ReceiptCountersDto dto);

    public static native TemplateInstance pdfs(ReceiptPdfResponse res);

    public static native TemplateInstance init(ReceiptInitDto dto);

    public static native TemplateInstance progress(String key);

    public static native TemplateInstance progressUpdate(ReceiptProgressUpdate res);

    public static native TemplateInstance fileReceipt(ReceiptFileFormDto dto);

    public static native TemplateInstance newFileDialog(ReceiptFileFormDto dto);

    public static native TemplateInstance form(ReceiptFormDto dto);

    public static native TemplateInstance editInit(ReceiptEditFormInit res);
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
  @Produces(MediaType.TEXT_HTML)
  public Uni<Response> upload(@RestForm FileUpload file) {

    if (file == null) {
      return Uni.createFrom().item(Response.noContent().build());
    }

    final var listSingle = MutinyUtil.single(buildingService.ids());

    final var csvReceiptSingle = receiptParser.parse(file.uploadedFile())
        .map(csvReceipt -> csvReceipt.toBuilder()
            .fileName(file.fileName())
            .build());

    final var rateListSingle = MutinyUtil.single(
        rateService.table(RateQuery.query(10, SortOrder.DESC), "/api/rates/options"));

    final var responseSingle = Single.zip(listSingle, csvReceiptSingle, rateListSingle,
            (buildings, csvReceipt, rates) -> {
              //log.info("Receipt parsed: {}", csvReceipt);

              final var json = Json.encode(csvReceipt);
              final var compressed = StringUtil.compressStr(json);
              final var body = encryptionService.encrypt(compressed);

              final var fileName = file.fileName();

              final var months = ReceiptParser.MONTHS_MAP.entrySet()
                  .stream()
                  .map(entry -> {
                    final var month = entry.getValue();

                    if (fileName.contains(entry.getKey())) {
                      return month;
                    }

                    final var translate = translationProvider.translate(month.name());

                    if (fileName.contains(translate)) {
                      return month;
                    }

                    return null;
                  })
                  .filter(Objects::nonNull)
                  .map(Month::getValue)
                  .toList();

              final var buildingsMatched = buildings.stream().filter(fileName::contains)
                  .toList();

              final var localDate = LocalDate.now();

              return ReceiptFileFormDto.builder()
                  .fileName(fileName)
                  .buildingName(buildingsMatched.size() == 1 ? buildingsMatched.getFirst() : null)
                  .month(months.size() == 1 ? months.getFirst() : localDate.getMonthValue())
                  .years(DateUtil.yearsPicker())
                  .year(localDate.getYear())
                  .receipt(csvReceipt)
                  .date(localDate.toString())
                  .buildings(buildings)
                  .rates(rates)
                  .data(body)
                  .build();

            })
        .map(Templates::newFileDialog)
        .map(templateInstance -> Response.ok(templateInstance).build())
        .onErrorReturn(throwable -> {
          log.error("ERROR_PARSING_RECEIPT_FILE", throwable);
          final var templateInstance = Fragments.rateInfo(throwable.getMessage());
          return Response.ok(templateInstance).build();
        });

    return MutinyUtil.toUni(responseSingle);
  }

  @GET
  @Path("edit_form")
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> editForm(@NotBlank @RestQuery String id) {

    final var keys = encryptionService.decryptObj(id, Keys.class);

    final var receiptUni = service.read(keys.id())
        .map(optional -> optional.orElseThrow(() -> new IllegalArgumentException("RECEIPT_NOT_FOUND")))
        .memoize()
        .forFixedDuration(Duration.ofSeconds(3));

    final var rateUni = receiptUni.flatMap(receipt -> rateService.read(receipt.rateId()))
        .map(optional -> optional.orElseThrow(() -> new IllegalArgumentException("RATE_NOT_FOUND")));

    final var expensesListUni = expenseService.readByReceipt(keys.id());

    final var extraChargesListUni = extraChargeService.by(keys.buildingId(), String.valueOf(keys.id()));

    final var debtListUni = receiptUni.flatMap(
        receipt -> debtService.readByReceipt(receipt.buildingId(), receipt.id()));

    final var rateListUni = rateService.table(RateQuery.query(10, SortOrder.DESC), "/api/rates/options");

    return Uni.combine().all()
        .unis(receiptUni, rateUni, expensesListUni, extraChargesListUni, debtListUni, rateListUni,
            apartmentService.aptByBuildings(keys.buildingId()))
        .with((receipt, rate, expenses, extraCharges, debts, rates, apartments) -> {

          final var receiptForm = ReceiptFormDto.builder()
              .key(id)
              .buildingName(receipt.buildingId())
              .month(receipt.month())
              .year(receipt.year())
              .years(DateUtil.yearsPicker())
              .date(receipt.date().toString())
              .rates(rates.toBuilder()
                  .selected(rate.id())
                  .build())
//              .expenses(expenses)
//              .extraCharges(extraCharges)
//              .debts(debts)
              .build();

          final var list = extraCharges.stream()
              .map(extraCharge -> {
                final var keys1 = extraCharge.keys();
                return ExtraChargeTableItem.builder()
                    .item(extraCharge)
                    .key(encryptionService.encryptObj(keys1))
                    .cardId(keys1.cardId())
                    .build();
              })
              .toList();

          final var editFormInit = ReceiptEditFormInit.builder()
              .receiptForm(receiptForm)
              .extraCharges(list)
              .extraChargeFormDto(ExtraChargeFormDto.builder()
                  .isEdit(false)
                  .key(encryptionService.encryptObj(ExtraCharge.Keys.newReceipt(receipt.id(), receipt.buildingId())))
                  .apartments(apartments)
                  .build())
              .build();

          return Templates.editInit(editFormInit);
        });
  }

  @Data
  public static class FileReceiptRequest {

    @NotBlank
    @RestForm
    private String data;
    @NotBlank
    @RestForm
    private String building;
    @RestForm
    private int year;
    @RestForm
    private int month;
    @NotBlank
    @RestForm
    private String date;
    @NotBlank
    @RestForm
    private String rateInput;
  }

  @POST
  @Path("new_receipt_file")
  @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
  @Produces(MediaType.TEXT_HTML)
  public Uni<Response> create(@BeanParam FileReceiptRequest request) throws IOException {

    final var month = Month.of(request.month);
    final var date = LocalDate.parse(request.date);
    final var decrypted = encryptionService.decrypt(request.data);
    final var decompress = StringUtil.decompress(decrypted);
    final var csvReceipt = Json.decodeValue(decompress, CsvReceipt.class);

    if (!ArrayUtils.contains(DateUtil.yearsPicker(), request.year)) {
      log.info("INVALID YEAR {}", request);
      return Uni.createFrom().item(Response.noContent().build());
    }

    final var rateId = Long.parseLong(encryptionService.decrypt(request.rateInput));

    return Uni.combine().all()
        .unis(buildingService.exists(request.building), rateService.read(rateId))
        .withUni((buildingExists, rateOptional) -> {
          final var noContentUni = Uni.createFrom().item(Response.noContent().build());
          if (!buildingExists) {
            log.info("BUILDING_NOT_FOUND {}", request);
            return noContentUni;
          }

          if (rateOptional.isEmpty()) {
            log.info("RATE_NOT_FOUND {}", rateId);
            return noContentUni;
          }

          final var expenses = csvReceipt.expenses()
              .stream()
              .map(expense -> expense.toBuilder()
                  .buildingId(request.building)
                  .build())
              .toList();

          final var debts = csvReceipt.debts().stream()
              .map(debt -> debt.toBuilder()
                  .buildingId(request.building)
                  .build())
              .toList();

          final var extraCharges = csvReceipt.extraCharges().stream()
              .map(extraCharge -> extraCharge.toBuilder()
                  .buildingId(request.building)
                  .build())
              .toList();

          final var receipt = Receipt.builder()
              .buildingId(request.building)
              .year(request.year)
              .month(request.month)
              .date(date)
              .rateId(rateId)
              .expenses(expenses)
              .extraCharges(extraCharges)
              .debts(debts)
              .createdAt(DateUtil.utcLocalDateTime())
              .build();

          return service.insert(receipt)
              .map(res -> {
                final var id = res.id();
                final var keys = new Keys(receipt.buildingId(), id);
                final var encrypted = encryptionService.encryptObj(keys);

                return Response.ok()
                    .header("HX-Redirect", "/stc/receipts/edit/" + encrypted)
                    .build();
              });
        });
  }

  @Data
  public static class ReceiptEditRequest {

    @RestForm
    private int year;
    @RestForm
    private int month;
    @NotBlank
    @RestForm
    private String date;
    @NotBlank
    @RestForm
    private String rateInput;
  }

  @PATCH
  @Path("edit/{key}")
  @Produces(MediaType.TEXT_HTML)
  public Uni<Response> edit(@RestPath String key, @BeanParam ReceiptEditRequest request) {

    final var month = Month.of(request.month);
    final var keys = encryptionService.decryptObj(key, Receipt.Keys.class);
    final var date = LocalDate.parse(request.date);
    final var rateId = Long.parseLong(encryptionService.decrypt(request.rateInput));

    if (!ArrayUtils.contains(DateUtil.yearsPicker(), request.year)) {
      log.info("EDIT_RECEIPT_INVALID_YEAR {}", request);
      return Uni.createFrom().item(Response.noContent().build());
    }

    return Uni.combine().all()
        .unis(buildingService.get(keys.buildingId()), rateService.get(rateId), service.get(keys.id()))
        .withUni((building, rate, receipt) -> {

          final var updateRequest = ReceiptUpdateRequest.builder()
              .id(keys.id())
              .year(request.year)
              .month(request.month)
              .date(date)
              .rateId(rateId)
              .build();

          return service.update(updateRequest)
              .replaceWith(Response.noContent().build());
        });
  }

}
