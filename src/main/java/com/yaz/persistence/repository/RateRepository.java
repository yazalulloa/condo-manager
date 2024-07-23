package com.yaz.persistence.repository;

import com.yaz.persistence.domain.Currency;
import com.yaz.persistence.domain.query.RateQuery;
import com.yaz.persistence.entities.Rate;
import io.smallrye.mutiny.Uni;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface RateRepository {

  Uni<Long> count();

  Uni<Integer> delete(long id);

  Uni<List<Rate>> listRows(RateQuery query);

  Uni<Optional<Long>> save(Rate rate);

  Uni<Optional<Rate>> last(Currency fromCurrency, Currency toCurrency);

  Uni<Boolean> exists(long hash);

  Uni<Boolean> exists(BigDecimal rate, LocalDate dateOfRate);

  Uni<Optional<Rate>> read(long id);

  Uni<Integer> insert(Collection<Rate> rates);
}
