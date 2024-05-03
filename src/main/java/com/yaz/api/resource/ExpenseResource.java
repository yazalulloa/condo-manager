package com.yaz.api.resource;


import com.yaz.api.domain.response.ExpenseCountersDto;
import com.yaz.api.domain.response.ExpenseFormDto;
import com.yaz.api.domain.response.ExpenseTableItem;
import com.yaz.core.service.EncryptionService;
import com.yaz.core.service.entity.ExpenseService;
import com.yaz.core.service.entity.RateService;
import com.yaz.core.util.ConvertUtil;
import com.yaz.core.util.DecimalUtil;
import com.yaz.core.util.StringUtil;
import com.yaz.persistence.domain.Currency;
import com.yaz.persistence.domain.ExpenseType;
import com.yaz.persistence.entities.Expense.Keys;
import io.quarkus.qute.CheckedTemplate;
import io.quarkus.qute.TemplateInstance;
import io.smallrye.mutiny.Uni;
import io.vertx.core.json.Json;
import jakarta.inject.Inject;
import jakarta.validation.constraints.NotBlank;
import jakarta.ws.rs.BeanParam;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.PATCH;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jboss.resteasy.reactive.Cache;
import org.jboss.resteasy.reactive.RestForm;
import org.jboss.resteasy.reactive.RestPath;

