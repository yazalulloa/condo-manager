package com.yaz.core.service.domain;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.yaz.persistence.entities.Building;
import com.yaz.persistence.entities.ExtraCharge;
import com.yaz.persistence.entities.ReserveFund;
import java.util.List;
import lombok.Builder;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@Builder(toBuilder = true)
public record BuildingRecord(Building building, List<ReserveFund> reserveFunds, List<ExtraCharge> extraCharges) {

}
