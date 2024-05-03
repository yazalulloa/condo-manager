package com.yaz.api.domain.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.yaz.api.resource.DebtResource;
import com.yaz.persistence.domain.Currency;
import com.yaz.persistence.entities.Debt;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.experimental.Accessors;

@Data
@Accessors(fluent = true)
@Builder(toBuilder = true)
public class DebtTableItem {

  private final String key;
  private final Debt item;
  private final Currency currency;
  private final String cardId;
  private final boolean outOfBoundsUpdate;
  private final boolean addAfterEnd;

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
    return DebtResource.PATH + "/form/" + key;
  }


  public String genDeleteUrl() {
    return DebtResource.DELETE_PATH + key;
  }

  public String genCardIdRef() {
    return "#" + cardId;
  }
}
