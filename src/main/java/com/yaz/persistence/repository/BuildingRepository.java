package com.yaz.persistence.repository;

import com.yaz.persistence.domain.query.BuildingQuery;
import com.yaz.persistence.entities.Building;
import io.smallrye.mutiny.Uni;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface BuildingRepository {

  Uni<Long> count();

  Uni<Integer> delete(String id);

  Uni<List<Building>> select(BuildingQuery query);

  Uni<Integer> insertIgnore(Collection<Building> buildings);

  Uni<List<String>> selectAllIds();

  Uni<Boolean> exists(String buildingId);

  Uni<Optional<Building>> read(String buildingId);

  Uni<Integer> update(Building building);

  Uni<Integer> insert(Building building);

  Uni<Integer> updateEmailConfig(Set<String> ids);

  Uni<Set<String>> selectByEmailConfig(String id);

  Uni<Integer> updateEmailConfig(Set<String> set, String newConfigId);
}
