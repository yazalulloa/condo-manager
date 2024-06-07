package com.yaz.api.resource;

import com.yaz.api.domain.ApartmentFormDto;
import com.yaz.api.domain.ApartmentFormDto.EmailForm;
import com.yaz.api.domain.ApartmentInitDto;
import com.yaz.api.domain.AptItem;
import com.yaz.api.domain.request.ApartmentRequest;
import com.yaz.api.domain.response.ApartmentTableResponse;
import com.yaz.api.domain.response.ApartmentUpsertFormDto;
import com.yaz.api.domain.response.AptCountersDto;
import com.yaz.api.msg.ApartmentMessages;
import com.yaz.core.service.EncryptionService;
import com.yaz.core.service.entity.ApartmentService;
import com.yaz.core.service.entity.BuildingService;
import com.yaz.core.util.DecimalUtil;
import com.yaz.core.util.StringUtil;
import com.yaz.persistence.domain.query.ApartmentQuery;
import com.yaz.persistence.entities.Apartment;
import com.yaz.persistence.entities.Apartment.Keys;
import io.quarkus.oidc.IdToken;
import io.quarkus.oidc.UserInfo;
import io.quarkus.qute.CheckedTemplate;
import io.quarkus.qute.TemplateInstance;
import io.smallrye.mutiny.Uni;
import jakarta.inject.Inject;
import jakarta.validation.constraints.NotBlank;
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
import java.time.Duration;
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
@Path(ApartmentsResource.PATH)
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class ApartmentsResource {

  public static final String PATH = "/api/apartments";
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

    public static native TemplateInstance apartments(ApartmentTableResponse res);

    public static native TemplateInstance form(ApartmentFormDto dto);

    public static native TemplateInstance init(ApartmentInitDto dto);

    public static native TemplateInstance counters(AptCountersDto dto);

    public static native TemplateInstance grid_item(AptItem item);

    public static native TemplateInstance upsert(ApartmentUpsertFormDto dto);
  }

  private final ApartmentService apartmentService;
  private final BuildingService buildingService;
  private final EncryptionService encryptionService;

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
      @RestQuery String nextPage,
      @RestQuery String q,
      @RestQuery Set<String> building) {

    final var keys = Optional.ofNullable(nextPage)
        .map(StringUtil::trimFilter)
        .map(str -> encryptionService.decryptObj(str, Keys.class));

    final var apartmentQuery = ApartmentQuery.builder()
        .lastBuildingId(keys.map(Keys::buildingId).orElse(null))
        .lastNumber(keys.map(Keys::number).orElse(null))
        .q(StringUtil.trimFilter(q))
        .buildings(building)
        .build();

    return apartmentService.tableResponse(apartmentQuery)
        .map(Templates::grid);
  }

  @GET
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> apartments(
      @RestQuery String nextPage,
      @RestQuery String q,
      @RestQuery Set<String> building) {

    final var keys = Optional.ofNullable(nextPage)
        .map(StringUtil::trimFilter)
        .map(str -> encryptionService.decryptObj(str, Keys.class));

    final var apartmentQuery = ApartmentQuery.builder()
        .lastBuildingId(keys.map(Keys::buildingId).orElse(null))
        .lastNumber(keys.map(Keys::number).orElse(null))
        .q(StringUtil.trimFilter(q))
        .buildings(building)
        .build();

    return apartmentService.tableResponse(apartmentQuery)
        .map(Templates::apartments);
  }

  @GET
  @Path("form")
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> form() {
    return baseFormDto()
        .map(dto -> dto.toBuilder()
            .isNew(true)
            .aliquot(BigDecimal.ZERO)
            .build())
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
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> delete(
      @RestForm String q,
      @RestForm Set<String> building,
      @RestQuery @NotBlank String id) {

    final var keys = encryptionService.decryptObj(id, Keys.class);

    return apartmentService.delete(keys)
        //.invoke(l -> log.info("Apartment delete {} deleted {} {}", l, buildingId, number))
        /*.map(l -> {
          log.info("Apartment delete {} deleted {} {}", l, buildingId, number);
          return Response.ok().build();
        })*/
        .replaceWith(counters(q, building));
  }

  private Uni<ApartmentFormDto> fromRequest(ApartmentRequest request, boolean isUpdate) {
    final var buildingId = request.getBuildingId();
    final var number = request.getNumber();
    final var name = request.getName();

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
                .map(optional -> {
                  if (optional.isEmpty()) {
                    return null;
                  }

                  final var apartment = optional.get();

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
              .key(request.getKey())
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
    log.info("Creating apartment {}", request);
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

    final var key = Objects.requireNonNull(StringUtil.trimFilter(request.getKey()));
    final var keys = encryptionService.decryptObj(key, Keys.class);

    request.setBuildingId(keys.buildingId());
    request.setNumber(keys.number());
    return fromRequest(request, true)
        .flatMap(dto -> {
          dto = dto.toBuilder()
              .readOnlyBuilding(true)
              .readOnlyNumber(true)
              .build();

          final var apartment = Apartment.builder()
              .buildingId(request.getBuildingId())
              .number(request.getNumber())
              .name(request.getName())
              .aliquot(request.getAliquot())
              .emails(request.getEmails())
              .build();

          if (apartment.keysWithHash(keys.cardId()).hash() == keys.hash()) {
            dto = dto.toBuilder()
                .generalFieldError(apartmentMessages.error_msg_apt_no_change())
                .build();
          }

          if (!dto.isSuccess()) {
            return Uni.createFrom().item(dto);
          }

          return apartmentService.update(apartment)
              .flatMap(i -> baseFormDto()
                  .map(apartmentFormDto -> {
                    return apartmentFormDto.toBuilder()
                        .hideForm(true)
                        .item(AptItem.builder()
                            .key(key)
                            .cardId(keys.cardId())
                            .apt(apartment)
                            .isUpdate(true)
                            .build())
                        .build();
                  }));

        })
        .map(Templates::form);
  }

  @GET
  @Path("edit_form/{key}")
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> editForm(@RestPath @NotBlank String key) {

    final var keys = encryptionService.decryptObj(key, Keys.class);

    return Uni.combine()
        .all()
        .unis(apartmentService.get(keys.buildingId(), keys.number()).map(Optional::get), buildingService.ids())
        .with((apartment, buildings) -> {
          final var keysWithHash = apartment.keysWithHash(keys.cardId());
          return ApartmentFormDto.builder()
              .key(encryptionService.encryptObj(keysWithHash))
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
              .build();
        })
        .map(Templates::form);
  }

  @GET
  @Path("/item/{key}")
  @Produces(MediaType.TEXT_HTML)
  public Uni<TemplateInstance> item(@RestPath @NotBlank String key) {

    final var keys = encryptionService.decryptObj(key, Keys.class);
    return apartmentService.get(keys.buildingId(), keys.number())
        .map(Optional::get)
        .map(apartment -> AptItem.builder()
            .key(key)
            .cardId(keys.cardId())
            .apt(apartment)
            .build())
        .map(Templates::grid_item);
  }

  @POST
  @Path("upsert")
  public Uni<TemplateInstance> upsert(@BeanParam ApartmentRequest request) {

    final var optKeys = Optional.ofNullable(StringUtil.trimFilter(request.getKey()))
        .map(str -> encryptionService.decryptObj(str, Keys.class));

    optKeys.ifPresent(keys -> {
      request.setBuildingId(keys.buildingId());
      request.setNumber(keys.number());
    });

    final var isUpdate = optKeys.isPresent();
    return fromRequest(request, isUpdate)
        .map(dto -> {
          final var emailError = dto.emails().stream().map(EmailForm::error)
              .filter(Objects::nonNull)
              .findFirst()
              .orElse(null);

          final var generalError = Optional.ofNullable(dto.generalFieldError())
              .orElse(emailError);

          return ApartmentUpsertFormDto.builder()
              .buildingError(dto.buildingIdFieldError())
              .numberError(dto.numberFieldError())
              .nameError(dto.nameFieldError())
              .aliquotError(dto.aliquotFieldError())
              .generalError(generalError)
              .build();
        })
        .flatMap(dto -> {

          final var apartment = Apartment.builder()
              .buildingId(request.getBuildingId())
              .number(request.getNumber())
              .name(request.getName())
              .aliquot(request.getAliquot())
              .emails(request.getEmails())
              .build();

          if (optKeys.isPresent()) {
            if (apartment.keysWithHash(optKeys.get().cardId()).hash() == optKeys.get().hash()) {
              dto = dto.toBuilder()
                  .generalError("No hay cambios")
                  .build();
            }
          }

          if (dto.isSuccess()) {

            if (isUpdate) {
              dto = dto.toBuilder()
                  .item(AptItem.builder()
                      .key(request.getKey())
                      .cardId(optKeys.get().cardId())
                      .apt(apartment)
                      .isUpdate(isUpdate)
                      .build())
                  .build();

              return apartmentService.update(apartment)
                  .replaceWith(dto);
            }

            return apartmentService.create(request)
                .replaceWith(dto);
          }

          return Uni.createFrom().item(dto);
        })
        .map(Templates::upsert);
  }

}
