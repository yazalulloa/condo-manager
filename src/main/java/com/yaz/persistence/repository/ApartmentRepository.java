package com.yaz.persistence.repository;

import com.yaz.persistence.domain.query.ApartmentQuery;
import com.yaz.persistence.entities.Apartment;
import com.yaz.persistence.entities.ExtraCharge;
import io.smallrye.mutiny.Uni;
import io.vertx.mutiny.sqlclient.Row;
import io.vertx.mutiny.sqlclient.RowSet;
import io.vertx.mutiny.sqlclient.Tuple;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

public interface ApartmentRepository {

  Uni<Long> count();

  Uni<Integer> delete(String buildingId, String number);

  Uni<Integer> deleteByBuildingId(String buildingId);

  Uni<Integer> insert(Apartment apartment);

  Uni<List<Apartment>> select(ApartmentQuery query);

  Uni<Optional<Long>> queryCount(ApartmentQuery query);

  Uni<Boolean> exists(String buildingId, String number);

  Uni<Optional<Apartment>> read(String buildingId, String number);

  Uni<Integer> update(Apartment apartment);

  Uni<Integer> insert(Collection<Apartment> apartments);

  Uni<List<ExtraCharge.Apt>> aptByBuildings(String buildingId);

  Uni<List<Apartment>> apartmentsByBuilding(String buildingId);
}
