package com.yaz.api.resource;

import com.yaz.api.domain.response.DebtTableItem;
import com.yaz.api.domain.response.ExpenseCountersDto;
import com.yaz.api.domain.response.ExpenseFormDto;
import com.yaz.api.domain.response.ExpenseTableItem;
import com.yaz.api.domain.response.ExtraChargeFormDto;
import com.yaz.api.domain.response.ExtraChargeTableItem;
import com.yaz.api.domain.response.ReceiptCountersDto;
import com.yaz.api.domain.response.ReceiptEditFormInit;
import com.yaz.api.domain.response.ReceiptFileFormDto;
import com.yaz.api.domain.response.ReceiptFormDto;
import com.yaz.api.domain.response.ReceiptInitDto;
import com.yaz.api.domain.response.ReceiptInitDto.Apts;
import com.yaz.api.domain.response.ReceiptPdfResponse;
import com.yaz.api.domain.response.ReceiptProgressUpdate;
import com.yaz.api.domain.response.ReceiptTableItem;
import com.yaz.api.domain.response.ReceiptTableResponse;
import com.yaz.api.domain.response.ReserveFundFormDto;
import com.yaz.api.domain.response.ReserveFundTableItem;
import com.yaz.api.domain.response.debt.DebtInitFormDto;
import com.yaz.api.domain.response.extra.charge.ExtraChargeInitFormDto;
import com.yaz.api.domain.response.receipt.ReceiptInitFormDto;
import com.yaz.api.domain.response.receipt.ReceiptPdfDto;
import com.yaz.api.domain.response.receipt.ReceiptProgressDto;
import com.yaz.api.domain.response.reserve.funds.ReserveFundInitFormDto;
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
import com.yaz.core.service.entity.EmailConfigService;
import com.yaz.core.service.entity.ExpenseService;
import com.yaz.core.service.entity.ExtraChargeService;
import com.yaz.core.service.entity.RateService;
import com.yaz.core.service.entity.ReceiptService;
import com.yaz.core.service.entity.ReserveFundService;
import com.yaz.core.service.pdf.ReceiptPdfProgressStateConsumer;
import com.yaz.core.service.pdf.ReceiptPdfService;
import com.yaz.core.util.ConvertUtil;
import com.yaz.core.util.DateUtil;
import com.yaz.core.util.MutinyUtil;
import com.yaz.core.util.RxUtil;
import com.yaz.core.util.StringUtil;
import com.yaz.persistence.domain.query.RateQuery;
import com.yaz.persistence.domain.query.ReceiptQuery;
import com.yaz.persistence.domain.query.SortOrder;
import com.yaz.persistence.domain.request.ReceiptCreateRequest;
import com.yaz.persistence.entities.Debt;
import com.yaz.persistence.entities.Expense;
import com.yaz.persistence.entities.ExtraCharge;
import com.yaz.persistence.entities.Receipt;
import com.yaz.persistence.entities.Receipt.Keys;
import com.yaz.persistence.entities.ReserveFund;
import io.quarkus.qute.CheckedTemplate;
import io.quarkus.qute.TemplateInstance;
import io.reactivex.rxjava3.core.Single;
import io.smallrye.mutiny.Multi;
import io.smallrye.mutiny.Uni;
import io.vertx.core.json.Json;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
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
import java.math.BigDecimal;
import java.time.Duration;
import java.time.LocalDate;
import java.time.Month;
import java.util.ArrayList;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Stream;
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

  private final ReceiptService receiptService;
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
  private final ReserveFundService reserveFundService;
  private final EmailConfigService emailConfigService;
  private final ReceiptPdfProgressStateConsumer receiptPdfProgressStateConsumer;

  @CheckedTemplate
  public static class Templates {

    public static native TemplateInstance receipts(ReceiptTableResponse res);

    public static native TemplateInstance counters(ReceiptCountersDto dto);

    public static native TemplateInstance pdfs(ReceiptPdfResponse res);

    public static native TemplateInstance init(ReceiptInitDto dto);

    public static native TemplateInstance progress(ReceiptProgressDto dto);

    public static native TemplateInstance progressUpdate(ReceiptProgressUpdate res);

    public static native TemplateInstance fileReceipt(ReceiptFileFormDto dto);

    public static native TemplateInstance newFileDialog(ReceiptFileFormDto dto);

    public static native TemplateInstance form(ReceiptFormDto dto);

    public static native TemplateInstance editInit(ReceiptEditFormInit res);

    public static native TemplateInstance sentInfo(ReceiptTableItem item);

    public static native TemplateInstance dialogError(String error, boolean isZip);

    public static native TemplateInstance pdfReceipt(ReceiptPdfDto dto);

    public static native TemplateInstance formInit(ReceiptInitFormDto dto);
  }

  public Uni<TemplateInstance> dialogError(String error, boolean isZip) {
    return Uni.createFrom().item(Templates.dialogError(error, isZip));
  }

  public Uni<TemplateInstance> dialogError(String error) {
    return dialogError(error, false);
  }

  public Uni<TemplateInstance> zipDialogError(String error) {
    return dialogError(error, true);
  }

  @GET
  @Path("init")
  @RolesAllowed("RECEIPTS_READ")
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> init() {
    final var buildingsUni = buildingService.ids();
    final var aptUni = buildingsUni.toMulti()
        .flatMap(Multi.createFrom()::iterable)
        .onItem()
        .transformToUni(str -> apartmentService.aptByBuildings(str)
            .map(list -> new Apts(str, list)))
        .merge()
        .collect()
        .asList();

    final var tableResponseUni = receiptService.table(ReceiptQuery.builder().build());

    return Uni.combine().all()
        .unis(buildingsUni, tableResponseUni, aptUni)
        .with((buildings, tableResponse, apts) -> ReceiptInitDto.builder()
            .table(tableResponse)
            .buildings(buildings)
            .apts(apts)
            .build())
        .map(Templates::init);
  }

  @GET
  @Path("counters")
  @RolesAllowed("RECEIPTS_READ")
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

    return receiptService.counters(ReceiptQuery.builder()
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
  @RolesAllowed("RECEIPTS_READ")
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

    return receiptService.table(receiptQuery)
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

    return receiptService.delete(key)
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

    return receiptService.get(key.id())
        .map(receipt -> {
          final var clientId = UUID.randomUUID().toString();

          return ReceiptPdfDto.builder()
              .receipt(receipt)
              .clientId(clientId)
              .progressDto(ReceiptProgressDto.builder()
                  .clientId(clientId)
                  .build())
              .build();
        })
        .onTermination()
        .invoke((dto, t, bool) -> {
          if (dto != null) {
            receiptPdfService.pdfResponse(key.buildingId(), key.id(), dto.clientId())
                .map(res -> res.toBuilder()
                    .outOfBounds(true)
                    .build())
                .map(Templates::pdfs)
                .map(TemplateInstance::createUni)
                .flatMap(RxUtil::single)
                .subscribe(template -> {
                  receiptPdfProgressStateConsumer.sendReceiptProgress(template, dto.clientId());
                }, pdfResponseError -> {
                  log.error("ERROR_PDFS", pdfResponseError);
                });
          }

        })
        .map(Templates::pdfReceipt)
        .map(templateInstance -> Response.ok(templateInstance).build());

//    return receiptPdfService.pdfResponse(key.buildingId(), key.id())
//        .map(Templates::pdfs)
//        .map(templateInstance -> Response.ok(templateInstance).build());
  }

  @POST
  @Path("send_zip")
  public Uni<TemplateInstance> sendZip(@NotBlank @RestForm String key,
      @NotNull @NotEmpty @RestForm Set<String> emails) {
    final var keys = encryptionService.decryptObj(key, Keys.class);

    return buildingService.read(keys.buildingId())
        .flatMap(optional -> {
          if (optional.isEmpty()) {
            return zipDialogError("Edificio no existe");
          }

          final var building = optional.get();
          if (building.emailConfigId() == null) {
            return zipDialogError("Edificio no tiene configuración de correo");
          }

          return emailConfigService.readItem(building.emailConfigId())
              .flatMap(opt -> {
                if (opt.isEmpty()) {
                  return zipDialogError("Configuración de correo no existe");
                }

                final var emailConfig = opt.get().item();

                if (emailConfig.stacktrace() != null) {
                  return zipDialogError("Error en configuración de correo: " + emailConfig.stacktrace());
                }

                final var responseSingle = sendReceiptService.sendZip(keys.buildingId(), keys.id(), emails)
                    .doOnError(t -> log.error("ERROR_SENDING_RECEIPT_ZIP", t));

                return MutinyUtil.toUni(responseSingle)
                    .replaceWith(zipDialogError(null));
              });
        });
  }

  @POST
  @Path("send/{key}")
  public Uni<TemplateInstance> sendReceipts(@NotBlank @RestPath String key) {
    final var keys = encryptionService.decryptObj(key, Keys.class);

    final var clientId = UUID.randomUUID().toString();

    sendReceiptService.sendReceipts(keys, key, clientId)
        .subscribe(() -> {
        }, t -> log.error("ERROR_SENDING_RECEIPTS", t));

    final var dto = ReceiptProgressDto.builder()
        .clientId(clientId)
        .outOfBoundsUpdate(true)
        .clearDialog(true)
        .build();

    return Uni.createFrom().item(Templates.progress(dto));
  }

  @POST
  @Path("send_receipt")
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> sendReceipts(@BeanParam SendReceiptRequest request) {
    final var keys = encryptionService.decryptObj(request.getKey(), Keys.class);

    if (request.getApts().isEmpty()) {
      return dialogError("Seleccione un apartmento");
    }

    request.setSubject(request.getSubject());
    request.setMsg(request.getMsg());

    return buildingService.read(keys.buildingId())
        .flatMap(optional -> {
          if (optional.isEmpty()) {
            return dialogError("Edificio no existe");
          }

          final var building = optional.get();
          if (building.emailConfigId() == null) {
            return dialogError("Edificio no tiene configuración de correo");
          }

          return emailConfigService.readItem(building.emailConfigId())
              .flatMap(opt -> {
                if (opt.isEmpty()) {
                  return dialogError("Configuración de correo no existe");
                }

                final var emailConfig = opt.get().item();

                if (emailConfig.stacktrace() != null) {
                  return dialogError("Error en configuración de correo: " + emailConfig.stacktrace());
                }

                final var clientId = UUID.randomUUID().toString();

                sendReceiptService.sendReceipts(keys, clientId, request)
                    .subscribe(() -> {
                    }, t -> log.error("ERROR_SENDING_RECEIPTS", t));

                final var dto = ReceiptProgressDto.builder()
                    .clientId(clientId)
                    .outOfBoundsUpdate(true)
                    .clearDialog(true)
                    .build();

                return Uni.createFrom().item(Templates.progress(dto));
              });
        });
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

    final var localDate = LocalDate.now(DateUtil.VE_ZONE);

    final var rateListSingle = MutinyUtil.single(
            rateService.table(RateQuery.query(10, SortOrder.DESC), "/api/rates/options"))
        .map(res -> {

//          LocalDate last; TODO
//
//          for (Item item : res.results()) {
//            final var rate = item.rate();
//            final var dateOfRate = rate.dateOfRate();
//
//          }

          return res;
        });

    final var responseSingle = Single.zip(listSingle, csvReceiptSingle, rateListSingle,
            (buildings, csvReceipt, rates) -> {
              //log.info("Receipt parsed: {}", csvReceipt);

              final var json = Json.encode(csvReceipt);
              final var compressed = StringUtil.deflate(json);
              //final var body = encryptionService.encrypt(compressed);

              //log.info("Original {} Compressed {} Encrypted {}", json.length(), compressed.length(), body.length());

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
                  .data(compressed)
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

    final var receiptUni = receiptService.read(keys.id())
        .map(optional -> optional.orElseThrow(() -> new IllegalArgumentException("RECEIPT_NOT_FOUND")))
        .memoize()
        .forFixedDuration(Duration.ofSeconds(3));

    final var buildingUni = buildingService.get(keys.buildingId());

    final var rateUni = receiptUni.flatMap(receipt -> rateService.read(receipt.rateId()))
        .map(optional -> optional.orElseThrow(() -> new IllegalArgumentException("RATE_NOT_FOUND")));

    final var expensesListUni = expenseService.readByReceipt(keys.id());

    final var extraChargesListUni = Uni.combine()
        .all()
        .unis(extraChargeService.by(keys.buildingId(), keys.buildingId()),
            extraChargeService.by(keys.buildingId(), String.valueOf(keys.id())))
        .with((building, receipt) -> {
          return Stream.concat(building.stream(), receipt.stream())
              .toList();
        });

    final var debtListUni = receiptUni.flatMap(
        receipt -> debtService.readByReceipt(receipt.buildingId(), receipt.id()));

    final var rateListUni = rateService.table(RateQuery.query(30, SortOrder.DESC), "/api/rates/options");

    final var reserveFundUni = reserveFundService.listByBuilding(keys.buildingId());

    return Uni.combine().all()
        .unis(receiptUni, rateUni, expensesListUni, extraChargesListUni, debtListUni, rateListUni,
            apartmentService.aptByBuildings(keys.buildingId()), buildingUni, reserveFundUni)
        .with((receipt, rate, expenses, extraCharges, debts, rates, apartments, building, reserveFunds) -> {
          final var expensesCount = expenses.size();
          final var receiptForm = ReceiptFormDto.builder()
              .key(encryptionService.encryptObj(receipt.keysWithHash()))
              .buildingName(receipt.buildingId())
              .month(receipt.month())
              .year(receipt.year())
              .years(DateUtil.yearsPicker())
              .date(receipt.date().toString())
              .rates(rates.toBuilder()
                  .selected(rate.id())
                  .build())
              .build();

          final var extraChargeTableItems = extraCharges.stream()
              .map(extraCharge -> {
                final var keys1 = extraCharge.keys();
                return ExtraChargeTableItem.builder()
                    .item(extraCharge)
                    .key(encryptionService.encryptObj(keys1))
                    .cardId(keys1.cardId())
                    .build();
              })
              .toList();

          var debtReceiptsTotal = 0;
          var debtTotal = BigDecimal.ZERO;

          final var debtTableItems = new ArrayList<DebtTableItem>();
          for (Debt debt : debts) {
            final var keys1 = debt.keys();
            final var item = DebtTableItem.builder()
                .key(encryptionService.encryptObj(keys1))
                .item(debt)
                .currency(building.debtCurrency())
                .cardId(keys1.cardId())
                .build();

            debtReceiptsTotal += debt.receipts();
            debtTotal = debtTotal.add(debt.amount());

            debtTableItems.add(item);
          }

          final var expenseTotalsBeforeReserveFunds = ConvertUtil.expenseTotals(rate.rate(), expenses);

          final var reserveFundTableItems = reserveFunds.stream()
              .map(reserveFund -> {

                final var reserveFundExpense = ConvertUtil.reserveFundExpense(expenseTotalsBeforeReserveFunds,
                    reserveFund);

                if (reserveFundExpense != null) {
                  expenses.add(reserveFundExpense.item());
                }

                final var keys1 = reserveFund.keys(receipt.id());
                return ReserveFundTableItem.builder()
                    .key(encryptionService.encryptObj(keys1))
                    .item(reserveFund)
                    .cardId(keys1.cardId())
                    .build();
              })
              .toList();

          final var expenseTotals = ConvertUtil.expenseTotals(rate.rate(), expenses);

          final var expenseTableItems = expenses.stream()
              .map(expense -> {

                final var keys1 = expense.keys();
                return ExpenseTableItem.builder()
                    .key(encryptionService.encryptObj(keys1))
                    .cardId(keys1.cardId())
                    .item(expense)
                    .build();
              })
              .toList();

          final var editFormInit = ReceiptEditFormInit.builder()
              .receiptForm(receiptForm)
              .extraCharges(extraChargeTableItems)
              .extraChargeFormDto(ExtraChargeFormDto.builder()
                  .isEdit(false)
                  .key(encryptionService.encryptObj(ExtraCharge.Keys.newReceipt(receipt.id(), receipt.buildingId())))
                  .apartments(apartments)
                  .build())
              .expenseFormDto(ExpenseFormDto.builder()
                  .isEdit(false)
                  .key(encryptionService.encryptObj(Expense.Keys.of(receipt.buildingId(), receipt.id())))
                  .build())
              .expenses(expenseTableItems)
              .expensesCount(expensesCount)
              .debts(debtTableItems)
              .totalCommonExpenses(expenseTotalsBeforeReserveFunds.formatCommon())
              .totalUnCommonExpenses(expenseTotalsBeforeReserveFunds.formatUnCommon())
              .totalCommonExpensesPlusReserveFunds(expenseTotals.formatCommon())
              .totalUnCommonExpensesPlusReserveFunds(expenseTotals.formatUnCommon())
              .debtReceiptsTotal(debtReceiptsTotal)
              .debtTotal(building.debtCurrency().format(debtTotal))
              .reserveFunds(reserveFundTableItems)
              .reserveFundFormDto(ReserveFundFormDto.builder()
                  .isEdit(false)
                  .key(encryptionService.encryptObj(ReserveFund.Keys.newReceipt(receipt.id(), receipt.buildingId())))
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
    //final var decrypted = encryptionService.decrypt(request.data);
    final var decompress = StringUtil.inflate(request.data);
    //final var decompress = StringUtil.decompress(decrypted);
    final var csvReceipt = Json.decodeValue(decompress, CsvReceipt.class);

    if (!ArrayUtils.contains(DateUtil.yearsPicker(), request.year)) {
      log.info("INVALID YEAR {}", request);
      return Uni.createFrom().item(Response.noContent().build());
    }

    final var rateId = Long.parseLong(encryptionService.decrypt(request.rateInput));

    return Uni.combine().all()
        .unis(buildingService.exists(request.building), rateService.read(rateId),
            apartmentService.aptByBuildings(request.building))
        .withUni((buildingExists, rateOptional, apartments) -> {
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

          final var debts = apartments.stream()
              .map(apt -> {
                return csvReceipt.debts()
                    .stream().filter(
                        debt -> debt.aptNumber().contains(apt.number()) || apt.number().equals("0" + debt.aptNumber()))
                    .findFirst()
                    .map(debt -> debt.toBuilder()
                        .buildingId(request.building)
                        .aptNumber(apt.number())
                        .build())
                    .orElseGet(() -> Debt.builder()
                        .buildingId(request.building)
                        .aptNumber(apt.number())
                        .amount(BigDecimal.ZERO)
                        .build());
              })
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
              .createdAt(DateUtil.utcLocalDateTime())
              .build();

          final var createRequest = ReceiptCreateRequest.builder()
              .receipt(receipt)
              .expenses(expenses)
              .extraCharges(extraCharges)
              .debts(debts)
              .build();

          return receiptService.insert(createRequest)
              .map(res -> {
                final var id = res.id();
                final var keys = new Keys(receipt.buildingId(), id, null, 0);
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
    @NotBlank
    private String keys;
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
  @Path("edit")
  @Produces(MediaType.TEXT_HTML)
  public Uni<Response> edit(@BeanParam ReceiptEditRequest request) {

    final var month = Month.of(request.month);
    final var keys = encryptionService.decryptObj(request.getKeys(), Receipt.Keys.class);
    final var date = LocalDate.parse(request.date);
    final var rateId = Long.parseLong(encryptionService.decrypt(request.rateInput));

    if (!ArrayUtils.contains(DateUtil.yearsPicker(), request.year)) {
      log.info("EDIT_RECEIPT_INVALID_YEAR {}", request);
      return Uni.createFrom().item(Response.noContent().build());
    }

    final var update = Receipt.builder()
        .buildingId(keys.buildingId())
        .id(keys.id())
        .year(request.year)
        .month(request.month)
        .date(date)
        .rateId(rateId)
        .build();

    if (update.keysWithHash().hash() == keys.hash()) {
      log.info("EDIT_RECEIPT_NO_CHANGE {}", request);
      return Uni.createFrom().item(Response.noContent().build());
    }

    return Uni.combine().all()
        .unis(buildingService.get(keys.buildingId()), rateService.get(rateId), receiptService.get(keys.id()),
            receiptService.update(update))
        .withUni((building, rate, receipt, i) -> {

          if (Objects.equals(receipt.rateId(), rateId)) {
            return Uni.createFrom().item(Response.noContent().build());
          }

          return Uni.combine().all()
              .unis(expenseService.readByReceipt(keys.id()), reserveFundService.listByBuilding(keys.buildingId()))
              .with((expenses, reserveFunds) -> {

                final var isRateNeeded = expenses.stream().map(Expense::currency)
                    .anyMatch(currency -> rate.fromCurrency() == currency);

                if (!isRateNeeded) {
                  return Response.noContent().build();
                }

                final var expenseTotalsBeforeReserveFunds = ConvertUtil.expenseTotals(rate.rate(), expenses);

                final var reserveFundExpenses = ConvertUtil.reserveFundExpenses(expenseTotalsBeforeReserveFunds,
                    reserveFunds, expenses);

                final var expenseTotals = ConvertUtil.expenseTotals(rate.rate(), expenses);

                final var countersDto = ExpenseCountersDto.builder()
                    .commonTotal(expenseTotalsBeforeReserveFunds.formatCommon())
                    .unCommonTotal(expenseTotalsBeforeReserveFunds.formatUnCommon())
                    .commonTotalPlusReserveFunds(expenseTotals.formatCommon())
                    .unCommonTotalPlusReserveFunds(expenseTotals.formatUnCommon())
                    .reserveFundExpenses(reserveFundExpenses)
                    .build();
                final var templateInstance = ExpenseResource.Templates.counters(countersDto);
                return Response.ok(templateInstance).build();
              });
        });
  }

  @GET
  @Path("form_init")
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> formInit(@RestQuery String id) {
    final var keys = encryptionService.decryptObj(id, Receipt.Keys.class);

    final var receiptUni = receiptService.read(keys.id())
        .map(optional -> optional.orElseThrow(() -> new IllegalArgumentException("RECEIPT_NOT_FOUND")))
        .memoize()
        .forFixedDuration(Duration.ofSeconds(3));

    final var buildingUni = buildingService.get(keys.buildingId());

    final var rateUni = receiptUni.flatMap(receipt -> rateService.read(receipt.rateId()))
        .map(optional -> optional.orElseThrow(() -> new IllegalArgumentException("RATE_NOT_FOUND")));

    final var expensesListUni = expenseService.readByReceipt(keys.id());

    final var extraChargesListUni = Uni.combine()
        .all()
        .unis(extraChargeService.by(keys.buildingId(), keys.buildingId()),
            extraChargeService.by(keys.buildingId(), String.valueOf(keys.id())))
        .with((building, receipt) -> {
          return Stream.concat(building.stream(), receipt.stream())
              .toList();
        });

    final var debtListUni = receiptUni.flatMap(
        receipt -> debtService.readByReceipt(receipt.buildingId(), receipt.id()));

    final var rateListUni = rateService.table(RateQuery.query(30, SortOrder.DESC), "/api/rates/options");

    final var reserveFundUni = reserveFundService.listByBuilding(keys.buildingId());

    return Uni.combine().all()
        .unis(receiptUni, rateUni, expensesListUni, extraChargesListUni, debtListUni, rateListUni,
            apartmentService.aptByBuildings(keys.buildingId()), buildingUni, reserveFundUni)
        .with((receipt, rate, expenses, extraCharges, debts, rates, apartments, building, reserveFunds) -> {
          final var expensesCount = expenses.size();
          final var receiptForm = ReceiptFormDto.builder()
              .key(encryptionService.encryptObj(receipt.keysWithHash()))
              .buildingName(receipt.buildingId())
              .month(receipt.month())
              .year(receipt.year())
              .years(DateUtil.yearsPicker())
              .date(receipt.date().toString())
              .rates(rates.toBuilder()
                  .selected(rate.id())
                  .nextPageUrl(null)
                  .build())
              .build();

          final var extraChargeTableItems = extraCharges.stream()
              .map(extraCharge -> {
                final var keys1 = extraCharge.keys();
                return ExtraChargeTableItem.builder()
                    .item(extraCharge)
                    .key(encryptionService.encryptObj(keys1))
                    .cardId(keys1.cardId())
                    .build();
              })
              .toList();

          var debtReceiptsTotal = 0;
          var debtTotal = BigDecimal.ZERO;

          final var debtTableItems = new ArrayList<DebtTableItem>();
          for (Debt debt : debts) {
            final var keys1 = debt.keys();
            final var item = DebtTableItem.builder()
                .key(encryptionService.encryptObj(keys1))
                .item(debt)
                .currency(building.debtCurrency())
                .cardId(keys1.cardId())
                .build();

            debtReceiptsTotal += debt.receipts();
            debtTotal = debtTotal.add(debt.amount());

            debtTableItems.add(item);
          }

          final var expenseTotalsBeforeReserveFunds = ConvertUtil.expenseTotals(rate.rate(), expenses);

          final var reserveFundTableItems = reserveFunds.stream()
              .map(reserveFund -> {

                final var reserveFundExpense = ConvertUtil.reserveFundExpense(expenseTotalsBeforeReserveFunds,
                    reserveFund);

                if (reserveFundExpense != null) {
                  expenses.add(reserveFundExpense.item());
                }

                final var keys1 = reserveFund.keys(receipt.id());
                return ReserveFundTableItem.builder()
                    .key(encryptionService.encryptObj(keys1))
                    .item(reserveFund)
                    .cardId(keys1.cardId())
                    .build();
              })
              .toList();

          final var expenseTotals = ConvertUtil.expenseTotals(rate.rate(), expenses);

          final var expenseTableItems = expenses.stream()
              .map(expense -> {

                final var keys1 = expense.keys();
                return ExpenseTableItem.builder()
                    .key(encryptionService.encryptObj(keys1))
                    .cardId(keys1.cardId())
                    .item(expense)
                    .build();
              })
              .toList();

          return ReceiptInitFormDto.builder()
              .receiptForm(receiptForm)
              .apts(apartments)
              .extraChargeDto(ExtraChargeInitFormDto.builder()
                  .key(encryptionService.encryptObj(ExtraCharge.Keys.newReceipt(receipt.id(), receipt.buildingId())))
                  .extraCharges(extraChargeTableItems)
                  .build())

//              .expenseFormDto(ExpenseFormDto.builder()
//                  .isEdit(false)
//                  .key(encryptionService.encryptObj(Expense.Keys.of(receipt.buildingId(), receipt.id())))
//                  .build())
//              .expenses(expenseTableItems)
//              .expensesCount(expensesCount)
//              .debts(debtTableItems)
//              .totalCommonExpenses(expenseTotalsBeforeReserveFunds.formatCommon())
//              .totalUnCommonExpenses(expenseTotalsBeforeReserveFunds.formatUnCommon())
//              .totalCommonExpensesPlusReserveFunds(expenseTotals.formatCommon())
//              .totalUnCommonExpensesPlusReserveFunds(expenseTotals.formatUnCommon())
//              .debtReceiptsTotal(debtReceiptsTotal)
//              .debtTotal(building.debtCurrency().format(debtTotal))
              .reserveFundDto(ReserveFundInitFormDto.builder()
                  .key(encryptionService.encryptObj(ReserveFund.Keys.newReceipt(receipt.id(), receipt.buildingId())))
                  .reserveFunds(reserveFundTableItems)
                  .build())

              .debtDto(DebtInitFormDto.builder()
                  .key("")
                  .debts(debtTableItems)
                  .debtReceiptsTotal(debtReceiptsTotal)
                  .debtTotal(building.debtCurrency().format(debtTotal))
                  .build())
              .build();
        }).map(Templates::formInit);
  }

  @Data
  public static class SendReceiptRequest {

    @RestForm
    @NotBlank
    private String key;
    @RestForm
    private String subject;
    @RestForm
    private String msg;
    @RestForm
    private Set<String> apts;

  }
}
