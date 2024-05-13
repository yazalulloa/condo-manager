package com.yaz.api.domain.response;

import com.yaz.api.resource.ReceiptResource;
import com.yaz.persistence.entities.Receipt;
import java.util.UUID;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.experimental.Accessors;

@Data
@Accessors(fluent = true)
@Builder
public class ReceiptTableItem {

  private final String key;
  private final Receipt item;
  private final String cardId;
  private boolean sentInfoOutOfBounds;


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
