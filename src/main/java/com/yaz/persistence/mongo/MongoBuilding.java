package com.yaz.persistence.mongo;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.yaz.persistence.domain.Currency;
import com.yaz.persistence.entities.ReserveFund;
import com.yaz.persistence.mongo.MongoReceipt.MongoExtraCharge;
import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Set;
import lombok.Builder;


@Builder(toBuilder = true)
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record MongoBuilding(
    String id,
    String name,
    String rif,
    Currency mainCurrency,
    Currency debtCurrency,
    Set<Currency> currenciesToShowAmountToPay,
    Boolean fixedPay,
    BigDecimal fixedPayAmount,
    Boolean roundUpPayments,
    Long amountOfApts,
    String emailConfig,
    ZonedDateTime createdAt,
    ZonedDateTime updatedAt,
    List<MongoExtraCharge> extraCharges,
    List<ReserveFund> reserveFunds) {

}
