package com.yaz.service;

import com.yaz.persistence.entities.ReserveFund;
import com.yaz.persistence.repository.turso.ReserveFundRepository;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class ReserveFundService {

  private final ReserveFundRepository repository;


  public Uni<Long> count() {
    return repository.count();
  }

  public Uni<Integer> delete(String buildingId, String id) {
    return repository.delete(buildingId, id);
  }

  public Uni<Integer> deleteByBuilding(String buildingId) {
    return repository.deleteByBuilding(buildingId);
  }

  public Uni<Integer> insert(ReserveFund reserveFund) {
    return repository.insert(reserveFund);
  }

  public Uni<Integer> update(ReserveFund reserveFund) {
    return repository.update(reserveFund);
  }

  public Uni<List<ReserveFund>> listByBuilding(String buildingId) {
    return repository.selectByBuilding(buildingId);
  }

}
