package com.yaz.api.domain.response;

import java.util.List;
import lombok.Builder;

@Builder(toBuilder = true)
public record RateTableResponse(
    Long selected,
    long totalCount,
    String nextPageUrl,
    List<RateTableItem> results) {

}
