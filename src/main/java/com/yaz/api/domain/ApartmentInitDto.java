package com.yaz.api.domain;

import com.yaz.api.domain.response.ApartmentTableResponse;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ApartmentInitDto {

  private final ApartmentTableResponse tableRes;
}
