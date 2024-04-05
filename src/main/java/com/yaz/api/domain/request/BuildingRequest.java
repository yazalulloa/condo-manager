package com.yaz.api.domain.request;

import com.yaz.persistence.domain.Currency;
import java.util.List;
import java.util.Set;
import lombok.Data;
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
  @RestForm
  private Set<String> extraCharges;

//  @RestForm
//  private List<ExtraChargeRequest> extraCharges;

}
