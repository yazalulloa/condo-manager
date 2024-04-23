package com.yaz.persistence.repository;

import com.yaz.persistence.domain.Currency;
import com.yaz.persistence.domain.query.RateQuery;
import com.yaz.persistence.entities.Rate;
import io.smallrye.mutiny.Uni;
import java.util.List;
import java.util.Optional;

public interface RateRepository {

  Uni<Long> count();

  Uni<Integer> delete(long id);

  Uni<List<Rate>> listRows(RateQuery query);

  Uni<Optional<Long>> save(Rate rate);

  Uni<Optional<Rate>> last(Currency fromCurrency, Currency toCurrency);

  Uni<Boolean> exists(long hash);

  Uni<Optional<Rate>> read(long id);

  Uni<Integer> insert(List<Rate> rates);
}
