package com.yaz.api.resource;

import com.yaz.api.domain.response.ExpenseCountersDto;
import com.yaz.api.domain.response.ReserveFundCountersDto;
import com.yaz.api.domain.response.ReserveFundTableItem;
import com.yaz.api.domain.response.reserve.funds.ReserveFundFormResponse;
import com.yaz.core.service.EncryptionService;
import com.yaz.core.service.entity.ExpenseService;
import com.yaz.core.service.entity.RateService;
import com.yaz.core.service.entity.ReceiptService;
import com.yaz.core.service.entity.ReserveFundService;
import com.yaz.core.util.ConvertUtil;
import com.yaz.core.util.DecimalUtil;
import com.yaz.core.util.StringUtil;
import com.yaz.core.util.TemplateUtil;
import com.yaz.persistence.domain.ExpenseType;
import com.yaz.persistence.domain.ReserveFundType;
import com.yaz.persistence.entities.Expense;
import com.yaz.persistence.entities.Rate;
import com.yaz.persistence.entities.ReserveFund;
import com.yaz.persistence.entities.ReserveFund.Keys;
import io.quarkus.qute.CheckedTemplate;
import io.quarkus.qute.TemplateInstance;
import io.quarkus.security.Authenticated;
import io.smallrye.mutiny.Uni;
import jakarta.inject.Inject;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.ws.rs.BeanParam;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicReference;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jboss.resteasy.reactive.RestForm;
import org.jboss.resteasy.reactive.RestPath;

@Slf4j
@Path(ReserveFundResource.PATH)
@Authenticated
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

    public static native TemplateInstance counters(ReserveFundCountersDto dto);

    public static native TemplateInstance responseForm(ReserveFundFormResponse dto);
  }

  private Uni<Optional<Rate>> rateUni(long receiptId) {
    return receiptService.read(receiptId)
        .flatMap(opt -> {

          if (opt.isEmpty()) {
            return Uni.createFrom().item(Optional.empty());
          }

          final var receipt = opt.get();
          return rateService.get(receipt.rateId())
              .map(Optional::of);
        });
  }

  @DELETE
  @Path("{keysStr}")
  public Uni<Response> delete(@NotBlank @RestPath String keysStr) {
    final var keys = encryptionService.decryptObj(keysStr, Keys.class);

    if (keys.buildingId() == null || keys.id() == 0) {
      return Uni.createFrom().item(Response.status(Response.Status.BAD_REQUEST).build());
    }

    if (keys.receiptId() == 0) {
      return Uni.combine().all()
          .unis(service.count(keys.buildingId()), service.delete(keys.buildingId(), keys.id()))
          .with((count, i) -> ReserveFundCountersDto.count(count - i))
          .map(Templates::counters)
          .map(templateInstance -> Response.ok(templateInstance).build());
    }

    return Uni.combine().all()
        .unis(rateUni(keys.receiptId()),
            expenseService.readByReceipt(keys.receiptId()), service.listByBuilding(keys.buildingId()),
            service.count(keys.buildingId()), service.delete(keys.buildingId(), keys.id()))
        .with((optRate, expenses, reserveFunds, count, i) -> {

          final var expenseCountersDto = optRate.map(rate -> {
            reserveFunds.removeIf(r -> r.id() == keys.id());
            final var expensesCount = expenses.size();
            return expenseCountersDto(expensesCount, rate.rate(), expenses, reserveFunds);
          }).orElse(null);

          return ReserveFundCountersDto.builder()
              .count(count - i)
              .expenseCountersDto(expenseCountersDto)
              .build();
        })
        .map(Templates::counters)
        .map(templateInstance -> Response.ok(templateInstance).build());
  }

  @Data
  public static class ReserveFundBeanRequest {

    @RestForm
    @NotNull
    private String key;
    @RestForm
    String name;
    @RestForm
    String fund;
    @RestForm
    String expense;
    @RestForm
    String pay;
    @RestForm
    boolean active;
    @RestForm
    ReserveFundType type;
    @RestForm
    ExpenseType expenseType;
    @RestForm
    boolean addToExpenses;
  }

  @PUT
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> upsert(@BeanParam ReserveFundBeanRequest request) {

    final var keys = encryptionService.decryptObj(request.getKey(), Keys.class);

    log.info("keys: {}", keys);

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

    AtomicReference<ReserveFundFormResponse> reserveFundFormResponse = new AtomicReference<>(
        ReserveFundFormResponse.builder()
            .nameFieldError(name == null || name.isEmpty() ? "No puede estar vacio" : null)
            .payFieldError(pay == null || DecimalUtil.zeroOrLess(pay) ? "Debe ser mayor a 0" : null)
            .build());

    if (!reserveFundFormResponse.get().isSuccess()) {
      return TemplateUtil.templateUni(Templates.responseForm(reserveFundFormResponse.get()));
    }

    final var reserveFund = ReserveFund.builder()
        .buildingId(keys.buildingId())
        .id(keys.id())
        .name(name)
        .fund(fund)
        .expense(expense)
        .pay(pay)
        .active(request.isActive())
        .type(reserveFundType)
        .expenseType(expenseType)
        .addToExpenses(request.isAddToExpenses())
        .build();

    return Uni.createFrom().deferred(() -> {

          if (keys.id() > 0) {
            final var newKeys = reserveFund.keys(keys.receiptId(), keys.cardId());
            if (newKeys.hash() == keys.hash()) {
              reserveFundFormResponse.set(reserveFundFormResponse.get().toBuilder()
                  .generalFieldError("No hay cambios para guardar")
                  .build());

              return Uni.createFrom().item(reserveFundFormResponse.get());
            }

            return service.update(reserveFund)
                .map(i -> {
                  final var newKey = encryptionService.encryptObj(newKeys);
                  return ReserveFundFormResponse.builder()
                      .tableItem(ReserveFundTableItem.builder()
                          .key(newKey)
                          .item(reserveFund)
                          .outOfBoundsUpdate(true)
                          .cardId(newKeys.cardId())
                          .build())
                      .build();
                });
          }

          return Uni.combine().all()
              .unis(service.count(keys.buildingId()), service.insert(reserveFund))
              .with((count, id) -> {

                final var built = reserveFund.toBuilder()
                    .id(id)
                    .build();
                final var newKeys = built.keys(keys.receiptId());
                final var newKey = encryptionService.encryptObj(newKeys);
                return ReserveFundFormResponse.builder()
                    .tableItem(ReserveFundTableItem.builder()
                        .key(newKey)
                        .item(built)
                        .addAfterEnd(true)
                        .cardId(newKeys.cardId())
                        .build())
                    .counters(ReserveFundCountersDto.count(count + 1))
                    .build();
              });
        })
        .flatMap(formResponse -> {

          if (keys.receiptId() == 0) {
            return Uni.createFrom().item(formResponse);
          }

          return Uni.combine().all()
              .unis(rateUni(keys.receiptId()),
                  expenseService.readByReceipt(keys.receiptId()), service.listByBuilding(keys.buildingId()))
              .with((optRate, expenses, reserveFunds) -> {

                final var expenseCountersDto = optRate.map(rate -> {
                  final var expensesCount = expenses.size();
                  return expenseCountersDto(expensesCount, rate.rate(), expenses, reserveFunds);
                }).orElse(null);

                return formResponse.toBuilder()
                    .expenseCountersDto(expenseCountersDto)
                    .build();
              });

        })
        .map(Templates::responseForm);
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

}

