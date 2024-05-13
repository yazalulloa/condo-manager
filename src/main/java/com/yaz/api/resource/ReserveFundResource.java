package com.yaz.api.resource;

import com.yaz.api.domain.request.ReserveFundRequest;
import com.yaz.api.domain.response.ExpenseCountersDto;
import com.yaz.api.domain.response.ReserveFundCountersDto;
import com.yaz.api.domain.response.ReserveFundFormDto;
import com.yaz.api.domain.response.ReserveFundTableItem;
import com.yaz.core.service.EncryptionService;
import com.yaz.core.service.entity.ExpenseService;
import com.yaz.core.service.entity.RateService;
import com.yaz.core.service.entity.ReceiptService;
import com.yaz.core.service.entity.ReserveFundService;
import com.yaz.core.util.ConvertUtil;
import com.yaz.core.util.DecimalUtil;
import com.yaz.core.util.StringUtil;
import com.yaz.persistence.domain.ExpenseType;
import com.yaz.persistence.domain.ReserveFundType;
import com.yaz.persistence.entities.Expense;
import com.yaz.persistence.entities.Rate;
import com.yaz.persistence.entities.Receipt;
import com.yaz.persistence.entities.ReserveFund;
import com.yaz.persistence.entities.ReserveFund.Keys;
import io.quarkus.qute.CheckedTemplate;
import io.quarkus.qute.TemplateInstance;
import io.smallrye.mutiny.Uni;
import jakarta.inject.Inject;
import jakarta.validation.constraints.NotBlank;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.PATCH;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jboss.resteasy.reactive.Cache;
import org.jboss.resteasy.reactive.RestPath;

