package com.yaz.api.resource;

import com.yaz.persistence.domain.request.ExtraChargeCreateRequest;
import com.yaz.persistence.domain.request.ExtraChargeUpdateRequest;
import com.yaz.persistence.entities.ExtraCharge;
import com.yaz.persistence.entities.ExtraCharge.Apt;
import com.yaz.persistence.entities.ExtraCharge.Keys;
import com.yaz.persistence.entities.ExtraCharge.Type;
import com.yaz.api.domain.request.ExtraChargeRequest;
import com.yaz.api.domain.response.ExtraChargeFormDto;
import com.yaz.api.domain.response.ExtraChargeTableItem;
import com.yaz.core.service.entity.ApartmentService;
import com.yaz.core.service.entity.BuildingService;
import com.yaz.core.service.EncryptionService;
import com.yaz.core.service.entity.ExtraChargeService;
import com.yaz.core.util.DecimalUtil;
import com.yaz.core.util.StringUtil;
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
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.Response.Status;
import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jboss.resteasy.reactive.Cache;
import org.jboss.resteasy.reactive.RestPath;

@Slf4j
@Path(ExtraChargeResource.PATH)
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class ExtraChargeResource {

  public static final String PATH = "/api/extra_charges";
  public static final String DELETE_PATH = PATH + "/";

  private final BuildingService buildingService;
  private final ApartmentService apartmentService;
  private final EncryptionService encryptionService;
  private final ExtraChargeService service;

  @CheckedTemplate
  public static class Templates {

    public static native TemplateInstance form(ExtraChargeFormDto dto);

    public static native TemplateInstance grid(List<ExtraChargeTableItem> extraCharges);
  }

  @DELETE
  @Path("{id}")
  public Uni<Response> delete(@NotBlank @RestPath String id) {

    final var json = encryptionService.decrypt(id);
    final var keys = Json.decodeValue(json, Keys.class);
    return service.delete(keys)
        .replaceWith(Response.ok().build());
  }

  @GET
  @Cache(maxAge = 10)
  @Path("/form/new/{buildingId}")
  @Produces(MediaType.TEXT_HTML)
  public Uni<Response> newForm(@NotBlank @RestPath String buildingId) {

    return Uni.combine()
        .all()
        .unis(buildingService.get(buildingId), apartmentService.aptByBuildings(buildingId))
        .with((building, apartments) -> {
          if (building.isEmpty()) {
            return Response.status(Status.NOT_FOUND).entity("Building Not Found").build();
          }

          final var formDto = ExtraChargeFormDto.builder()
              .clearForm(true)
              .buildingId(buildingId)
              .apartments(apartments)
              .build();

          return Response.ok(Templates.form(formDto)).build();
        });

  }

  @GET
  @Path("/form/{id}")
  @Produces(MediaType.TEXT_HTML)
  public Uni<Response> form(@NotBlank @RestPath String id) {

    final var json = encryptionService.decrypt(id);
    final var keys = Json.decodeValue(json, Keys.class);

    return Uni.combine()
        .all()
        .unis(service.read(keys.buildingId(), keys.secondaryId(), keys.id()),
            apartmentService.aptByBuildings(keys.buildingId()))
        .with((optional, apartments) -> {
          if (optional.isEmpty()) {
            return Response.status(Status.NOT_FOUND).entity("Extra Charge Not Found").build();
          }

          final var extraCharge = optional.get();

          final var aptsSelected = extraCharge.apartments().stream()
              .map(Apt::number)
              .filter(str -> apartments.stream().anyMatch(apt -> apt.number().equals(str)))
              .collect(Collectors.toSet());

          final var formDto = ExtraChargeFormDto.builder()
              .isEdit(true)
              .buildingId(extraCharge.buildingId())
              .id(id)
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

  private ExtraChargeFormDto formDto(String buildingId, ExtraChargeRequest request,
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
        .buildingId(buildingId)
        .description(request.getDescription())
        .descriptionFieldError(
            StringUtil.trimFilter(request.getDescription()) == null ? "No puede estar vacio" : null)
        .amount(Optional.ofNullable(amount).orElse(BigDecimal.ONE))
        .amountFieldError(amount == null || DecimalUtil.zeroOrLess(amount) ? "Debe ser mayor a 0" : null)
        .apartmentFieldError(aptsSelected.isEmpty() ? "Debe seleccionar al menos un apartamento" : null)
        .currency(request.getCurrency())
        .active(request.isActive())
        .apartments(apartments)
        .aptChecked(aptsSelected)
        .build();

  }

  @POST
  @Path("buildings/{buildingId}")
  @Produces(MediaType.TEXT_HTML)
  public Uni<Response> createByBuilding(@NotBlank @RestPath String buildingId, @BeanParam ExtraChargeRequest request) {

    return Uni.combine()
        .all()
        .unis(buildingService.exists(buildingId), apartmentService.aptByBuildings(buildingId))
        .withUni((buildingExists, apartments) -> {
          if (!buildingExists) {
            return Uni.createFrom().item(Response.status(404).build());
          }

          final var formDto = formDto(buildingId, request, apartments);

          if (formDto.isSuccess()) {
            final var createRequest = ExtraChargeCreateRequest.builder()
                .buildingId(buildingId)
                .secondaryId(buildingId)
                .type(Type.BUILDING)
                .description(formDto.getDescription())
                .amount(formDto.getAmount().doubleValue())
                .currency(formDto.getCurrency())
                .active(formDto.isActive())
                .apartments(formDto.getAptChecked())
                .build();

            return service.create(createRequest)
                .map(extraCharge -> {
                  final var apts = apartments.stream()
                      .filter(apt -> createRequest.apartments().contains(apt.number()))
                      .toList();

                  return extraCharge.toBuilder()
                      .apartments(apts)
                      .build();
                })
                .map(extraCharge -> {

                  return ExtraChargeFormDto.builder()
                      .isEdit(false)
                      .buildingId(buildingId)
                      .apartments(apartments)
                      .refreshGrid(false)
                      .tableItem(ExtraChargeTableItem.builder()
                          .id(encryptionService.encryptObj(extraCharge.keys()))
                          .item(extraCharge)
                          .outOfBoundsUpdate(false)
                          .addAfterEnd(true)
                          .build())
                      .build();

                })
                .map(Templates::form)
                .map(templateInstance -> Response.ok(templateInstance).build());
          }

          return Uni.createFrom().item(Response.ok(Templates.form(formDto)).build());
        });
  }

  @GET
  @Path("buildings/{buildingId}")
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> getByBuilding(@NotBlank @RestPath String buildingId) {
    return service.byBuilding(buildingId)
        .map(extraCharges -> {

          return extraCharges.stream()
              .map(extraCharge -> new ExtraChargeTableItem(extraCharge,
                  encryptionService.encryptObj(extraCharge.keys())))
              .toList();
        })
        .map(Templates::grid);

  }

  @PATCH
  @Path("{id}")
  @Produces(MediaType.TEXT_HTML)
  public Uni<Response> update(@NotBlank @RestPath String id, @BeanParam ExtraChargeRequest request) {

    final var json = encryptionService.decrypt(id);
    final var keys = Json.decodeValue(json, Keys.class);

    return Uni.combine()
        .all()
        .unis(service.read(keys.buildingId(), keys.secondaryId(), keys.id()),
            apartmentService.aptByBuildings(keys.buildingId()))
        .withUni((optional, apartments) -> {
          if (optional.isEmpty()) {
            return Uni.createFrom().item(Response.status(Status.NOT_FOUND).entity("Extra Charge Not Found").build());
          }
          final var formDto = formDto(keys.buildingId(), request, apartments).toBuilder()
              .isEdit(true)
              .id(id)
              .apartments(apartments)
              .build();

          if (formDto.isSuccess()) {
            final var updateRequest = ExtraChargeUpdateRequest.builder()
                .buildingId(keys.buildingId())
                .secondaryId(keys.secondaryId())
                .id(keys.id())
                .description(formDto.getDescription())
                .amount(formDto.getAmount().doubleValue())
                .currency(formDto.getCurrency())
                .active(formDto.isActive())
                .apartments(formDto.getAptChecked())
                .build();

            final var apts = apartments.stream().filter(apt -> formDto.getAptChecked().contains(apt.number()))
                .toList();

            final var extraCharge = ExtraCharge.builder()
                .buildingId(keys.buildingId())
                .secondaryId(keys.secondaryId())
                .id(keys.id())
                .type(Type.BUILDING)
                .description(formDto.getDescription())
                .amount(formDto.getAmount().doubleValue())
                .currency(formDto.getCurrency())
                .active(formDto.isActive())
                .apartments(apts)
                .build();

            final var extraChargeFormDto = ExtraChargeFormDto.builder()
                .isEdit(false)
                .buildingId(keys.buildingId())
                .apartments(apartments)
                .tableItem(ExtraChargeTableItem.builder()
                    .id(id)
                    .item(extraCharge)
                    .outOfBoundsUpdate(true)
                    .addAfterEnd(false)
                    .build())
                .build();

            return service.update(updateRequest)
                .replaceWith(Response.ok(Templates.form(extraChargeFormDto)).build());
          }

          return Uni.createFrom().item(Response.ok(Templates.form(formDto)).build());
        });
  }
}
