package com.yaz.resource.domain.request;

import java.util.Set;
import lombok.Data;
import com.yaz.persistence.domain.Currency;
import org.jboss.resteasy.reactive.RestForm;

@Data
public class BuildingRequest {

  @RestForm
  private String id;
  @RestForm
  private String name;
  @RestForm
  private String rif;
  @RestForm
  private Currency mainCurrency;
  @RestForm
  private Currency debtCurrency;
  @RestForm
  private Set<Currency> currenciesToShowAmountToPay;
  @RestForm
  private boolean fixedPay;
  @RestForm
  private String fixedPayAmount;
  @RestForm
  private boolean roundUpPayments;
  @RestForm
  private String emailConfig;
}
