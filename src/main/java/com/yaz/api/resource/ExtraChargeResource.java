package com.yaz.api.resource;

import com.yaz.api.domain.request.ExtraChargeRequest;
import com.yaz.api.domain.response.ExtraChargeFormDto;
import com.yaz.api.domain.response.ExtraChargeTableItem;
import com.yaz.api.domain.response.extra.charge.ExtraChargeFormResponse;
import com.yaz.core.service.EncryptionService;
import com.yaz.core.service.entity.ApartmentService;
import com.yaz.core.service.entity.BuildingService;
import com.yaz.core.service.entity.ExtraChargeService;
import com.yaz.core.util.DecimalUtil;
import com.yaz.core.util.StringUtil;
import com.yaz.core.util.TemplateUtil;
import com.yaz.persistence.domain.Currency;
import com.yaz.persistence.domain.request.ExtraChargeCreateRequest;
import com.yaz.persistence.entities.ExtraCharge;
import com.yaz.persistence.entities.ExtraCharge.Apt;
import com.yaz.persistence.entities.ExtraCharge.Keys;
import com.yaz.persistence.entities.ExtraCharge.Type;
import io.quarkus.qute.CheckedTemplate;
import io.quarkus.qute.TemplateInstance;
import io.quarkus.security.Authenticated;
import io.smallrye.mutiny.Uni;
import io.vertx.core.json.Json;
import jakarta.inject.Inject;
import jakarta.validation.constraints.NotBlank;
import jakarta.ws.rs.BeanParam;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.PATCH;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.Response.Status;
import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.ArrayUtils;
import org.jboss.resteasy.reactive.Cache;
import org.jboss.resteasy.reactive.RestForm;
import org.jboss.resteasy.reactive.RestPath;
import org.jboss.resteasy.reactive.RestQuery;

