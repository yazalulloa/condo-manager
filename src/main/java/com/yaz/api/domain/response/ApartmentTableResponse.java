package com.yaz.api.domain.response;

import com.yaz.api.domain.AptItem;
import java.util.List;
import lombok.Builder;

@Builder
public record ApartmentTableResponse(
    List<AptItem> results,
    String nextPageUrl,
    AptCountersDto countersDto) {

}
