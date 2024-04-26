package com.yaz.core.event.domain;

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
    String error,
    Set<String> to,
    boolean finished
) {

  public static ReceiptAptSent finished(String clientId) {
    return finished(clientId, null);
  }

  public static ReceiptAptSent finished(String clientId, String error) {
    return ReceiptAptSent.builder()
        .clientId(clientId)
        .error(error)
        .finished(true)
        .build();
  }


}
