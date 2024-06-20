package com.yaz.api.domain.response.building;

import lombok.Builder;

@Builder(toBuilder = true)
public record BuildingFormResponse(
    String key,
    String idFieldError,
    String generalFieldError,
    String nameFieldError,
    String fixedPayAmountFieldError,
    String currenciesToShowAmountToPay
) {

  public boolean isSuccess() {
    return generalFieldError == null
        && nameFieldError == null
        && fixedPayAmountFieldError == null;
  }

}
