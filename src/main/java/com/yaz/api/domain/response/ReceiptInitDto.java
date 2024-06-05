package com.yaz.api.domain.response;

import com.yaz.persistence.entities.ExtraCharge;
import java.util.List;
import lombok.Builder;

@Builder(toBuilder = true)
public record ReceiptInitDto(

    ReceiptTableResponse table,
    List<String> buildings,
    List<Apts> apts
) {

  @Builder(toBuilder = true)
  public record Apts(
      String building,
      List<ExtraCharge.Apt> apts
  ) {

  }
}
