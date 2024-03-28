package com.yaz.service;

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

  public Uni<Optional<ExtraCharge>> read(String buildingId, String secondaryId, long id) {
    return repository.read(buildingId, secondaryId, id);
  }

  public Uni<List<ExtraCharge>> byBuilding(String buildingId) {
    return repository.select(buildingId, buildingId);
  }

  public Uni<Integer> delete(Keys keys) {
    return repository.delete(keys.buildingId(), keys.secondaryId(), keys.id());
  }

  public Uni<ExtraCharge> create(ExtraChargeCreateRequest createRequest) {

    final var extraCharge = ExtraCharge.builder()
        .buildingId(createRequest.buildingId())
        .secondaryId(createRequest.secondaryId())
        .type(createRequest.type())
        .description(createRequest.description())
        .amount(createRequest.amount())
        .currency(createRequest.currency())
        .active(createRequest.active())
        .build();

    return repository.insert(extraCharge, createRequest.apartments())
        .replaceWith(extraCharge);
  }

  public Uni<Integer> update(ExtraChargeUpdateRequest updateRequest) {
    return repository.update(updateRequest);
  }

  public Uni<Integer> deleteByBuilding(String id) {
    return repository.deleteByBuilding(id);
  }
}
