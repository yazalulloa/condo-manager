package com.yaz.resource.domain.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.yaz.persistence.entities.Receipt;
import com.yaz.resource.ReceiptResource;
import java.util.Collection;
import java.util.UUID;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.experimental.Accessors;

@Data
@Accessors(fluent = true)
@Builder
public class ReceiptTableResponse {

  private final ReceiptCountersDto countersDto;
  @JsonIgnore
  private final String nextPageUrl;
  private final Collection<Item> results;

  @Data
  @Accessors(fluent = true)
  @Builder
  public static class Item {

    private final String key;
    private final Receipt item;
    @Builder.Default
    private final String cardId = "receipt-card-id-" + UUID.randomUUID();


    @Getter(lazy = true)
    private final String cardIdRef = genCardIdRef();

    @Getter(lazy = true)
    private final String deleteUrl = genDeleteUrl();


    public String genDeleteUrl() {
      return ReceiptResource.DELETE_PATH + key;
    }

    public String genCardIdRef() {
      return "#" + cardId;
    }
  }
}
