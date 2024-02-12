package com.yaz.resource;

import com.yaz.persistence.domain.query.BuildingQuery;
import com.yaz.persistence.domain.Currency;
import com.yaz.persistence.entities.Building;
import com.yaz.resource.domain.request.BuildingRequest;
import com.yaz.resource.domain.response.BuildingCountersDto;
import com.yaz.resource.domain.response.BuildingFormDto;
import com.yaz.resource.domain.response.BuildingReportResponse;
import com.yaz.service.BuildingService;
import com.yaz.util.DateUtil;
import com.yaz.util.DecimalUtil;
import com.yaz.util.StringUtil;
import io.quarkus.qute.CheckedTemplate;
import io.quarkus.qute.TemplateInstance;
import io.quarkus.security.Authenticated;
import io.smallrye.mutiny.Uni;
import jakarta.inject.Inject;
import jakarta.ws.rs.BeanParam;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.PATCH;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jboss.resteasy.reactive.RestPath;
import org.jboss.resteasy.reactive.RestQuery;

@Slf4j
@Authenticated
@Path(BuildingResource.PATH)
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class BuildingResource {

  public static final String PATH = "/api/buildings";
  public static final String DELETE_PATH = PATH + "/";

  private final BuildingService service;

  @CheckedTemplate
  public static class Templates {

    public static native TemplateInstance selector(List<String> list);

    public static native TemplateInstance report(BuildingReportResponse res);

    public static native TemplateInstance form(BuildingFormDto dto);

    public static native TemplateInstance counters(BuildingCountersDto dto);
  }

  @GET
  @Path("selector")
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> selector() {
    return service.ids()
        .map(Templates::selector);
  }

  @GET
  @Path("report")
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> report(@RestQuery String lastId) {

    return service.report(BuildingQuery.of(lastId))
        .map(Templates::report);
  }

  @DELETE
  @Path("{buildingId}")
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> delete(@RestPath String buildingId) {

    log.info("Deleting building {}", buildingId);

    return service.delete(buildingId)
        .invoke(l -> log.info("Building delete {} deleted {}", l, buildingId))
        .replaceWith(counters());
  }

  @GET
  @Path("counters")
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> counters() {

    return service.count()
        .map(BuildingCountersDto::new)
        .map(Templates::counters);
  }


  @GET
  @Path("new")
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> newForm() {
    return Uni.createFrom().item(Templates.form(BuildingFormDto.builder()
        .isNew(true)
        .mainCurrency(Currency.VED)
        .debtCurrency(Currency.VED)
        .currenciesToShowAmountToPay(Set.of(Currency.VED))
        .build()));
  }

  @GET
  @Path("edit_form")
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> editForm(@RestQuery String buildingId) {
    return service.get(buildingId)
        .map(optional -> {
          if (optional.isEmpty()) {
            return BuildingFormDto.builder()
                .shouldRedirect(true)
                .build();
          }

          final var building = optional.get();
          return BuildingFormDto.builder()
              .isEdit(true)
              .id(building.id())
              .readOnlyId(true)
              .name(building.name())
              .rif(building.rif())
              .mainCurrency(building.mainCurrency())
              .debtCurrency(building.debtCurrency())
              .currenciesToShowAmountToPay(building.currenciesToShowAmountToPay())
              .fixedPay(building.fixedPay())
              .fixedPayAmount(building.fixedPayAmount())
              .roundUpPayments(building.roundUpPayments())
              .emailConfig(building.emailConfig())
              .build();
        })
        .map(Templates::form);
  }

  private BuildingFormDto formDto(BuildingRequest request) {
    final var id = StringUtil.trimFilter(request.getId());
    final var name = StringUtil.trimFilter(request.getName());

    final var currenciesToShowAmountToPay = Optional.ofNullable(request.getCurrenciesToShowAmountToPay())
        .orElseGet(() -> Set.of(request.getMainCurrency()));

    final var requestFixedPayAmount = DecimalUtil.ofString(request.getFixedPayAmount());

    final var fixedPayAmount =
        request.isFixedPay() && requestFixedPayAmount != null && DecimalUtil.greaterThanZero(requestFixedPayAmount)
            ? requestFixedPayAmount : null;

    return BuildingFormDto.builder()
        .id(id)
        .idFieldError(id == null ? "ID no puede estar vacio" : null)
        .name(name)
        .nameFieldError(name == null ? "Nombre no puede estar vacio" : null)
        .rif(request.getRif())
        .mainCurrency(request.getMainCurrency())
        .mainCurrencyFieldError(request.getMainCurrency() == null ? "Moneda principal no puede estar vacia" : null)
        .debtCurrency(request.getDebtCurrency())
        .debtCurrencyFieldError(request.getDebtCurrency() == null ? "Moneda deuda no puede estar vacia" : null)
        .currenciesToShowAmountToPay(currenciesToShowAmountToPay)
        .fixedPay(request.isFixedPay())
        .fixedPayAmount(fixedPayAmount)
        .fixedPayAmountFieldError(
            request.isFixedPay() && fixedPayAmount == null ? "Monto fijo no puede estar vacio" : null)
        .roundUpPayments(request.isRoundUpPayments())
        .emailConfig(request.getEmailConfig())
        .build();
  }

  @POST
  @Path("new")
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> create(@BeanParam BuildingRequest request) {

    log.info("request: {}", request);
    final var buildingFormDto = formDto(request).toBuilder()
        .build();

    if (buildingFormDto.getId() != null) {
      return service.exists(buildingFormDto.getId())
          .map(bool -> {
            if (bool) {
              return buildingFormDto.toBuilder()
                  .idFieldError("ID ya existe")
                  .build();
            }

            return buildingFormDto;
          })
          .flatMap(dto -> {
            if (!dto.isSuccess()) {
              return Uni.createFrom().item(dto);
            }

            final var building = Building.builder()
                .id(dto.getId())
                .name(dto.getName())
                .rif(request.getRif())
                .mainCurrency(request.getMainCurrency())
                .debtCurrency(request.getDebtCurrency())
                .currenciesToShowAmountToPay(request.getCurrenciesToShowAmountToPay())
                .fixedPay(request.isFixedPay())
                .fixedPayAmount(dto.getFixedPayAmount())
                .roundUpPayments(request.isRoundUpPayments())
                .emailConfig(request.getEmailConfig())
                .createdAt(DateUtil.utcLocalDateTime())
                .build();

            return service.create(building)
                .replaceWith(dto.toBuilder()
                    .shouldRedirect(true)
                    .build());
          })
          .map(Templates::form);
    }

    return Uni.createFrom().item(Templates.form(buildingFormDto));

  }

  @PATCH
  @Path("edit")
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> edit(@BeanParam BuildingRequest request) {

    final var buildingFormDto = formDto(request).toBuilder()
        .isEdit(true)
        .readOnlyId(true)
        .build();

    if (!buildingFormDto.isSuccess()) {
      return Uni.createFrom().item(Templates.form(buildingFormDto));
    }

    final var dto = buildingFormDto.toBuilder()
        .shouldRedirect(true)
        .build();

    final var building = Building.builder()
        .id(buildingFormDto.getId())
        .name(buildingFormDto.getName())
        .rif(request.getRif())
        .mainCurrency(request.getMainCurrency())
        .debtCurrency(request.getDebtCurrency())
        .currenciesToShowAmountToPay(request.getCurrenciesToShowAmountToPay())
        .fixedPay(request.isFixedPay())
        .fixedPayAmount(buildingFormDto.getFixedPayAmount())
        .roundUpPayments(request.isRoundUpPayments())
        .emailConfig(request.getEmailConfig())
        .updatedAt(DateUtil.utcLocalDateTime())
        .build();

    return service.update(building)
        .replaceWith(dto)
        .map(Templates::form);
  }

}
