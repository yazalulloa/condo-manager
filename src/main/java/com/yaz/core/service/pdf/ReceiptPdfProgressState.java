package com.yaz.core.service.pdf;

import lombok.Builder;

@Builder(toBuilder = true)
public record ReceiptPdfProgressState(
    String clientId,
    int totalSize,
    int counter,
    String apt,
    String name,
    boolean finished
) {

  public ReceiptPdfProgressState finish() {
    return this.toBuilder()
        .finished(true)
        .build();
  }
}
