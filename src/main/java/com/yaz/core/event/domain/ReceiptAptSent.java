package com.yaz.core.event.domain;

import com.yaz.api.domain.response.ReceiptTableItem;
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
    ReceiptTableItem item,
    boolean finished
) {

  public static ReceiptAptSent finished(String clientId) {
    return finished(clientId, null);
  }

  public static ReceiptAptSent item(String clientId, ReceiptTableItem item) {
    return ReceiptAptSent.builder()
        .clientId(clientId)
        .item(item)
        .build();
  }

  public static ReceiptAptSent finished(String clientId, String error) {
    return ReceiptAptSent.builder()
        .clientId(clientId)
        .error(error)
        .finished(true)
        .build();
  }


}
