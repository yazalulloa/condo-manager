package com.yaz.resource.domain;

import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ApartmentInitDto {

  private final ApartmentFormDto formDto;
  private final ApartmentTableResponse tableRes;
  private final List<String> buildings;
}
