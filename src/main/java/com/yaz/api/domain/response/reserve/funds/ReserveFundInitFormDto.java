package com.yaz.api.domain.response.reserve.funds;

import com.yaz.api.domain.response.ReserveFundTableItem;
import java.util.List;
import lombok.Builder;

@Builder(toBuilder = true)
public record ReserveFundInitFormDto(
    String key,
    List<ReserveFundTableItem> reserveFunds
) {

}
