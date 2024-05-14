package com.yaz.api.domain.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.yaz.api.resource.ExtraChargeResource;
import com.yaz.persistence.entities.ExtraCharge;
import java.util.UUID;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Data
@Builder(toBuilder = true)
public class ExtraChargeTableItem {

  private final String key;
  private final ExtraCharge item;
  private final String cardId;
  private final boolean outOfBoundsUpdate;
  private final boolean addAfterEnd;

//  @Builder.Default
//  private final String cardId = "extra-charge-card-id-" + UUID.randomUUID();

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
    return ExtraChargeResource.PATH + "/form/" + key;
  }


  public String genDeleteUrl() {
    return ExtraChargeResource.PATH + "?id=" + key;
  }

  public String genCardIdRef() {
    return "#" + cardId;
  }
}
