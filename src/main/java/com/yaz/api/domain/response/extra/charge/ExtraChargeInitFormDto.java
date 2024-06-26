package com.yaz.api.domain.response.extra.charge;

import com.yaz.api.domain.response.ExtraChargeTableItem;
import java.util.List;
import lombok.Builder;

@Builder(toBuilder = true)
public record ExtraChargeInitFormDto(
    String key,
    List<ExtraChargeTableItem> extraCharges
) {

}
