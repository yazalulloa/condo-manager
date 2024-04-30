package com.yaz.core.service.entity;

import com.yaz.core.util.monad.Result;
import com.yaz.persistence.domain.request.ExtraChargeCreateRequest;
import com.yaz.persistence.domain.request.ExtraChargeUpdateRequest;
import com.yaz.persistence.entities.ExtraCharge;
import com.yaz.persistence.entities.ExtraCharge.Keys;
import com.yaz.persistence.repository.turso.ExtraChargeRepository;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class ExtraChargeService {

  private final ExtraChargeRepository repository;

  public Uni<Long> count() {
    return repository.count();
  }

  public Uni<Optional<ExtraCharge>> read(ExtraCharge.Keys keys) {
    return read(keys.buildingId(), keys.parentReference(), keys.id());
  }

  public Uni<Optional<ExtraCharge>> read(String buildingId, String parentReference, long id) {
    return repository.read(buildingId, parentReference, id);
  }

  public Uni<List<ExtraCharge>> by(String buildingId, String parentReference) {
    return repository.select(buildingId, parentReference);
  }


  public Uni<Integer> delete(Keys keys) {
    return repository.delete(keys.parentReference(), keys.buildingId(), keys.id());
  }

  public Uni<ExtraCharge> create(ExtraChargeCreateRequest createRequest) {

    final var extraCharge = ExtraCharge.builder()
        .parentReference(createRequest.parentReference())
        .buildingId(createRequest.buildingId())
        .type(createRequest.type())
        .description(createRequest.description())
        .amount(createRequest.amount())
        .currency(createRequest.currency())
        .active(createRequest.active())
        .build();

    return repository.insert(extraCharge, createRequest.apartments())
        .map(res -> extraCharge.toBuilder()
            .id(res.id())
            .build());
  }

  public Uni<Integer> update(ExtraChargeUpdateRequest updateRequest) {
    return repository.update(updateRequest);
  }

  public Uni<Integer> deleteByBuilding(String id) {
    return repository.deleteByBuilding(id);
  }

  public Uni<Long> count(Keys keys) {
    return repository.count(keys.buildingId(), keys.parentReference());
  }
}
