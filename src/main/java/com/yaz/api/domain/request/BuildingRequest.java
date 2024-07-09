package com.yaz.api.domain.request;

import com.yaz.persistence.domain.Currency;
import jakarta.validation.constraints.NotNull;
import java.util.Set;
import lombok.Data;
import org.jboss.resteasy.reactive.RestForm;

@Data
public class BuildingRequest {

  @RestForm
  private String key;
  @RestForm
  private String id;
  @RestForm
  private String name;
  @RestForm
  private String rif;
  @NotNull
  @RestForm
  private Currency mainCurrency;
  @NotNull
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