@Slf4j
@Authenticated
@Path(ExtraChargeResource.PATH)
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class ExtraChargeResource {

  public static final String PATH = "/api/extra_charges";

  private final BuildingService buildingService;
  private final ApartmentService apartmentService;
  private final EncryptionService encryptionService;
  private final ExtraChargeService service;

  @CheckedTemplate
  public static class Templates {

    public static native TemplateInstance counters(long count);

    public static native TemplateInstance form(ExtraChargeFormDto dto);

    public static native TemplateInstance grid(List<ExtraChargeTableItem> extraCharges);

    public static native TemplateInstance responseForm(ExtraChargeFormResponse dto);
  }

  @DELETE
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> delete(@NotBlank @RestQuery String id) {

    final var json = encryptionService.decrypt(id);
    final var keys = Json.decodeValue(json, Keys.class);

    return Uni.combine()
        .all()
        .unis(service.delete(keys),
            service.count(keys))
        .with((i, count) -> {
          if (i > 0) {
            count -= 1;
          }
          return Templates.counters(count);
        });
  }

  @GET
  @Cache(maxAge = 10)
  @Path("/form/new/{key}")
  @Produces(MediaType.TEXT_HTML)
  public Uni<Response> newForm(@NotBlank @RestPath String key) {
    final var keys = encryptionService.decryptObj(key, Keys.class);

    return Uni.combine()
        .all()
        .unis(buildingService.read(keys.buildingId()), apartmentService.aptByBuildings(keys.buildingId()))
        .with((building, apartments) -> {
          if (building.isEmpty()) {
            return Response.status(Status.NOT_FOUND).entity("Building Not Found").build();
          }

          final var formDto = ExtraChargeFormDto.builder()
              .clearForm(true)
              .key(key)
              .apartments(apartments)
              .build();

          return Response.ok(Templates.form(formDto)).build();
        });

  }

  @GET
  @Path("/form/{key}")
  @Produces(MediaType.TEXT_HTML)
  public Uni<Response> form(@NotBlank @RestPath String key) {

    final var json = encryptionService.decrypt(key);
    final var keys = Json.decodeValue(json, Keys.class);

    return Uni.combine()
        .all()
        .unis(service.read(keys),
            apartmentService.aptByBuildings(keys.buildingId()))
        .with((optional, apartments) -> {
          if (optional.isEmpty()) {
            log.info("Extra Charge Not Found {}", keys);
            return Response.status(Status.NOT_FOUND).entity("Extra Charge Not Found").build();
          }

          final var extraCharge = optional.get();

          final var aptsSelected = extraCharge.apartments().stream()
              .map(Apt::number)
              .filter(str -> apartments.stream().anyMatch(apt -> apt.number().equals(str)))
              .collect(Collectors.toSet());

          final var keys1 = extraCharge.keysWithHash(keys.cardId());

          final var formDto = ExtraChargeFormDto.builder()
              .isEdit(true)
              .clearForm(true)
              .key(encryptionService.encryptObj(keys1))
              .description(extraCharge.description())
              .amount(BigDecimal.valueOf(extraCharge.amount()))
              .currency(extraCharge.currency())
              .active(extraCharge.active())
              .apartments(apartments)
              .aptChecked(aptsSelected)
              .build();

          return Response.ok(Templates.form(formDto)).build();
        });
  }

  private ExtraChargeFormDto formDto(String key, ExtraChargeRequest request,
      List<ExtraCharge.Apt> apartments) {
    final var amount = Optional.ofNullable(request.getAmount())
        .map(StringUtil::trimFilter)
        .map(DecimalUtil::ofString)
        .orElse(null);

    final var aptsSelected = Arrays.stream(request.getApartments())
        .filter(str -> apartments.stream().anyMatch(apt -> apt.number().equals(str)))
        .collect(Collectors.toSet());

    return ExtraChargeFormDto.builder()
        .isEdit(false)
        .key(key)
        .description(request.getDescription())
        .descriptionFieldError(
            StringUtil.trimFilter(request.getDescription()) == null ? "No puede estar vacio" : null)
        .amount(Optional.ofNullable(amount).orElse(BigDecimal.ONE))
        .amountFieldError(amount == null || DecimalUtil.zeroOrLess(amount) ? "Debe ser mayor a 0" : null)
        .generalFieldError(aptsSelected.isEmpty() ? "Debe seleccionar al menos un apartamento" : null)
        .currency(request.getCurrency())
        .active(request.isActive())
        .apartments(apartments)
        .aptChecked(aptsSelected)
        .build();

  }

  @Data
  public static class ExtraChargeUpsertRequest {

    @NotBlank
    @RestForm
    private String key;
    @RestForm
    private String description;
    @RestForm
    private String amount;
    @RestForm
    private Currency currency;
    @RestForm
    private boolean active;
    @RestForm
    private String[] apts;
  }

  @PUT
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> upsert(@BeanParam ExtraChargeUpsertRequest request) {
    final var keys = encryptionService.decryptObj(request.getKey(), Keys.class);

    return Uni.combine()
        .all()
        .unis(buildingService.exists(keys.buildingId()), apartmentService.aptByBuildings(keys.buildingId()),
            service.read(keys))
        .withUni((buildingExists, apartments, extraChargeOpt) -> {

          final var amount = Optional.ofNullable(request.getAmount())
              .map(StringUtil::trimFilter)
              .map(DecimalUtil::ofString)
              .orElse(null);

          final var aptsSelected = apartments.stream()
              .map(Apt::number)
              .filter(number -> ArrayUtils.contains(request.getApts(), number))
              .toList();

//          final var aptsSelected = Arrays.stream(request.getApts())
//              .filter(str -> apartments.stream().anyMatch(apt -> apt.number().equals(str)))
//              .collect(Collectors.toSet());

          final var description = StringUtil.trimFilter(request.getDescription());
          final var currency = Optional.ofNullable(request.getCurrency()).orElse(Currency.VED);
          final var apts = apartments.stream()
              .filter(apt -> aptsSelected.contains(apt.number()))
              .toList();

          final var built = ExtraCharge.builder()
              .parentReference(keys.parentReference())
              .buildingId(keys.buildingId())
              .id(keys.id())
              .type(Type.BUILDING)
              .description(description)
              .amount(Optional.ofNullable(amount).map(BigDecimal::doubleValue).orElse(0d))
              .currency(currency)
              .active(request.isActive())
              .apartments(apts)
              .build();

          String generalFieldError = null;
          if (!buildingExists) {
            generalFieldError = "Edificio no existe";
          } else if (aptsSelected.isEmpty()) {
            generalFieldError = "Debe seleccionar al menos un apartamento";
          } else if (extraChargeOpt.isPresent() && keys.hash() != 0 && built.keysWithHash(keys.cardId()).hash() == keys.hash()) {
            generalFieldError = "No hay cambios";
          }

          final var formResponse = ExtraChargeFormResponse.builder()
              .descriptionFieldError(
                  description == null ? "No puede estar vacio" : null)
              .amountFieldError(amount == null || DecimalUtil.zeroOrLess(amount) ? "Debe ser mayor a 0" : null)
              .generalFieldError(generalFieldError)
              .aptsSelected(aptsSelected)
              .build();

          if (!formResponse.isSuccess()) {
            return TemplateUtil.templateUni(Templates.responseForm(formResponse));
          }

          if (extraChargeOpt.isEmpty()) {
            final var createRequest = ExtraChargeCreateRequest.builder()
                .parentReference(keys.parentReference())
                .buildingId(keys.buildingId())
                .type(keys.type())
                .description(description)
                .amount(amount.doubleValue())
                .currency(currency)
                .active(request.isActive())
                .apartments(aptsSelected)
                .build();

            return Uni.combine().all()
                .unis(service.create(createRequest), service.count(keys))
                .with((extraCharge, count) -> {

                  extraCharge = extraCharge.toBuilder()
                      .apartments(apts)
                      .build();

                  final var keys1 = extraCharge.keysWithHash();
                  final var tableItem = ExtraChargeTableItem.builder()
                      .key(encryptionService.encryptObj(keys1))
                      .item(extraCharge)
                      .cardId(keys1.cardId())
                      .outOfBoundsUpdate(false)
                      .addAfterEnd(true)
                      .build();

                  return ExtraChargeFormResponse.builder()
                      .tableItem(tableItem)
                      .count(count + 1)
                      .build();
                })
                .map(Templates::responseForm);
          } else {

            final var tableItem = ExtraChargeTableItem.builder()
                .key(request.getKey())
                .cardId(keys.cardId())
                .item(built)
                .outOfBoundsUpdate(true)
                .addAfterEnd(false)
                .build();

            return service.update(built)
                .map(i -> ExtraChargeFormResponse.builder()
                    .tableItem(tableItem)
                    .build())
                .map(Templates::responseForm);
          }
        });
  }

  @POST
  @Produces(MediaType.TEXT_HTML)
  public Uni<Response> create(@BeanParam ExtraChargeRequest request) {
    final var keys = encryptionService.decryptObj(request.getKey(), Keys.class);

    return Uni.combine()
        .all()
        .unis(buildingService.exists(keys.buildingId()), apartmentService.aptByBuildings(keys.buildingId()))
        .withUni((buildingExists, apartments) -> {
          if (!buildingExists) {
            return Uni.createFrom().item(Response.status(404).build());
          }

          final var formDto = formDto(request.getKey(), request, apartments);

          if (!formDto.isSuccess()) {
            return Uni.createFrom().item(Response.ok(Templates.form(formDto)).build());
          }

          final var createRequest = ExtraChargeCreateRequest.builder()
              .parentReference(keys.parentReference())
              .buildingId(keys.buildingId())
              .type(keys.type())
              .description(formDto.description())
              .amount(formDto.amount().doubleValue())
              .currency(formDto.currency())
              .active(formDto.active())
              .apartments(formDto.aptChecked())
              .build();

          return Uni.combine().all()
              .unis(service.create(createRequest), service.count(keys))
              .with((extraCharge, count) -> {
                final var apts = apartments.stream()
                    .filter(apt -> createRequest.apartments().contains(apt.number()))
                    .toList();

                extraCharge = extraCharge.toBuilder()
                    .apartments(apts)
                    .build();

                final var keys1 = extraCharge.keys();
                return ExtraChargeFormDto.builder()
                    .isEdit(false)
                    .key(request.getKey())
                    .apartments(apartments)
                    .tableItem(ExtraChargeTableItem.builder()
                        .key(encryptionService.encryptObj(keys1))
                        .item(extraCharge)
                        .cardId(keys1.cardId())
                        .outOfBoundsUpdate(false)
                        .addAfterEnd(true)
                        .build())
                    .count(count + 1)
                    .build();
              })
              .map(Templates::form)
              .map(templateInstance -> Response.ok(templateInstance).build());

        });
  }

  @GET
  @Path("buildings/{buildingId}")
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> getByBuilding(@NotBlank @RestPath String buildingId) {
    return service.by(buildingId, buildingId)
        .map(extraCharges -> {

          return extraCharges.stream()
              .map(extraCharge -> {
                final var keys = extraCharge.keys();
                return ExtraChargeTableItem.builder()
                    .item(extraCharge)
                    .key(encryptionService.encryptObj(keys))
                    .cardId(keys.cardId())
                    .build();
              })
              .toList();
        })
        .map(Templates::grid);
  }

  @PATCH
  @Produces(MediaType.TEXT_HTML)
  public Uni<Response> update(@BeanParam ExtraChargeRequest request) {

    final var json = encryptionService.decrypt(request.getKey());
    final var keys = Json.decodeValue(json, Keys.class);

    return Uni.combine()
        .all()
        .unis(service.read(keys),
            apartmentService.aptByBuildings(keys.buildingId()))
        .withUni((optional, apartments) -> {
          if (optional.isEmpty()) {
            return Uni.createFrom().item(Response.status(Status.NOT_FOUND).entity("Extra Charge Not Found").build());
          }
          var formDto = formDto(request.getKey(), request, apartments).toBuilder()
              .isEdit(true)
              .build();
          final var aptChecked = formDto.aptChecked();
          final var apts = apartments.stream().filter(apt -> aptChecked.contains(apt.number()))
              .toList();

          final var extraCharge = ExtraCharge.builder()
              .parentReference(keys.parentReference())
              .buildingId(keys.buildingId())
              .id(keys.id())
              .type(Type.BUILDING)
              .description(formDto.description())
              .amount(formDto.amount().doubleValue())
              .currency(formDto.currency())
              .active(formDto.active())
              .apartments(apts)
              .build();

          final var newKeys = extraCharge.keysWithHash(keys.cardId());

          if (newKeys.hash() == keys.hash()) {
            formDto = formDto.toBuilder()
                .generalFieldError("No se ha modificado nada")
                .build();
          }

          if (!formDto.isSuccess()) {
            return Uni.createFrom().item(Response.ok(Templates.form(formDto)).build());
          }

          final var extraChargeFormDto = ExtraChargeFormDto.builder()
              .isEdit(false)
              .key(request.getKey())
              .apartments(apartments)
              .tableItem(ExtraChargeTableItem.builder()
                  .key(request.getKey())
                  .cardId(keys.cardId())
                  .item(extraCharge)
                  .outOfBoundsUpdate(true)
                  .addAfterEnd(false)
                  .build())
              .build();

          return service.update(extraCharge)
              .replaceWith(Response.ok(Templates.form(extraChargeFormDto)).build());

        });
  }
}
