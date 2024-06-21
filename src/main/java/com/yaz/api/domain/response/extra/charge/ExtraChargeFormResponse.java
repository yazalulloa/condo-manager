package com.yaz.api.domain.response.extra.charge;

import com.yaz.api.domain.response.ExtraChargeTableItem;
import java.util.Collection;
import lombok.Builder;

@Builder(toBuilder = true)
public record ExtraChargeFormResponse(
    String descriptionFieldError,
    String amountFieldError,
    String generalFieldError,
    Collection<String> aptsSelected,

    ExtraChargeTableItem tableItem,
    Long count
) {

  public boolean isSuccess() {
    return descriptionFieldError == null && amountFieldError == null && generalFieldError == null;
  }

}
