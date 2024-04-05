package com.yaz.api.resource;

import com.yaz.api.domain.request.ReserveFundRequest;
import com.yaz.api.domain.response.ReserveFundFormDto;
import com.yaz.persistence.domain.ExpenseType;
import com.yaz.persistence.domain.ReserveFundType;
import com.yaz.persistence.entities.ReserveFund;
import com.yaz.persistence.entities.ReserveFund.Keys;
import com.yaz.api.domain.response.ReserveFundTableItem;
import com.yaz.core.service.EncryptionService;
import com.yaz.core.service.entity.ReserveFundService;
import com.yaz.core.util.DateUtil;
import com.yaz.core.util.DecimalUtil;
import com.yaz.core.util.StringUtil;
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
import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jboss.resteasy.reactive.Cache;
import org.jboss.resteasy.reactive.RestHeader;
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

  @CheckedTemplate
  public static class Templates {

    public static native TemplateInstance form(ReserveFundFormDto dto);
  }

  @DELETE
  @Path("{keysStr}")
  public Uni<Response> delete(@NotBlank @RestPath String keysStr) {
    final var keys = encryptionService.decryptObj(keysStr, Keys.class);

    if (keys.buildingId() == null || keys.id() == null) {
      return Uni.createFrom().item(Response.status(Response.Status.BAD_REQUEST).build());
    }

    return service.delete(keys.buildingId(), keys.id())
        .replaceWith(Response.ok().build());
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
  public Uni<Response> form(@NotBlank @RestPath String keysStr, @NotBlank @RestHeader String cardId) {
    final var keys = encryptionService.decryptObj(keysStr, Keys.class);

    if (keys.buildingId() == null || keys.id() == null || cardId == null) {
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
              .key(keysStr)
              .cardId(cardId)
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

    if (keys.buildingId() == null || keys.id() == null) {
      return Uni.createFrom().item(Response.status(Response.Status.BAD_REQUEST).build());
    }

    final var formDto = formDto(request);

    if (!formDto.isSuccess()) {
      return Uni.createFrom().item(Response.ok(Templates.form(formDto)).build());
    }

    final var reserveFund = ReserveFund.builder()
        .buildingId(keys.buildingId())
        .id(keys.id())
        .name(formDto.getName())
        .fund(formDto.getFund())
        .expense(formDto.getExpense())
        .pay(formDto.getPay())
        .active(formDto.isActive())
        .type(formDto.getType())
        .expenseType(formDto.getExpenseType())
        .addToExpenses(formDto.isAddToExpenses())
        .build();

    final var dto = ReserveFundFormDto.builder()
        .key(request.getKeys())
        .tableItem(ReserveFundTableItem.builder()
            .key(encryptionService.encryptObj(reserveFund.keys()))
            .item(reserveFund)
            .outOfBoundsUpdate(true)
            .cardId(request.getCardId())
            .build())
        .build();

    log.info("update Dto {}", dto);

    return service.update(reserveFund)
        .replaceWith(Response.ok(Templates.form(dto)).build());
  }

  @POST
  @Produces(MediaType.TEXT_HTML)
  public Uni<Response> create(ReserveFundRequest request) {

    final var keys = encryptionService.decryptObj(request.getKeys(), Keys.class);

    if (keys.buildingId() == null) {
      return Uni.createFrom().item(Response.status(Response.Status.BAD_REQUEST).build());
    }

    final var formDto = formDto(request);

    if (formDto.isSuccess()) {
      final var reserveFund = ReserveFund.builder()
          .buildingId(keys.buildingId())
          .id(DateUtil.epochSecond() + UUID.randomUUID().toString())
          .name(formDto.getName())
          .fund(formDto.getFund())
          .expense(formDto.getExpense())
          .pay(formDto.getPay())
          .active(formDto.isActive())
          .type(formDto.getType())
          .expenseType(formDto.getExpenseType())
          .addToExpenses(formDto.isAddToExpenses())
          .build();

      final var dto = ReserveFundFormDto.builder()
          .key(request.getKeys())
          .tableItem(ReserveFundTableItem.builder()
              .key(encryptionService.encryptObj(reserveFund.keys()))
              .item(reserveFund)
              .addAfterEnd(true)
              .build())
          .build();

      return service.create(reserveFund)
          .replaceWith(Response.ok(Templates.form(dto)).build());

    }

    return Uni.createFrom().item(Response.ok(Templates.form(formDto)).build());
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
