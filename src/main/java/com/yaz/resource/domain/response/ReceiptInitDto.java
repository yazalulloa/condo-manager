package com.yaz.resource.domain.response;

import java.util.List;
import lombok.Builder;

@Builder(toBuilder = true)
public record ReceiptInitDto(

    ReceiptTableResponse table,
    List<String> buildings
) {


}
