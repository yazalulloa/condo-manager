package com.yaz.api.resource;

import com.yaz.api.domain.request.BuildingRequest;
import com.yaz.api.domain.response.BuildingCountersDto;
import com.yaz.api.domain.response.BuildingReportResponse;
import com.yaz.api.domain.response.ExtraChargeTableItem;
import com.yaz.api.domain.response.ReserveFundTableItem;
import com.yaz.api.domain.response.building.BuildingFormResponse;
import com.yaz.api.domain.response.building.BuildingInitFormDto;
import com.yaz.api.domain.response.extra.charge.ExtraChargeInitFormDto;
import com.yaz.api.domain.response.reserve.funds.ReserveFundInitFormDto;
import com.yaz.core.service.EncryptionService;
import com.yaz.core.service.entity.ApartmentService;
import com.yaz.core.service.entity.BuildingService;
import com.yaz.core.service.entity.EmailConfigService;
import com.yaz.core.service.entity.ExtraChargeService;
import com.yaz.core.service.entity.ReserveFundService;
import com.yaz.core.util.DecimalUtil;
import com.yaz.core.util.StringUtil;
import com.yaz.core.util.TemplateUtil;
import com.yaz.persistence.domain.Currency;
import com.yaz.persistence.domain.query.BuildingQuery;
import com.yaz.persistence.entities.Building;
import com.yaz.persistence.entities.Building.Keys;
import com.yaz.persistence.entities.ExtraCharge;
import com.yaz.persistence.entities.ReserveFund;
import io.quarkus.qute.CheckedTemplate;
import io.quarkus.qute.TemplateInstance;
import io.quarkus.security.Authenticated;
import io.quarkus.vertx.web.Route;
import io.quarkus.vertx.web.Route.HttpMethod;
import io.smallrye.mutiny.Uni;
import io.vertx.ext.web.RoutingContext;
import jakarta.inject.Inject;
import jakarta.ws.rs.BeanParam;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.Collections;
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
  private final EmailConfigService emailConfigService;
  private final ApartmentService apartmentService;
  private final ExtraChargeService extraChargeService;
  private final EncryptionService encryptionService;
  private final ReserveFundService reserveFundService;

  @Route(path = PATH + "/ids", methods = HttpMethod.GET)
  public void getIds(RoutingContext rc) {
    service.buildIds()
        .subscribe()
        .with(filePath -> rc.reroute("/" + filePath),
            e -> {
              log.error("Error getting ids", e);
              rc.response().setStatusCode(500)
                  .end();
            });
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
  @Path("{key}")
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> delete(@RestPath String key) {
    final var buildingId = encryptionService.decryptObj(key, Keys.class).id();
    return Uni.combine().all()
        .unis(service.delete(buildingId), service.count())
        .with((i, count) -> count - i)
        .map(BuildingCountersDto::new)
        .map(Templates::counters);
  }

  @GET
  @Path("counters")
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> counters() {

    return service.count()
        .map(BuildingCountersDto::new)
        .map(Templates::counters);
  }

  private String fixedPayAmountFieldError(BuildingRequest request) {
    if (!request.isFixedPay()) {
      return null;
    }

    if (request.getFixedPayAmount() == null || request.getFixedPayAmount().isBlank()) {
      return "Monto fijo no puede estar vacio";
    }

    final var requestFixedPayAmount = DecimalUtil.ofString(request.getFixedPayAmount());

    if (requestFixedPayAmount == null || !DecimalUtil.greaterThanZero(requestFixedPayAmount)) {
      return "Monto fijo invalido";
    }

    return null;
  }

  @PUT
  @Produces(MediaType.TEXT_HTML)
  public Uni<Response> upsert(@BeanParam BuildingRequest request) {

    final var keysOpt = Optional.ofNullable(StringUtil.trimFilter(request.getKey()))
        .map(str -> encryptionService.decryptObj(str, Keys.class));

    keysOpt.ifPresent(keys -> request.setId(keys.id()));

    final var currenciesToShowAmountToPay = Optional.ofNullable(request.getCurrenciesToShowAmountToPay())
        .filter(set -> !set.isEmpty())
        .orElseGet(() -> Set.of(request.getMainCurrency()));

    final var requestFixedPayAmount = DecimalUtil.ofString(request.getFixedPayAmount());

    final var id = StringUtil.trimFilter(request.getId());
    final var name = StringUtil.trimFilter(request.getName());
    final var currenciesToShowAmountToPayStringArray = TemplateUtil.toStringArray(currenciesToShowAmountToPay);
    var formResponse = BuildingFormResponse.builder()
        .key(request.getKey())
        .idFieldError(id == null ? "ID no puede estar vacio" : null)
        .nameFieldError(name == null ? "Nombre no puede estar vacio" : null)
        .fixedPayAmountFieldError(fixedPayAmountFieldError(request))
        .currenciesToShowAmountToPay(currenciesToShowAmountToPayStringArray)
        .build();

    if (!formResponse.isSuccess()) {
      return TemplateUtil.responseUni(Templates.responseForm(formResponse));
    }

    final var building = Building.builder()
        .id(id)
        .name(name)
        .rif(request.getRif())
        .mainCurrency(request.getMainCurrency())
        .debtCurrency(request.getDebtCurrency())
        .currenciesToShowAmountToPay(currenciesToShowAmountToPay)
        .fixedPay(request.isFixedPay())
        .fixedPayAmount(requestFixedPayAmount)
        .roundUpPayments(request.isRoundUpPayments())
        .emailConfigId(request.getEmailConfig())
        .build();

    if (keysOpt.map(Keys::hash).map(hash -> hash == building.keysWithHash().hash()).orElse(false)) {
      formResponse = formResponse.toBuilder()
          .generalFieldError("No se ha modificado nada")
          .build();
    }

    if (!formResponse.isSuccess()) {
      return TemplateUtil.responseUni(Templates.responseForm(formResponse));
    }

    if (keysOpt.isPresent()) {
      return service.update(building)
          .map(b -> BuildingFormResponse.builder()
              .key(encryptionService.encryptObj(b.keysWithHash()))
              .generalFieldError("Actualizado")
              .currenciesToShowAmountToPay(currenciesToShowAmountToPayStringArray)
              .build())
          .map(Templates::responseForm)
          .map(t -> Response.ok(t).build());
    }

    return service.exists(building.id())
        .flatMap(bool -> {
          if (bool) {
            final var response = BuildingFormResponse.builder()
                .idFieldError("ID ya existe")
                .currenciesToShowAmountToPay(currenciesToShowAmountToPayStringArray)
                .build();
            return TemplateUtil.responseUni(Templates.responseForm(response));
          }

          return service.create(building)
              .map(b -> Response.noContent()
                  .header("HX-Redirect", "/buildings/edit/" + b.id())
                  .build());
        });
  }

  @GET
  @Path("form_init")
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> formInit(@RestQuery String id) {
    final var buildingUni = Optional.ofNullable(id)
        .map(StringUtil::escapeInput)
        .map(String::trim)
        .filter(s -> !s.isEmpty())
        .map(service::read)
        .orElse(Uni.createFrom().item(Optional.empty()));

    final var extraChargesUni = buildingUni.flatMap(opt -> {

      return opt.map(Building::id)
          .map(buildingId -> extraChargeService.by(buildingId, buildingId)
              .map(list -> list.stream()
                  .map(extraCharge -> {

                    final var keys = extraCharge.keys();

                    return ExtraChargeTableItem.builder()
                        .item(extraCharge)
                        .key(encryptionService.encryptObj(keys))
                        .cardId(keys.cardId())
                        .build();
                  })
                  .toList()))
          .orElse(Uni.createFrom().item(Collections.emptyList()));
    });

    final var aptsUni = buildingUni.flatMap(opt -> opt.map(Building::id)
        .map(apartmentService::aptByBuildings)
        .orElse(Uni.createFrom().item(Collections.emptyList())));

    final var reserveFundsUni = reserveFundService.listByBuilding(id)
        .map(list -> {
          return list.stream()
              .map(reserveFund -> {
                final var keys = reserveFund.keys(0);
                return ReserveFundTableItem.builder()
                    .key(encryptionService.encryptObj(keys))
                    .item(reserveFund)
                    .cardId(keys.cardId())
                    .build();
              })
              .toList();
        });

    return Uni.combine().all()
        .unis(buildingUni, emailConfigService.displayList(), extraChargesUni, aptsUni, reserveFundsUni)
        .with((buildingOpt, emailConfigs, extraCharges, apts, reserveFunds) -> {

          final var key = buildingOpt.map(building -> encryptionService.encryptObj(building.keysWithHash()))
              .orElse(null);

          final var currenciesToShowAmountToPay = TemplateUtil.toStringArray(
              buildingOpt.map(Building::currenciesToShowAmountToPay)
                  .orElse(Set.of(Currency.VALUES)));

          return BuildingInitFormDto.builder()
              .isEdit(buildingOpt.isPresent())
              .key(key)
              .emailConfigs(emailConfigs)

              .id(buildingOpt.map(Building::id).orElse(""))
              .name(buildingOpt.map(Building::name).map(str -> str.replace("'", "\\'")).orElse(""))
              .rif(buildingOpt.map(Building::rif).orElse(""))
              .mainCurrency(buildingOpt.map(Building::mainCurrency).orElse(Currency.VED))
              .debtCurrency(buildingOpt.map(Building::debtCurrency).orElse(Currency.VED))
              .currenciesToShowAmountToPay(currenciesToShowAmountToPay)
              .fixedPay(buildingOpt.map(Building::fixedPay).orElse(false))
              .fixedPayAmount(buildingOpt.map(Building::fixedPayAmount).orElse(null))
              .roundUpPayments(buildingOpt.map(Building::roundUpPayments).orElse(false))
              .emailConfigId(buildingOpt.map(Building::emailConfigId).orElse(null))

              .apts(apts)

              .extraChargeDto(ExtraChargeInitFormDto.builder()
                  .key(buildingOpt.map(Building::id).map(ExtraCharge.Keys::newBuilding)
                      .map(encryptionService::encryptObj).orElse(""))
                  .extraCharges(extraCharges)
                  .build())

              .reserveFundDto(ReserveFundInitFormDto.builder()
                  .key(buildingOpt.map(Building::id).map(ReserveFund.Keys::ofBuilding)
                      .map(encryptionService::encryptObj).orElse(""))
                  .reserveFunds(reserveFunds)
                  .build())

              .build();
        })
        .map(Templates::formInit);
  }

  @CheckedTemplate
  public static class Templates {

    public static native TemplateInstance selector(List<String> list);

    public static native TemplateInstance report(BuildingReportResponse res);

    public static native TemplateInstance counters(BuildingCountersDto dto);

    public static native TemplateInstance formInit(BuildingInitFormDto dto);

    public static native TemplateInstance responseForm(BuildingFormResponse dto);

    public static native TemplateInstance ids(List<String> list);
  }

}
