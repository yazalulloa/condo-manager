package com.yaz.resource.domain.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.yaz.persistence.entities.ReserveFund;
import com.yaz.resource.ReserveFundResource;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@Builder(toBuilder = true)
public class ReserveFundTableItem {

  private final ReserveFund item;
  private final boolean outOfBoundsUpdate;

  public static ReserveFundTableItem of(ReserveFund item) {
    return new ReserveFundTableItem(item, false);
  }


  @JsonIgnore
  @Getter(lazy = true)
  private final String cardId = genCardId();
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
    return ReserveFundResource.PATH + "/form/" + getItem().buildingId() + "/" + getItem().id();
  }


  public String genCardId() {
    return "reserve-fund-card-id-" + getItem().id();
  }

  public String genDeleteUrl() {
    return ReserveFundResource.DELETE_PATH + getItem().buildingId() + "/" + getItem().id();
  }

  public String genCardIdRef() {
    return "#" + genCardId();
  }
}
