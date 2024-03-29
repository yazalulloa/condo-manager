package com.yaz.service.entity;

import com.yaz.persistence.entities.Debt;
import com.yaz.persistence.repository.turso.DebtRepository;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class DebtService {

  private final DebtRepository repository;

  public Uni<List<Debt>> readByReceipt(String buildingId, long receiptId) {
    return repository.readByReceipt(buildingId, receiptId);
  }
}
