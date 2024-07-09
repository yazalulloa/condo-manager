package com.yaz.api.resource;


import com.yaz.api.domain.response.ExpenseCountersDto;
import com.yaz.api.domain.response.ExpenseTableItem;
import com.yaz.api.domain.response.expense.ExpenseFormResponse;
import com.yaz.core.service.EncryptionService;
import com.yaz.core.service.entity.ExpenseService;
import com.yaz.core.service.entity.RateService;
import com.yaz.core.service.entity.ReceiptService;
import com.yaz.core.service.entity.ReserveFundService;
import com.yaz.core.util.ConvertUtil;
import com.yaz.core.util.DecimalUtil;
import com.yaz.core.util.StringUtil;
import com.yaz.core.util.TemplateUtil;
import com.yaz.persistence.domain.Currency;
import com.yaz.persistence.domain.ExpenseType;
import com.yaz.persistence.entities.Expense;
import com.yaz.persistence.entities.Expense.Keys;
import com.yaz.persistence.entities.Rate;
import com.yaz.persistence.entities.Receipt;
import io.quarkus.qute.CheckedTemplate;
import io.quarkus.qute.TemplateInstance;
import io.quarkus.security.Authenticated;
import io.smallrye.mutiny.Uni;
import io.vertx.core.json.Json;
import jakarta.inject.Inject;
import jakarta.validation.constraints.NotBlank;
import jakarta.ws.rs.BeanParam;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import java.util.List;
import java.util.Optional;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jboss.resteasy.reactive.RestForm;
import org.jboss.resteasy.reactive.RestPath;

@Slf4j
@Authenticated
@Path(ExpenseResource.PATH)
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class ExpenseResource {

  public static final String PATH = "/api/expenses";
  public static final String DELETE_PATH = PATH + "/";

  private final EncryptionService encryptionService;
  private final ExpenseService expenseService;
  private final RateService rateService;
  private final ReserveFundService reserveFundService;
  private final ReceiptService receiptService;

  private Uni<Rate> rateUni(long receiptId) {
    return receiptService.get(receiptId)
        .map(Receipt::rateId)
        .flatMap(rateService::get);
  }

  @DELETE
  @Path("{id}")
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> delete(@NotBlank @RestPath String id) {

    final var json = encryptionService.decrypt(id);
    final var keys = Json.decodeValue(json, Keys.class);

    return Uni.combine().all()
        .unis(expenseService.countByReceipt(keys.receiptId()), rateUni(keys.receiptId()),
            expenseService.readByReceipt(keys.receiptId()), expenseService.delete(keys),
            reserveFundService.listByBuilding(keys.buildingId()))
        .with((count, rate, expenses, i, reserveFunds) -> {
          expenses.removeIf(expense -> expense.id() == keys.id());

          final var expenseTotalsBeforeReserveFunds = ConvertUtil.expenseTotals(rate.rate(), expenses);

          final var reserveFundExpenses = ConvertUtil.reserveFundExpenses(expenseTotalsBeforeReserveFunds, reserveFunds,
              expenses);

          final var expenseTotals = ConvertUtil.expenseTotals(rate.rate(), expenses);

          final var countersDto = ExpenseCountersDto.builder()
              .count(count - i)
              .commonTotal(expenseTotalsBeforeReserveFunds.formatCommon())
              .unCommonTotal(expenseTotalsBeforeReserveFunds.formatUnCommon())
              .commonTotalPlusReserveFunds(expenseTotals.formatCommon())
              .unCommonTotalPlusReserveFunds(expenseTotals.formatUnCommon())
              .reserveFundExpenses(reserveFundExpenses)
              .build();

          return Templates.counters(countersDto);
        });
  }

  @PUT
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> upsert(@BeanParam ExpenseUpsertRequest request) {
    log.info("upsert: {}", request);

    final var keys = encryptionService.decryptObj(request.getKey(), Keys.class);

    final var description = StringUtil.trimFilter(request.getDescription());
    final var amount = Optional.ofNullable(request.getAmount())
        .map(StringUtil::trimFilter)
        .map(DecimalUtil::ofString)
        .orElse(null);

    final var built = Expense.builder()
        .buildingId(keys.buildingId())
        .receiptId(keys.receiptId())
        .id(keys.id())
        .description(description)
        .amount(amount)
        .currency(Optional.ofNullable(request.getCurrency()).orElse(Currency.VED))
        .type(Optional.ofNullable(request.getType()).orElse(ExpenseType.COMMON))
        .build();

    final var newKeys = keys.id() > 0 ? built.keys(keys.cardId()) : built.keys();

    final var formResponse = ExpenseFormResponse.builder()
        .descriptionFieldError(description == null ? "No puede estar vacio" : null)
        .amountFieldError(amount == null ? "No puede estar vacio" : null)
        .generalFieldError(newKeys.hash() == keys.hash() ? "No hay cambios para guardar" : null)
        .build();

    if (!formResponse.isSuccess()) {
      return TemplateUtil.templateUni(Templates.responseForm(formResponse));
    }

    final var expenseUni = Uni.createFrom().deferred(() -> {
      if (keys.hash() > 0) {
        return expenseService.update(built);
      } else {
        return expenseService.create(built);
      }
    });

    return Uni.combine().all()
        .unis(rateUni(keys.receiptId()), expenseService.readByReceipt(keys.receiptId()), expenseUni,
            reserveFundService.listByBuilding(keys.buildingId()))
        .with((rate, expenses, expense, reserveFunds) -> {
          expenses.removeIf(e -> e.id() == keys.id());
          expenses.add(expense);

          final var tableItem = ExpenseTableItem.builder()
              .key(encryptionService.encryptObj(newKeys))
              .item(expense)
              .cardId(newKeys.cardId())
              .outOfBoundsUpdate(true)
              .addAfterEnd(keys.id() == 0)
              .build();

          final var expenseTotalsBeforeReserveFunds = ConvertUtil.expenseTotals(rate.rate(), expenses);

          final var reserveFundExpenses = ConvertUtil.reserveFundExpenses(expenseTotalsBeforeReserveFunds, reserveFunds,
              expenses);

          final var expenseTotals = ConvertUtil.expenseTotals(rate.rate(), expenses);

          final var expenseCount = expenses.stream().filter(e -> !e.reserveFund()).count();

          return ExpenseFormResponse.builder()
              .tableItem(tableItem)
              .counters(ExpenseCountersDto.builder()
                  .count(expenseCount)
                  .commonTotal(expenseTotalsBeforeReserveFunds.formatCommon())
                  .unCommonTotal(expenseTotalsBeforeReserveFunds.formatUnCommon())
                  .commonTotalPlusReserveFunds(expenseTotals.formatCommon())
                  .unCommonTotalPlusReserveFunds(expenseTotals.formatUnCommon())
                  .reserveFundExpenses(reserveFundExpenses)
                  .build())
              .build();
        })
        .map(Templates::responseForm);
  }

  @CheckedTemplate
  public static class Templates {

    public static native TemplateInstance counters(ExpenseCountersDto dto);

    public static native TemplateInstance grid(List<ExpenseTableItem> list);

    public static native TemplateInstance responseForm(ExpenseFormResponse dto);
  }

  @Data
  public static class ExpenseUpsertRequest {

    @NotBlank
    @RestForm
    String key;
    @RestForm
    String description;
    @RestForm
    String amount;
    @RestForm
    Currency currency;
    @RestForm
    ExpenseType type;
  }

}
