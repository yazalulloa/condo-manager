package com.yaz.resource.domain.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.yaz.persistence.entities.ReserveFund;
import com.yaz.resource.ReserveFundResource;
import java.util.UUID;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@Builder(toBuilder = true)
public class ReserveFundTableItem {

  private final String key;
  private final ReserveFund item;
  private final boolean outOfBoundsUpdate;
  private final boolean addAfterEnd;
  @Builder.Default
  private final String cardId = "reserve-fund-card-id-" + UUID.randomUUID();
//  @JsonIgnore
//  @Getter(lazy = true)
//  private final String cardId = genCardId();
//
//  public String genCardId() {
//    return "extra-charge-card-id-" + key;
//  }

  @JsonIgnore
  @Getter(lazy = true)
  private final String cardIdRef = genCardIdRef();
  @JsonIgnore
  @Getter(lazy = true)
  private final String deleteUrl = genDeleteUrl();
  @JsonIgnore
  @Getter(lazy = true)
  private final String editUrl = genEditUrl();

  private String genEditUrl() {
    return ReserveFundResource.PATH + "/form/" + key;
  }

  public String genDeleteUrl() {
    return ReserveFundResource.DELETE_PATH + key;
  }

  public String genCardIdRef() {
    return "#" + cardId;
  }
}
