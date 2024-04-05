package com.yaz.api.domain.response;

import java.util.List;
import lombok.Builder;

@Builder(toBuilder = true)
public record ReceiptInitDto(

    ReceiptTableResponse table,
    List<String> buildings
) {


}
