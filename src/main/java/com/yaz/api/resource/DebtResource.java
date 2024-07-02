package com.yaz.api.resource;

import com.yaz.api.domain.response.DebtCountersDto;
import com.yaz.api.domain.response.DebtFormDto;
import com.yaz.api.domain.response.DebtTableItem;
import com.yaz.api.domain.response.debt.DebtFormResponse;
import com.yaz.core.service.EncryptionService;
import com.yaz.core.service.entity.BuildingService;
import com.yaz.core.service.entity.DebtService;
import com.yaz.core.util.DecimalUtil;
import com.yaz.core.util.StringUtil;
import com.yaz.core.util.TemplateUtil;
import com.yaz.persistence.domain.Currency;
import com.yaz.persistence.entities.Debt;
import com.yaz.persistence.entities.Debt.Keys;
import io.quarkus.qute.CheckedTemplate;
import io.quarkus.qute.TemplateInstance;
import io.quarkus.security.Authenticated;
import io.smallrye.mutiny.Uni;
import jakarta.inject.Inject;
import jakarta.validation.constraints.NotBlank;
import jakarta.ws.rs.BeanParam;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.PATCH;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jboss.resteasy.reactive.RestForm;
import org.jboss.resteasy.reactive.RestPath;

@Slf4j
@Authenticated
@Path(DebtResource.PATH)
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class DebtResource {

  public static final String PATH = "/api/debts";
  public static final String DELETE_PATH = PATH + "/";

  private final EncryptionService encryptionService;
  private final DebtService debtService;
  private final BuildingService buildingService;

  @CheckedTemplate
  public static class Templates {

    public static native TemplateInstance counters(DebtCountersDto dto);

    public static native TemplateInstance form(DebtFormDto dto);

    public static native TemplateInstance grid(List<DebtTableItem> list);

    public static native TemplateInstance responseForm(DebtFormResponse dto);
  }

  @DELETE
  @Path("{keys}")
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> delete(@NotBlank @RestPath String keys) {
    final var key = encryptionService.decryptObj(keys, Keys.class);
    return null;
  }

  @GET
  @Path("/form/{key}")
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> form(@NotBlank @RestPath String key) {

    final var keys = encryptionService.decryptObj(key, Keys.class);

    return debtService.get(keys)
        .map(debt -> DebtFormDto.builder()
            .isEdit(true)
            .clearForm(true)
            .key(key)
            .apt(debt.aptNumber() + " " + debt.aptName())
            .receipts(debt.receipts())
            .amount(debt.amount())
            .months(debt.months())
            .previousPaymentAmount(debt.previousPaymentAmount())
            .previousPaymentAmountCurrency(debt.previousPaymentAmountCurrency())
            .build())
        .map(Templates::form);
  }

  @Data
  public static class DebtRequest {

    @RestForm
    private int receipts;
    @RestForm
    private String amount;
    @RestForm
    private Set<Integer> months;
    @RestForm
    private String previousPaymentAmount;
    @RestForm
    private Currency previousPaymentAmountCurrency;
  }

  @PATCH
  @Path("{key}")
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> patch(@NotBlank @RestPath String key, @BeanParam DebtRequest request) {
    final var keys = encryptionService.decryptObj(key, Keys.class);

    return Uni.combine().all()
        .unis(buildingService.get(keys.buildingId()), debtService.readByReceipt(keys.buildingId(), keys.receiptId()))
        .withUni((building, debts) -> {

          final var oldDebt = debts.stream()
              .filter(d -> d.aptNumber().equals(keys.aptNumber()))
              .findFirst()
              .orElseThrow();

          final var amount = Optional.ofNullable(request.getAmount())
              .map(StringUtil::trimFilter)
              .map(DecimalUtil::ofString)
              .orElse(BigDecimal.ZERO);

          final var previousPaymentAmount = Optional.ofNullable(request.getPreviousPaymentAmount())
              .map(StringUtil::trimFilter)
              .map(DecimalUtil::ofString)
              .orElse(BigDecimal.ZERO);

          var debtFormDto = DebtFormDto.builder()
              .key(key)
              .isEdit(true)
              .apt(oldDebt.aptNumber() + " " + oldDebt.aptName())
              .receipts(request.getReceipts())
              .amount(amount)
              .months(request.getMonths())
              .previousPaymentAmount(previousPaymentAmount)
              .previousPaymentAmountCurrency(request.getPreviousPaymentAmountCurrency())
              .build();

          if (Objects.equals(oldDebt.receipts(), debtFormDto.receipts())
              && Objects.equals(oldDebt.amount(), debtFormDto.amount())
              && Objects.equals(oldDebt.months(), debtFormDto.months())
              && Objects.equals(oldDebt.previousPaymentAmount(), debtFormDto.previousPaymentAmount())
              && Objects.equals(oldDebt.previousPaymentAmountCurrency(), debtFormDto.previousPaymentAmountCurrency())) {

            debtFormDto = debtFormDto.toBuilder()
                .generalError("No hay cambios para guardar")
                .build();
          }

          if (!debtFormDto.isSuccess()) {
            return Uni.createFrom().item(Templates.form(debtFormDto));
          }

          debts.removeIf(d -> d.aptNumber().equals(keys.aptNumber()));

          final var debt = oldDebt.toBuilder()
              .receipts(debtFormDto.receipts())
              .amount(debtFormDto.amount())
              .months(debtFormDto.months())
              .previousPaymentAmount(debtFormDto.previousPaymentAmount())
              .previousPaymentAmountCurrency(debtFormDto.previousPaymentAmountCurrency())
              .build();

          debts.add(debt);
          final var debtTotal = debts.stream().map(Debt::amount).reduce(BigDecimal::add).orElse(BigDecimal.ZERO);
          final var dto = debtFormDto.toBuilder()
              .isUpdate(true)
              .tableItem(DebtTableItem.builder()
                  .key(key)
                  .item(debt)
                  .currency(building.debtCurrency())
                  .cardId(keys.cardId())
                  .outOfBoundsUpdate(true)
                  .build())
              .counters(DebtCountersDto.builder()
                  .count(debts.size())
                  .receipts(debts.stream().map(Debt::receipts).reduce(Integer::sum).orElse(0))
                  .total(building.debtCurrency().format(debtTotal))
                  .build())
              .build();

          return debtService.update(debt)
              .map(i -> Templates.form(dto));
        });
  }

  @PUT
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> update(@BeanParam DebtUpdateRequest request) {

    final var keys = encryptionService.decryptObj(request.getKey(), Keys.class);
    log.info("PUT {} {}", request, keys);

    final var amount = Optional.ofNullable(request.getAmount())
        .map(StringUtil::trimFilter)
        .map(DecimalUtil::ofString)
        .orElse(BigDecimal.ZERO);

    final var previousPaymentAmount = Optional.ofNullable(request.getPreviousPaymentAmount())
        .map(StringUtil::trimFilter)
        .map(DecimalUtil::ofString)
        .orElse(BigDecimal.ZERO);

    final var update = Debt.builder()
        .buildingId(keys.buildingId())
        .receiptId(keys.receiptId())
        .aptNumber(keys.aptNumber())
        .receipts(request.getReceipts())
        .amount(amount)
        .months(request.getMonths())
        .previousPaymentAmount(previousPaymentAmount)
        .previousPaymentAmountCurrency(request.getPreviousPaymentAmountCurrency())
        .build();

    final var newKeys = update.keys(keys.cardId());

    if (newKeys.hash() == keys.hash()) {
      return TemplateUtil.templateUni(Templates.responseForm(DebtFormResponse.builder()
          .generalFieldError("No hay cambios para guardar")
          .build()));

    }
//    else if (true) {
//
//      return debtService.get(keys)
//          .invoke(debt -> {
//            log.info("DB debt {} new debt {}", debt, update);
//          })
//          .replaceWith(Templates.responseForm(DebtFormResponse.builder()
//              .generalFieldError("Si hay cambios para guardar")
//              .build()));
//    }

    return Uni.combine().all()
        .unis(debtService.update(update), buildingService.get(keys.buildingId()),
            debtService.readByReceipt(keys.buildingId(), keys.receiptId()))
        .with((i, building, debts) -> {

          final var debt = debts.stream()
              .filter(d -> d.aptNumber().equals(keys.aptNumber()))
              .findFirst()
              .map(Debt::aptName)
              .map(name -> update.toBuilder()
                  .aptName(name)
                  .build())
              .orElseThrow();
          debts.removeIf(d -> d.aptNumber().equals(keys.aptNumber()));
          debts.add(debt);
          final var debtTotal = debts.stream().map(Debt::amount).reduce(BigDecimal::add).orElse(BigDecimal.ZERO);

          return DebtFormResponse.builder()
              .tableItem(DebtTableItem.builder()
                  .key(encryptionService.encryptObj(newKeys))
                  .item(debt)
                  .currency(building.debtCurrency())
                  .cardId(newKeys.cardId())
                  .outOfBoundsUpdate(true)
                  .build())
              .counters(DebtCountersDto.builder()
                  .count(debts.size())
                  .receipts(debts.stream().map(Debt::receipts).reduce(Integer::sum).orElse(0))
                  .total(building.debtCurrency().format(debtTotal))
                  .build())
              .build();
        })
        .map(Templates::responseForm);
  }

  @Data
  public static class DebtUpdateRequest {

    @RestForm
    String key;
    @RestForm
    int receipts;
    @RestForm
    String amount;
    @RestForm("month_input")
    Set<Integer> months;
    @RestForm
    String previousPaymentAmount;
    @RestForm
    Currency previousPaymentAmountCurrency;
  }


}
