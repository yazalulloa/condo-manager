package com.yaz.resource.domain;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class HtmxTestResponse {

  private final int random;
  private final String value;
  private final String name;
  private final int id;
  private final boolean is;

}
