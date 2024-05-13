package com.yaz.persistence.entities;


import com.yaz.persistence.domain.Currency;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;
import lombok.Builder;


@Builder(toBuilder = true)
public record Building(
    String id,
    String name,
    String rif,
    Currency mainCurrency,
    Currency debtCurrency,
    Set<Currency> currenciesToShowAmountToPay,
    boolean fixedPay,
    BigDecimal fixedPayAmount,
    Boolean roundUpPayments,
    String emailConfigId,
    LocalDateTime createdAt,
    LocalDateTime updatedAt,
    String configEmail,
    Long aptCount) {

}
