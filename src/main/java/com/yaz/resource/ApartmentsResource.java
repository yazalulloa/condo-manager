package com.yaz.resource;

import com.yaz.persistence.domain.ApartmentQuery;
import com.yaz.resource.domain.ApartmentFormDto;
import com.yaz.resource.domain.ApartmentFormDto.EmailForm;
import com.yaz.resource.domain.ApartmentInitDto;
import com.yaz.resource.domain.ApartmentTableResponse;
import com.yaz.resource.domain.AptItem;
import com.yaz.resource.domain.request.ApartmentRequest;
import com.yaz.resource.domain.response.AptCountersDto;
import com.yaz.resource.msg.ApartmentMessages;
import com.yaz.service.ApartmentService;
import com.yaz.service.BuildingService;
import com.yaz.util.DecimalUtil;
import com.yaz.util.StringUtil;
import io.quarkus.oidc.IdToken;
import io.quarkus.oidc.UserInfo;
import io.quarkus.qute.CheckedTemplate;
import io.quarkus.qute.TemplateInstance;
import io.quarkus.security.Authenticated;
import io.smallrye.mutiny.Uni;
import jakarta.inject.Inject;
import jakarta.ws.rs.BeanParam;
import jakarta.ws.rs.Consumes;
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
import java.util.Set;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.eclipse.microprofile.jwt.JsonWebToken;
import org.jboss.resteasy.reactive.RestForm;
import org.jboss.resteasy.reactive.RestPath;
import org.jboss.resteasy.reactive.RestQuery;