@Path(ReserveFundResource.PATH)
@Slf4j
//@Authenticated
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class ReserveFundResource {

  public static final String PATH = "/api/reserve_funds";
  public static final String DELETE_PATH = PATH + "/";

  private final ReserveFundService service;
  private final EncryptionService encryptionService;
  private final ExpenseService expenseService;
  private final ReceiptService receiptService;
  private final RateService rateService;

  @CheckedTemplate
  public static class Templates {

    public static native TemplateInstance form(ReserveFundFormDto dto);

    public static native TemplateInstance counters(ReserveFundCountersDto dto);
  }

  private Uni<Rate> rateUni(long receiptId) {
    return receiptService.get(receiptId)
        .map(Receipt::rateId)
        .flatMap(rateService::get);
  }

  @DELETE
  @Path("{keysStr}")
  public Uni<Response> delete(@NotBlank @RestPath String keysStr) {
    final var keys = encryptionService.decryptObj(keysStr, Keys.class);

    if (keys.buildingId() == null || keys.id() == 0) {
      return Uni.createFrom().item(Response.status(Response.Status.BAD_REQUEST).build());
    }

    return Uni.combine().all()
        .unis(rateUni(keys.receiptId()),
            expenseService.readByReceipt(keys.receiptId()), service.listByBuilding(keys.buildingId()),
            service.count(keys.buildingId()), service.delete(keys.buildingId(), keys.id()))
        .with((rate, expenses, reserveFunds, count, i) -> {
          reserveFunds.removeIf(r -> r.id() == keys.id());
          final var expensesCount = expenses.size();
          return ReserveFundCountersDto.builder()
              .count(count - i)
              .expenseCountersDto(expenseCountersDto(expensesCount, rate.rate(), expenses, reserveFunds))
              .build();
        })
        .map(Templates::counters)
        .map(templateInstance -> Response.ok(templateInstance).build());
  }

  @GET
  @Cache(maxAge = 10)
  @Path("form/new/{keysStr}")
  @Produces(MediaType.TEXT_HTML)
  public Response newForm(@NotBlank @RestPath String keysStr) {
    final var keys = encryptionService.decryptObj(keysStr, Keys.class);
    final var buildingId = keys.buildingId();
    if (buildingId == null) {
      return Response.status(Response.Status.BAD_REQUEST).build();
    }

    final var dto = ReserveFundFormDto.builder()
        .clearForm(true)
        .key(keysStr)
        .build();
    return Response.ok(Templates.form(dto)).build();
  }

  @GET
  @Path("/form/{keysStr}")
  @Produces(MediaType.TEXT_HTML)
  public Uni<Response> form(@NotBlank @RestPath String keysStr) {
    final var keys = encryptionService.decryptObj(keysStr, Keys.class);
    log.info("GET form keys: {}", keys);
    if (keys.buildingId() == null || keys.id() == 0) {
      return Uni.createFrom().item(Response.status(Response.Status.BAD_REQUEST).build());
    }

    return service.read(keys.buildingId(), keys.id())
        .map(optional -> {
          if (optional.isEmpty()) {
            return Response.status(Response.Status.NOT_FOUND).build();
          }

          final var reserveFund = optional.get();
          final var dto = ReserveFundFormDto.builder()
              .isEdit(true)
              .clearForm(true)
              .key(keysStr)
              .name(reserveFund.name())
              .fund(reserveFund.fund())
              .expense(reserveFund.expense())
              .pay(reserveFund.pay())
              .active(reserveFund.active())
              .type(reserveFund.type())
              .expenseType(reserveFund.expenseType())
              .addToExpenses(reserveFund.addToExpenses())
              .build();

          return Response.ok(Templates.form(dto)).build();
        });

  }

  @PATCH
  @Produces(MediaType.TEXT_HTML)
  public Uni<Response> update(ReserveFundRequest request) {
    final var keys = encryptionService.decryptObj(request.getKeys(), Keys.class);
    log.info("PATCH keys: {}", keys);
    if (keys.buildingId() == null || keys.id() == 0) {
      return Uni.createFrom().item(Response.status(Response.Status.BAD_REQUEST).build());
    }

    var formDto = formDto(request).toBuilder()
        .isEdit(true)
        .build();

    final var reserveFund = ReserveFund.builder()
        .buildingId(keys.buildingId())
        .id(keys.id())
        .name(formDto.name())
        .fund(formDto.fund())
        .expense(formDto.expense())
        .pay(formDto.pay())
        .active(formDto.active())
        .type(formDto.type())
        .expenseType(formDto.expenseType())
        .addToExpenses(formDto.addToExpenses())
        .build();

    final var newKeys = reserveFund.keys(keys.receiptId(), keys.cardId());

    if (newKeys.hash() == keys.hash()) {
      formDto = formDto.toBuilder()
          .generalError("No hay cambios para guardar")
          .build();
    }

    if (!formDto.isSuccess()) {
      return Uni.createFrom().item(Response.ok(Templates.form(formDto)).build());
    }

    return Uni.combine().all()
        .unis(rateUni(keys.receiptId()),
            expenseService.readByReceipt(keys.receiptId()), service.update(reserveFund),
            service.listByBuilding(keys.buildingId()))
        .with((rate, expenses, i, reserveFunds) -> {

          final var expensesCount = expenses.size();
          reserveFunds.removeIf(r -> r.id() == keys.id());
          reserveFunds.add(reserveFund);

          final var newKey = encryptionService.encryptObj(newKeys);

          return ReserveFundFormDto.builder()
              .key(newKey)
              .tableItem(ReserveFundTableItem.builder()
                  .key(newKey)
                  .item(reserveFund)
                  .outOfBoundsUpdate(true)
                  .cardId(newKeys.cardId())
                  .build())
              .expenseCountersDto(expenseCountersDto(expensesCount, rate.rate(), expenses, reserveFunds))
              .build();
        })
        .map(Templates::form)
        .map(t -> Response.ok(t).build());
  }

  private ExpenseCountersDto expenseCountersDto(
      int expensesCount, BigDecimal rate, List<Expense> expenses, List<ReserveFund> reserveFunds) {
    final var expenseTotalsBeforeReserveFunds = ConvertUtil.expenseTotals(rate, expenses);

    final var reserveFundExpenses = ConvertUtil.reserveFundExpenses(expenseTotalsBeforeReserveFunds, reserveFunds,
        expenses);

    final var expenseTotals = ConvertUtil.expenseTotals(rate, expenses);

    return ExpenseCountersDto.builder()
        .count(expensesCount)
        .commonTotal(expenseTotalsBeforeReserveFunds.formatCommon())
        .unCommonTotal(expenseTotalsBeforeReserveFunds.formatUnCommon())
        .commonTotalPlusReserveFunds(expenseTotals.formatCommon())
        .unCommonTotalPlusReserveFunds(expenseTotals.formatUnCommon())
        .reserveFundExpenses(reserveFundExpenses)
        .build();
  }

  @POST
  @Produces(MediaType.TEXT_HTML)
  public Uni<Response> create(ReserveFundRequest request) {

    final var keys = encryptionService.decryptObj(request.getKeys(), Keys.class);

    if (keys.buildingId() == null) {
      return Uni.createFrom().item(Response.status(Response.Status.BAD_REQUEST).build());
    }

    final var formDto = formDto(request);

    if (!formDto.isSuccess()) {
      return Uni.createFrom().item(Response.ok(Templates.form(formDto)).build());
    }

    final var update = ReserveFund.builder()
        .buildingId(keys.buildingId())
        .name(formDto.name())
        .fund(formDto.fund())
        .expense(formDto.expense())
        .pay(formDto.pay())
        .active(formDto.active())
        .type(formDto.type())
        .expenseType(formDto.expenseType())
        .addToExpenses(formDto.addToExpenses())
        .build();

    return Uni.combine().all()
        .unis(rateUni(keys.receiptId()),
            expenseService.readByReceipt(keys.receiptId()), service.listByBuilding(keys.buildingId()),
            service.count(keys.buildingId()), service.insert(update))
        .with((rate, expenses, reserveFunds, count, id) -> {
          final var expensesCount = expenses.size();
          final var reserveFund = update.toBuilder()
              .id(id)
              .build();

          reserveFunds.add(reserveFund);

          final var keys1 = reserveFund.keys(keys.receiptId());
          final var dto = ReserveFundFormDto.builder()
              .key(request.getKeys())
              .tableItem(ReserveFundTableItem.builder()
                  .key(encryptionService.encryptObj(keys1))
                  .item(reserveFund)
                  .addAfterEnd(true)
                  .cardId(keys1.cardId())
                  .build())
              .counters(ReserveFundCountersDto.count(count + 1))
              .expenseCountersDto(expenseCountersDto(expensesCount, rate.rate(), expenses, reserveFunds))
              .build();

          return Templates.form(dto);
        })
        .map(t -> Response.ok(t).build());

  }

  private ReserveFundFormDto formDto(ReserveFundRequest request) {

    final var name = StringUtil.trimFilter(request.getName());

    final var fund = Optional.ofNullable(request.getFund())
        .map(StringUtil::trimFilter)
        .map(DecimalUtil::ofString)
        .orElse(BigDecimal.ZERO);

    final var expense = Optional.ofNullable(request.getExpense())
        .map(StringUtil::trimFilter)
        .map(DecimalUtil::ofString)
        .orElse(BigDecimal.ZERO);

    final var pay = Optional.ofNullable(request.getPay())
        .map(StringUtil::trimFilter)
        .map(DecimalUtil::ofString)
        .orElse(null);

    final var reserveFundType = Optional.ofNullable(request.getType())
        .orElse(ReserveFundType.PERCENTAGE);

    final var expenseType = Optional.ofNullable(request.getExpenseType())
        .orElse(ExpenseType.COMMON);

    return ReserveFundFormDto.builder()
        .key(request.getKeys())
        .name(name)
        .nameFieldError(name == null || name.isEmpty() ? "No puede estar vacio" : null)
        .fund(fund)
        .expense(expense)
        .pay(pay)
        .payFieldError(pay == null || DecimalUtil.zeroOrLess(pay) ? "Debe ser mayor a 0" : null)
        .active(request.isActive())
        .type(reserveFundType)
        .expenseType(expenseType)
        .addToExpenses(request.isAddToExpenses())
        .build();
  }

}
