package com.yaz.resource.domain.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.Collection;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EmailConfigTableResponse {

  private final long totalCount;
  @JsonIgnore
  private final String nextPageUrl;
  private final Collection<EmailConfigTableItem> results;

}
