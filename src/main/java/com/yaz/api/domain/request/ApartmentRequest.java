package com.yaz.api.domain.request;

import java.math.BigDecimal;
import java.util.Set;
import lombok.Builder;
import lombok.Data;
import org.jboss.resteasy.reactive.RestForm;

@Data
public class ApartmentRequest {
  @RestForm
  private String key;
  @RestForm
  private String buildingId;
  @RestForm
  private String number;
  @RestForm
  private String name;
  @RestForm
  private BigDecimal aliquot;
  @RestForm
  private Set<String> emails;
}