@Slf4j
@Authenticated
@Path(ApartmentsResource.PATH)
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class ApartmentsResource {

  public static final String PATH = "/api/apartments";
  public static final String DELETE_PATH = PATH + "/";
  public static final String EDIT_FORM_PATH = PATH + "/edit_form/";
  public static final String ITEM_PATH = PATH + "/item/";
  public static final String TABLE_PATH = PATH + "/grid";

  @Inject
  @IdToken
  JsonWebToken idToken;
  @Inject
  UserInfo userInfo;

  @Inject
  ApartmentMessages apartmentMessages;

  @CheckedTemplate
  public static class Templates {

    public static native TemplateInstance grid(ApartmentTableResponse res);

    public static native TemplateInstance table(ApartmentTableResponse res);

    public static native TemplateInstance form(ApartmentFormDto dto);

    public static native TemplateInstance init(ApartmentInitDto dto);

    public static native TemplateInstance counters(AptCountersDto dto);

    public static native TemplateInstance card_item(AptItem item);
  }

  private final ApartmentService apartmentService;
  private final BuildingService buildingService;

  @GET
  @Path("init")
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> init() {

    return Uni.combine().all()
        .unis(buildingService.ids(), apartmentService.tableResponse())
        .asTuple()
        .map(tuple -> {
          final var buildings = tuple.getItem1();
          final var tableRes = tuple.getItem2();
          return ApartmentInitDto.builder()
              .buildings(buildings)
              .formDto(ApartmentFormDto.builder()
                  .buildings(buildings)
                  .aliquot(BigDecimal.ZERO)
                  .emails(List.of(new EmailForm(null, null)))
                  .build())
              .tableRes(tableRes)
              .build();
        })
        .map(Templates::init);
  }

  @GET
  @Path("grid")
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> grid(
      @RestQuery String lastBuildingId,
      @RestQuery String lastNumber,
      @RestQuery String q,
      @RestQuery Set<String> building) {

    final var apartmentQuery = ApartmentQuery.builder()
        .lastBuildingId(StringUtil.trimFilter(lastBuildingId))
        .lastNumber(StringUtil.trimFilter(lastNumber))
        .q(StringUtil.trimFilter(q))
        .buildings(building)
        .build();

    log.info("Apartment query {}", apartmentQuery);
    log.info("Apartment buildings {}", building);

    return apartmentService.tableResponse(apartmentQuery)
        .map(Templates::grid);
  }

  @GET
  @Path("form")
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> form() {
    return baseFormDto()
        .map(Templates::form);
  }

  @GET
  @Path("counters")
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> counters(
      @RestQuery String q,
      @RestQuery Set<String> building) {

    final var apartmentQuery = ApartmentQuery.builder()
        .q(StringUtil.trimFilter(q))
        .buildings(building)
        .build();

    return apartmentService.counters(apartmentQuery)
        .map(Templates::counters);
  }

  private Uni<ApartmentFormDto> baseFormDto() {
    return buildingService.ids()
        .map(buildingIds -> {
          return ApartmentFormDto.builder()
              .buildings(buildingIds)
              .aliquot(BigDecimal.ZERO)
              .emails(List.of(new EmailForm(null, null)))
              .build();
        });
  }

  @DELETE
  @Path("{buildingId}/{number}")
  @Produces
  public Uni<TemplateInstance> delete(
      @RestForm String q,
      @RestForm Set<String> building,
      @RestPath String buildingId, @RestPath String number) {

    log.info("Deleting apartment {} {}", buildingId, number);
    return apartmentService.delete(buildingId, number)
        .invoke(l -> log.info("Apartment delete {} deleted {} {}", l, buildingId, number))
        /*.map(l -> {
          log.info("Apartment delete {} deleted {} {}", l, buildingId, number);
          return Response.ok().build();
        })*/
        .replaceWith(counters(q, building));
  }

  private Uni<ApartmentFormDto> fromRequest(ApartmentRequest request, boolean isUpdate) {
    final var buildingId = StringUtil.trimFilter(request.getBuildingId());
    final var number = StringUtil.trimFilter(request.getNumber());
    final var name = StringUtil.trimFilter(request.getName());

    final var numberFieldErrorUni = Uni.createFrom().deferred(() -> {
      if (isUpdate) {
        return Uni.createFrom().item((String) null);
      }

      if (buildingId != null && number != null) {
        return apartmentService.exists(buildingId, number)
            .map(bool -> bool ? apartmentMessages.error_msg_apt_number_exists() : null);
      }

      return Uni.createFrom().item(apartmentMessages.error_msg_apt_number_invalid());
    });

    final var generalFieldErrorUni = Uni.createFrom()
        .deferred(() -> {
          if (isUpdate) {
            return apartmentService.get(buildingId, number)
                .map(apartment -> {
                  if (apartment == null) {
                    return null;
                  }

                  final var noChange = Objects.equals(apartment.name(), request.getName())
                      && Objects.equals(apartment.number(), request.getNumber())
                      && Objects.equals(apartment.aliquot(), request.getAliquot())
                      && Objects.equals(apartment.emails(), request.getEmails());

                  return noChange ? apartmentMessages.error_msg_apt_no_change() : null;
                });
          }

          return Uni.createFrom().item((String) null);
        });

    final var buildingFieldErrorUni = Optional.ofNullable(buildingId)
        .map(buildingService::exists)
        .map(uni -> uni.map(bool -> bool ? null : apartmentMessages.error_msg_apt_building_does_not_exist()))
        .orElseGet(() -> Uni.createFrom().item(apartmentMessages.error_msg_apt_building_invalid()));

    return Uni.combine().all()
        .unis(buildingService.ids(), generalFieldErrorUni, numberFieldErrorUni, buildingFieldErrorUni)
        .with((buildings, generalFieldError, numberFieldError, buildingFieldError) -> {

          final var emailForms = request.getEmails().stream()
              .map(StringUtil::trimFilter)
              .map(str -> {

                final var error = str == null ? null : StringUtil.isValidEmail(str) ? null
                    : apartmentMessages.error_msg_apt_email_invalid();

                return new EmailForm(str, error);
              })
              .toList();

          return ApartmentFormDto.builder()
              .generalFieldError(generalFieldError)
              .buildings(buildings)
              .buildingId(buildingId)
              .buildingIdFieldError(buildingFieldError)
              .number(number)
              .numberFieldError(numberFieldError)
              .name(name)
              .nameFieldError(name == null ? apartmentMessages.error_msg_apt_name_invalid() : null)
              .aliquot(request.getAliquot())
              .aliquotFieldError(
                  request.getAliquot() == null || DecimalUtil.zeroOrLess(request.getAliquot())
                      || DecimalUtil.greaterThan(request.getAliquot(), BigDecimal.valueOf(100))
                      ? apartmentMessages.error_msg_apt_aliquot_invalid() : null)
              .emails(emailForms)
              .isEdit(isUpdate)
              .build();
        });
  }

  @POST
  @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> create(@BeanParam ApartmentRequest request) {

    return fromRequest(request, false)
        .flatMap(dto -> {
          if (dto.isSuccess()) {
            return apartmentService.create(request)
                .flatMap(v -> baseFormDto())
                .map(d -> d.toBuilder()
                    .hideForm(true)
                    .build());
          }

          return Uni.createFrom().item(dto);
        })
        .map(Templates::form);
  }

  @PATCH
  @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> patch(@BeanParam ApartmentRequest request) {

    return fromRequest(request, true)
        .flatMap(dto -> {
          if (dto.isSuccess()) {
            return apartmentService.update(request)
                .flatMap(apartment -> baseFormDto()
                    .map(apartmentFormDto -> apartmentFormDto.toBuilder()
                        .hideForm(true)
                        .item(new AptItem(apartment, true))
                        .build()));
          }

          return Uni.createFrom().item(dto);
        })
        .map(Templates::form);
  }

  @GET
  @Path("edit_form/{buildingId}/{number}")
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> editForm(
      @RestPath String buildingId, @RestPath String number) {

    return Uni.combine()
        .all()
        .unis(apartmentService.get(buildingId, number), buildingService.ids())
        .with((apartment, buildings) -> ApartmentFormDto.builder()
            .buildings(buildings)
            .buildingId(apartment.buildingId())
            .number(apartment.number())
            .name(apartment.name())
            .aliquot(apartment.aliquot())
            .emails(apartment.emails().stream().map(EmailForm::ofValue).toList())
            .isEdit(true)
            .readOnlyBuilding(true)
            .readOnlyNumber(true)
            .showForm(true)
            .build())
        .map(Templates::form);
  }

  @GET
  @Path("/item/{buildingId}/{number}")
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> item(
      @RestPath String buildingId, @RestPath String number) {

    log.info("Deleting apartment {} {}", buildingId, number);
    return apartmentService.get(buildingId, number)
        .map(AptItem::new)
        .map(Templates::card_item);
  }
}
