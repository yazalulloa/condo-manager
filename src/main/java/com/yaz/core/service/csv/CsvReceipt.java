package com.yaz.core.service.csv;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.yaz.persistence.entities.Debt;
import com.yaz.persistence.entities.Expense;
import com.yaz.persistence.entities.ExtraCharge;
import java.util.List;
import lombok.Builder;

@Builder(toBuilder = true)
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@JsonInclude(JsonInclude.Include.NON_NULL)
public record CsvReceipt(
    String fileName,
    List<Expense> expenses,
    List<Debt> debts,
    List<ExtraCharge> extraCharges) {


}
