package com.yaz.api.resource;

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
import io.quarkus.qute.CheckedTemplate;
import io.quarkus.qute.TemplateInstance;
import io.quarkus.security.Authenticated;
import io.smallrye.mutiny.Uni;
import io.vertx.core.json.Json;
import jakarta.validation.constraints.NotBlank;
import jakarta.ws.rs.BeanParam;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.ArrayUtils;
import org.jboss.resteasy.reactive.RestForm;
import org.jboss.resteasy.reactive.RestQuery;

@Slf4j
@Authenticated
@Path(ExtraChargeResource.PATH)
@RequiredArgsConstructor
public class ExtraChargeResource {

  public static final String PATH = "/api/extra_charges";

  private final BuildingService buildingService;
  private final ApartmentService apartmentService;
  private final EncryptionService encryptionService;
  private final ExtraChargeService service;

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

          final var description = StringUtil.trimFilter(request.getDescription());
          final var currency = Optional.ofNullable(request.getCurrency()).orElse(Currency.VED);
          final var apts = apartments.stream()
              .filter(apt -> aptsSelected.contains(apt.number()))
              .toList();

          final var built = ExtraCharge.builder()
              .parentReference(keys.parentReference())
              .buildingId(keys.buildingId())
              .id(keys.id())
              .type(keys.type())
              .description(description)
              .amount(Optional.ofNullable(amount).map(BigDecimal::doubleValue).orElse(0d))
              .currency(currency)
              .active(request.isActive())
              .apartments(apts)
              .build();

          final var newKeys = built.keys(keys.cardId(), keys.receiptId());

          String generalFieldError = null;
          if (!buildingExists) {
            generalFieldError = "Edificio no existe";
          } else if (aptsSelected.isEmpty()) {
            generalFieldError = "Debe seleccionar al menos un apartamento";
          } else if (extraChargeOpt.isPresent() && keys.hash() != 0
              && newKeys.hash() == keys.hash()) {
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

                  final var keys1 = extraCharge.keys(keys.receiptId());
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
                .key(encryptionService.encryptObj(newKeys))
                .cardId(newKeys.cardId())
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

  @CheckedTemplate
  public static class Templates {

    public static native TemplateInstance counters(long count);

    public static native TemplateInstance grid(List<ExtraChargeTableItem> extraCharges);

    public static native TemplateInstance responseForm(ExtraChargeFormResponse dto);
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
}
