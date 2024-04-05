package com.yaz.core.service.entity;

import com.yaz.persistence.entities.Expense;
import com.yaz.persistence.repository.turso.ExpenseRepository;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class ExpenseService {

  private final ExpenseRepository repository;

  public Uni<Long> count() {
    return repository.count();
  }


  public Uni<List<Expense>> readByReceipt(String buildingId, long receiptId) {
    return repository.readByReceipt(buildingId, receiptId);
  }
}
