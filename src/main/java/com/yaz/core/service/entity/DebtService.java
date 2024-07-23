package com.yaz.core.service.entity;

import com.yaz.persistence.entities.Debt;
import com.yaz.persistence.entities.Debt.Keys;
import com.yaz.persistence.repository.turso.DebtRepository;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor
public class DebtService {

  private final DebtRepository repository;

  public Uni<List<Debt>> readByReceipt(String buildingId, long receiptId) {
    return repository.readByReceipt(buildingId, receiptId);
  }

  public Uni<Optional<Debt>> read(String buildingId, long receiptId, String aptNumber) {
    return repository.read(buildingId, receiptId, aptNumber);
  }

  public Uni<Debt> get(Keys keys) {
    return repository.read(keys.buildingId(), keys.receiptId(), keys.aptNumber())
        .map(optional -> optional.orElseThrow(() -> new IllegalArgumentException("Debt not found")));
  }

  public Uni<Integer> update(Debt debt) {
    return repository.update(debt);
  }

  public Uni<Integer> deleteByReceipt(String buildingId, long receiptId) {
    return repository.deleteByReceipt(buildingId, receiptId);
  }

  public Uni<Integer> deleteByApartment(String buildingId, String aptNumber) {
    return repository.deleteByApartment(buildingId, aptNumber);
  }
}
