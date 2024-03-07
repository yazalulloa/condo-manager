package com.yaz.persistence;

import com.yaz.persistence.MySqlService.TrxMode;
import com.yaz.persistence.domain.Currency;
import com.yaz.persistence.domain.MySqlQueryRequest;
import com.yaz.persistence.domain.request.ExtraChargeCreateRequest;
import com.yaz.persistence.domain.request.ExtraChargeUpdateRequest;
import com.yaz.persistence.entities.ExtraCharge;
import com.yaz.persistence.entities.ExtraCharge.Apt;
import com.yaz.util.SqlUtil;
import io.smallrye.mutiny.Uni;
import io.vertx.mutiny.sqlclient.Row;
import io.vertx.mutiny.sqlclient.SqlResult;
import io.vertx.mutiny.sqlclient.Tuple;
import io.vertx.sqlclient.impl.ArrayTuple;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class ExtraChargeRepository {

  private static final String COLLECTION = "extra_charges";
  private static final String COLLECTION_APT = "extra_charges_apartments";

  public static final String SELECT = """
      SELECT extra_charges.*, BIN_TO_UUID(extra_charges.id) as uuid_id,
             GROUP_CONCAT(extra_charges_apartments.apt_number, '%s', apartments.name SEPARATOR '%s') as apt_numbers
            
      FROM extra_charges
               LEFT JOIN extra_charges_apartments ON extra_charges.building_id = extra_charges_apartments.building_id AND
                                       extra_charges.secondary_id = extra_charges_apartments.secondary_id AND
                                       extra_charges.id = extra_charges_apartments.id
               LEFT JOIN apartments ON extra_charges_apartments.building_id = apartments.building_id AND
                                       extra_charges_apartments.apt_number = apartments.number
      %s
      GROUP BY extra_charges.building_id, extra_charges.secondary_id, extra_charges.id
      ORDER BY extra_charges.building_id, extra_charges.secondary_id, extra_charges.id;
      """;

  public static final String DELETE = "DELETE FROM %s WHERE building_id = ? AND secondary_id = ? AND  id = UUID_TO_BIN(?)";

  public static final String READ = """
      SELECT extra_charges.*, BIN_TO_UUID(extra_charges.id) as uuid_id,
                 GROUP_CONCAT(extra_charges_apartments.apt_number, '%s', apartments.name SEPARATOR '%s') as apt_numbers
                
          FROM extra_charges
                   LEFT JOIN extra_charges_apartments ON extra_charges.building_id = extra_charges_apartments.building_id AND
                                           extra_charges.secondary_id = extra_charges_apartments.secondary_id AND
                                           extra_charges.id = extra_charges_apartments.id
                   LEFT JOIN apartments ON extra_charges_apartments.building_id = apartments.building_id AND
                                           extra_charges_apartments.apt_number = apartments.number
      WHERE extra_charges.building_id = ? AND extra_charges.secondary_id = ? AND extra_charges.id = UUID_TO_BIN(?)
          GROUP BY extra_charges.building_id, extra_charges.secondary_id, extra_charges.id
          ORDER BY extra_charges.building_id, extra_charges.secondary_id, extra_charges.id;
      """;

  public static final String INSERT_APT = """
      INSERT IGNORE INTO %s (building_id, secondary_id, id, apt_number)
      VALUES (?, ?, UUID_TO_BIN(?, true), ?)
      """.formatted(COLLECTION_APT);


  public static final String DELETE_APT_WHERE = """
       DELETE FROM %s WHERE building_id = ? AND secondary_id = ? AND id = UUID_TO_BIN(?) AND apt_number NOT IN (
      """.formatted(COLLECTION_APT);

  private final MySqlService mySqlService;

  public Uni<Long> count() {
    return mySqlService.totalCount(COLLECTION);
  }

  public Uni<Optional<ExtraCharge>> read(String buildingId, String secondaryId, String id) {
    final var query = READ.formatted(mySqlService.columnSeparator(), mySqlService.rowSeparator());
    return mySqlService.request(query, Tuple.of(buildingId, secondaryId, id))
        .map(rowSet -> SqlUtil.toOptional(rowSet, this::from));
  }

  public Uni<List<ExtraCharge>> select(String buildingId, String secondaryId) {

    final var query = SELECT.formatted(mySqlService.columnSeparator(), mySqlService.rowSeparator(),
        "WHERE extra_charges.building_id = ? AND extra_charges.secondary_id = ?");
    return mySqlService.request(query, Tuple.of(buildingId, secondaryId))
        .map(rowSet -> SqlUtil.toList(rowSet, this::from));

  }

  private List<Apt> apartments(Row row) {
    final var aptNumbers = SqlUtil.getValue(row, "apt_numbers", Row::getString);
    if (aptNumbers == null || aptNumbers.isEmpty()) {
      return Collections.emptyList();
    }
    final var rowSplit = aptNumbers.split(mySqlService.quotedRowSeparator());
    final var apts = new ArrayList<Apt>(rowSplit.length);
    for (String rowStr : rowSplit) {
      final var columnSplit = rowStr.split(mySqlService.quotedColumnSeparator());
      final Apt apt;
      if (columnSplit.length < 2) {
        apt = Apt.builder().number(columnSplit[0]).build();
      } else {
        apt = Apt.builder().number(columnSplit[0]).name(columnSplit[1]).build();
      }
      apts.add(apt);


    }

    return apts;
  }

  private ExtraCharge from(Row row) {

    final var apartments = apartments(row);

    return ExtraCharge.builder()
        .buildingId(row.getString("building_id"))
        .secondaryId(row.getString("secondary_id"))
        .id(row.getString("uuid_id"))
        .description(row.getString("description"))
        .amount(row.getDouble("amount"))
        .currency(Currency.valueOf(row.getString("currency")))
        .active(row.getBoolean("active"))
        .apartments(apartments)
        .build();
  }

  public Uni<Integer> delete(String buildingId, String secondaryId, String id) {

    final var delete1 = MySqlQueryRequest.normal(DELETE.formatted(COLLECTION), Tuple.of(buildingId, secondaryId, id));
    final var delete2 = MySqlQueryRequest.normal(DELETE.formatted(COLLECTION_APT),
        Tuple.of(buildingId, secondaryId, id));

    return mySqlService.transaction(TrxMode.PARALLEL, delete1, delete2)
        .map(l -> l.stream().map(SqlResult::rowCount).reduce(0, Integer::sum));
  }

  public Uni<Integer> insert(ExtraChargeCreateRequest createRequest) {

    return mySqlService.getUUID()
        .flatMap(uuid -> {

          final var insert = """
              INSERT INTO %s (building_id, secondary_id, id, description, amount, currency, active)
              VALUES (?, ?, UUID_TO_BIN(?, true), ?, ?, ?, ?)
              """.formatted(COLLECTION);

          final var tuple = Tuple.from(List.of(
              createRequest.buildingId(), createRequest.secondaryId(), uuid,
              createRequest.description(), createRequest.amount(), createRequest.currency().name(),
              createRequest.active()
          ));

          if (createRequest.apartments().isEmpty()) {
            return mySqlService.request(insert, tuple)
                .map(SqlResult::rowCount);
          }

          final var normal = MySqlQueryRequest.normal(insert, tuple);
          final var batch = insertApts(createRequest.buildingId(), createRequest.secondaryId(), uuid,
              createRequest.apartments());

          return mySqlService.transaction(TrxMode.PARALLEL, normal, batch)
              .map(l -> l.stream().map(SqlResult::rowCount).reduce(0, Integer::sum));

        });
  }

  private MySqlQueryRequest insertApts(String buildingId, String secondaryId, String id, Set<String> apartments) {
    log.info("insertApts {} {} {} {}", buildingId, secondaryId, id, apartments);
    final var tuples = apartments.stream()
        .map(apt -> Tuple.of(buildingId, secondaryId, id, apt))
        .toList();
    return MySqlQueryRequest.batch(INSERT_APT, tuples);
  }


  public Uni<Integer> update(ExtraChargeUpdateRequest updateRequest) {

    final var queryRequests = new ArrayList<MySqlQueryRequest>();

    final var update = """
        UPDATE %s
        SET description = ?, amount = ?, currency = ?, active = ?
        WHERE building_id = ? AND secondary_id = ? AND id = UUID_TO_BIN(?)
        """.formatted(COLLECTION);

    final var updateParams = List.<Object>of(
        updateRequest.description(), updateRequest.amount(), updateRequest.currency().name(),
        updateRequest.active(), updateRequest.buildingId(), updateRequest.secondaryId(), updateRequest.id()
    );

    queryRequests.add(MySqlQueryRequest.normal(update, Tuple.tuple(updateParams)));

    final var apartments = updateRequest.apartments();

    if (!apartments.isEmpty()) {
      log.info("update apartments  {} {} {} {}", updateRequest.buildingId(), updateRequest.secondaryId(),
          updateRequest.id(), apartments);
      String INSERT_APT = """
          INSERT IGNORE INTO %s (building_id, secondary_id, id, apt_number)
          VALUES (?, ?, UUID_TO_BIN(?), ?)
          """.formatted(COLLECTION_APT);

      final var tuples = apartments.stream()
          .map(apt -> Tuple.of(updateRequest.buildingId(), updateRequest.secondaryId(), updateRequest.id(), apt))
          .toList();
      queryRequests.add(MySqlQueryRequest.batch(INSERT_APT, tuples));

      final var tuple = new ArrayTuple(3 + apartments.size());
      tuple.addString(updateRequest.buildingId());
      tuple.addString(updateRequest.secondaryId());
      tuple.addString(updateRequest.id());

      apartments.forEach(tuple::addString);

      final var query = DELETE_APT_WHERE + SqlUtil.params(apartments.size()) + ")";
      queryRequests.add(MySqlQueryRequest.normal(query, tuple));

    } else {
      queryRequests.add(MySqlQueryRequest.normal(DELETE.formatted(COLLECTION_APT),
          Tuple.of(updateRequest.buildingId(), updateRequest.secondaryId(), updateRequest.id())));
    }

    return mySqlService.transaction(TrxMode.PARALLEL, queryRequests)
        .map(l -> l.stream().map(SqlResult::rowCount).reduce(0, Integer::sum));
  }
}
