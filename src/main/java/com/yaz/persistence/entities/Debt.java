package com.yaz.persistence.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.yaz.persistence.domain.Currency;
import java.math.BigDecimal;
import java.util.Set;
import lombok.Builder;
import lombok.extern.jackson.Jacksonized;

@Builder(toBuilder = true)
@Jacksonized
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@JsonInclude(JsonInclude.Include.NON_NULL)
public record Debt(
    String buildingId,
    long receiptId,
    String aptNumber,

    int receipts,

    BigDecimal amount,

    Set<Integer> months,

    BigDecimal previousPaymentAmount,

    Currency previousPaymentAmountCurrency
) {

}
