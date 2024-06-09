package com.yaz.api.domain.response;

import java.time.LocalDate;
import java.util.List;
import lombok.Builder;

@Builder(toBuilder = true)
public record ReceiptPdfResponse(
    String building,
    String month,
    LocalDate date,
    String zipPath,
    List<Tab> tabs,
    boolean outOfBounds
) {


  @Builder(toBuilder = true)
  public record Tab(
      String name,
      String path,
      boolean checked
  ) {

  }
}
