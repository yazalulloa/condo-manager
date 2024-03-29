package com.yaz.resource.domain.response;

import java.time.LocalDate;
import java.util.List;
import lombok.Builder;

@Builder(toBuilder = true)
public record ReceiptPdfResponse(
    String building,
    String month,
    LocalDate date,
    String zipPath,
    List<Tab> tabs
) {


  @Builder(toBuilder = true)
  public record Tab(
      String name,
      String path,
      boolean checked
  ) {

  }
}
