package com.yaz.api.domain.response;

import com.yaz.api.domain.AptItem;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ApartmentTableResponse {

  private final List<AptItem> results;
  private final String nextPageUrl;
  private final AptCountersDto countersDto;

}
