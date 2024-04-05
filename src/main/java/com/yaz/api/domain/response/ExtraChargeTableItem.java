package com.yaz.api.domain.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.yaz.api.resource.ExtraChargeResource;
import com.yaz.persistence.entities.ExtraCharge;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Data
@AllArgsConstructor
@Builder(toBuilder = true)
public class ExtraChargeTableItem {

  private final ExtraCharge item;
  private final String id;
  private final boolean outOfBoundsUpdate;
  private final boolean addAfterEnd;

  public ExtraChargeTableItem(ExtraCharge item, String id) {
    this.item = item;
    this.id = id;
    this.outOfBoundsUpdate = false;
    this.addAfterEnd = false;
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
    return ExtraChargeResource.PATH + "/form/" + id;
  }


  public String genCardId() {
    return "extra-charge-card-id-" + getItem().id();
  }

  public String genDeleteUrl() {
    return ExtraChargeResource.DELETE_PATH + id;
  }

  public String genCardIdRef() {
    return "#" + genCardId();
  }
}
