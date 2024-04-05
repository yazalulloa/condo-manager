package com.yaz.api.domain.request;

import com.yaz.persistence.domain.Currency;
import java.util.Objects;
import lombok.Data;
import org.jboss.resteasy.reactive.RestForm;

@Data
public class ExtraChargeRequest {


  @RestForm("extraChargeDescription")
  private String description;
  @RestForm("extraChargeAmount")
  private String amount;
  @RestForm("extraChargeCurrency")
  private Currency currency;
  @RestForm("extraChargeActive")
  private boolean active;
  @RestForm
  private String[] apartments;

//  @Override
//  public boolean equals(Object o) {
//    if (this == o) {
//      return true;
//    }
//    if (o == null || getClass() != o.getClass()) {
//      return false;
//    }
//    ExtraChargeRequest that = (ExtraChargeRequest) o;
//    return Objects.equals(description, that.description);
//  }
//
//  @Override
//  public int hashCode() {
//    return Objects.hash(description);
//  }
}