@Slf4j
@Path(ExpenseResource.PATH)
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class ExpenseResource {

  public static final String PATH = "/api/expenses";
  public static final String DELETE_PATH = PATH + "/";

  private final EncryptionService encryptionService;
  private final ExpenseService expenseService;
  private final RateService rateService;

  @CheckedTemplate
  public static class Templates {

    public static native TemplateInstance counters(ExpenseCountersDto dto);

    public static native TemplateInstance form(ExpenseFormDto dto);

    public static native TemplateInstance grid(List<ExpenseTableItem> list);
  }

  @DELETE
  @Path("{id}")
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> delete(@NotBlank @RestPath String id) {

    final var json = encryptionService.decrypt(id);
    final var keys = Json.decodeValue(json, Keys.class);

    final var templateInstanceUni = Uni.combine().all()
        .unis(expenseService.countByReceipt(keys.receiptId()), rateService.get(keys.rateId()),
            expenseService.readByReceipt(keys.receiptId()), expenseService.delete(keys))
        .with((count, rate, expenses, i) -> {
          expenses.removeIf(expense -> expense.id() == keys.id());
          final var expenseTotals = ConvertUtil.expenseTotals(rate.rate(), expenses);
          final var countersDto = ExpenseCountersDto.builder()
              .count(count - i)
              .commonTotal(expenseTotals.formatCommon())
              .unCommonTotal(expenseTotals.formatUnCommon())
              .build();

          return Templates.counters(countersDto);
        });

    return expenseService.delete(keys)
        .replaceWith(templateInstanceUni);
  }

  @GET
  @Cache(maxAge = 60)
  @Path("/form/new/{key}")
  @Produces(MediaType.TEXT_HTML)
  public TemplateInstance newForm(@NotBlank @RestPath String key) {
    final var expenseFormDto = ExpenseFormDto.builder()
        .clearForm(true)
        .key(key)
        .build();
    return Templates.form(expenseFormDto);
  }

  @GET
  @Path("/form/{key}")
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> form(@NotBlank @RestPath String key) {
    final var json = encryptionService.decrypt(key);
    final var keys = Json.decodeValue(json, Keys.class);

    return expenseService.get(keys)
        .map(expense -> ExpenseFormDto.builder()
            .isEdit(true)
            .clearForm(true)
            .key(key)
            .description(expense.description())
            .amount(expense.amount())
            .currency(expense.currency())
            .type(expense.type())
            .build())
        .map(Templates::form);
  }

  @Data
  public static class ExpenseRequest {

    @RestForm("expenseDescription")
    private String description;
    @RestForm("expenseAmount")
    private String amount;
    @RestForm("expenseCurrency")
    private Currency currency;
    @RestForm("expenseType")
    private ExpenseType type;
  }

  private ExpenseFormDto formDto(String key, ExpenseRequest request) {
    final var amount = Optional.ofNullable(request.getAmount())
        .map(StringUtil::trimFilter)
        .map(DecimalUtil::ofString)
        .orElse(BigDecimal.ZERO);

    return ExpenseFormDto.builder()
        .key(key)
        .description(request.getDescription())
        .descriptionFieldError(
            StringUtil.trimFilter(request.getDescription()) == null ? "No puede estar vacio" : null)
        .amount(amount)
        .amountFieldError(null)
        .currency(request.getCurrency())
        .type(request.getType())
        .build();

  }

  @POST
  @Path("{key}")
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> create(@NotBlank @RestPath String key, @BeanParam ExpenseRequest request) {
    final var keys = encryptionService.decryptObj(key, Keys.class);
    final var formDto = formDto(key, request);

    if (formDto.isSuccess()) {

      return Uni.combine().all()
          .unis(expenseService.countByReceipt(keys.receiptId()), rateService.get(keys.rateId()),
              expenseService.readByReceipt(keys.receiptId()), expenseService.create(keys, formDto))
          .with((count, rate, expenses, expense) -> {
            expenses.add(expense);

            final var keys1 = expense.keys(keys.rateId());
            final var tableItem = ExpenseTableItem.builder()
                .key(encryptionService.encryptObj(keys1))
                .item(expense)
                .cardId(keys1.cardId())
                .addAfterEnd(true)
                .build();

            final var expenseTotals = ConvertUtil.expenseTotals(rate.rate(), expenses);

            return ExpenseFormDto.builder()
                .key(key)
                .tableItem(tableItem)
                .counters(ExpenseCountersDto.builder()
                    .count(count + 1)
                    .commonTotal(expenseTotals.formatCommon())
                    .unCommonTotal(expenseTotals.formatUnCommon())
                    .build())
                .build();
          })
          .map(Templates::form);
    } else {
      return Uni.createFrom().item(Templates.form(formDto));
    }
  }

  @PATCH
  @Path("{key}")
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> patch(@NotBlank @RestPath String key, @BeanParam ExpenseRequest request) {
    final var keys = encryptionService.decryptObj(key, Keys.class);
    final var formDto = formDto(key, request).toBuilder()
        .isEdit(true)
        .build();

    if (!formDto.isSuccess()) {
      return Uni.createFrom().item(Templates.form(formDto));
    }

    return Uni.combine().all()
        .unis(rateService.get(keys.rateId()),
            expenseService.readByReceipt(keys.receiptId()), expenseService.get(keys))
        .withUni((rate, expenses, e) -> {
          if (Objects.equals(e.description(), formDto.description())
              && Objects.equals(e.amount(), formDto.amount())
              && Objects.equals(e.currency(), formDto.currency())
              && Objects.equals(e.type(), formDto.type())) {
            return Uni.createFrom().item(formDto.toBuilder()
                .generalError("No hay cambios para guardar")
                .build());
          }

            expenses.removeIf(expense -> expense.id() == keys.id());

          return expenseService.update(keys, formDto)
              .map(expense -> {
                expenses.add(expense);

                final var tableItem = ExpenseTableItem.builder()
                    .key(key)
                    .item(expense)
                    .cardId(keys.cardId())
                    .outOfBoundsUpdate(true)
                    .build();

                final var expenseTotals = ConvertUtil.expenseTotals(rate.rate(), expenses);

                return ExpenseFormDto.builder()
                    .key(
                        encryptionService.encryptObj(Keys.of(keys.buildingId(), keys.receiptId(), keys.rateId())))
                    .tableItem(tableItem)
                    .counters(ExpenseCountersDto.builder()
                        .commonTotal(expenseTotals.formatCommon())
                        .unCommonTotal(expenseTotals.formatUnCommon())
                        .build())
                    .build();
              });
        })
        .map(Templates::form);
  }
}
