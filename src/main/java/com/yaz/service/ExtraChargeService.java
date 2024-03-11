package com.yaz.service;

import com.yaz.persistence.repository.mysql.ExtraChargeRepository;
import com.yaz.persistence.domain.request.ExtraChargeCreateRequest;
import com.yaz.persistence.domain.request.ExtraChargeUpdateRequest;
import com.yaz.persistence.entities.ExtraCharge;
import com.yaz.persistence.entities.ExtraCharge.Keys;
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

  public Uni<Optional<ExtraCharge>> read(String buildingId, String secondaryId, String id) {
    return repository.read(buildingId, secondaryId, id);
  }

  public Uni<List<ExtraCharge>> byBuilding(String buildingId) {
    return repository.select(buildingId, buildingId);
  }

  public Uni<Integer> delete(Keys keys) {
    return repository.delete(keys.buildingId(), keys.secondaryId(), keys.id());
  }

  public Uni<Integer> create(ExtraChargeCreateRequest createRequest) {
    return repository.insert(createRequest);
  }

  public Uni<Integer> update(ExtraChargeUpdateRequest updateRequest) {
    return repository.update(updateRequest);
  }
}
