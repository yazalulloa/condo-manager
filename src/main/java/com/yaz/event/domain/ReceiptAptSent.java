package com.yaz.event.domain;

import java.util.Set;
import lombok.Builder;

@Builder(toBuilder = true)
public record ReceiptAptSent(
    String clientId,
    int counter,
    int size,
    String building,
    String month,
    String date,
    String apt,
    String from,
    Set<String> to,
    boolean finished
) {

  public static ReceiptAptSent finished(String clientId) {
    return ReceiptAptSent.builder()
        .clientId(clientId)
        .finished(true)
        .build();
  }
}
