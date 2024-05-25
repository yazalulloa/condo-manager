package com.yaz.api.domain.response;

import com.yaz.api.domain.AptItem;
import lombok.Builder;

@Builder(toBuilder = true)
public record ApartmentUpsertFormDto(
    String buildingError,
    String numberError,
    String nameError,
    String aliquotError,
    String generalError,
    AptItem item
) {

  public boolean isSuccess() {
    return generalError == null
        && buildingError == null
        && numberError == null
        && nameError == null
        && aliquotError == null;
  }
}
