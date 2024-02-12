package com.yaz.resource.domain.response;

import com.yaz.resource.domain.AptItem;
import java.util.List;
import lombok.Builder;
import lombok.Data;
import com.yaz.resource.domain.response.AptCountersDto;

@Data
@Builder
public class ApartmentTableResponse {

  private final List<AptItem> results;
  private final String nextPageUrl;
  private final AptCountersDto countersDto;

}
