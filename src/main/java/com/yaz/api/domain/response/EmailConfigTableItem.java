package com.yaz.api.domain.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.yaz.api.resource.EmailConfigResource;
import com.yaz.persistence.domain.EmailConfigUser;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Data
@Builder(toBuilder = true)
public class EmailConfigTableItem {

  private final EmailConfigUser item;
  private final boolean outOfBoundUpdate;
  @JsonIgnore
  @Getter(lazy = true)
  private final String cardId = genCardId();
  @JsonIgnore
  @Getter(lazy = true)
  private final String cardIdRef = genCardIdRef();
  @JsonIgnore
  @Getter(lazy = true)
  private final String deleteUrl = genDeleteUrl();

  public static EmailConfigTableItem ofItem(EmailConfigUser item) {
    return EmailConfigTableItem.builder()
        .item(item)
        .outOfBoundUpdate(false)
        .build();
  }

  public String genCardId() {
    return "email-config-card-id-" + getItem().emailConfig().userId();
  }

  public String genDeleteUrl() {
    return EmailConfigResource.DELETE_PATH + getItem().emailConfig().userId();
  }

  public String genCardIdRef() {
    return "#" + genCardId();
  }
}
