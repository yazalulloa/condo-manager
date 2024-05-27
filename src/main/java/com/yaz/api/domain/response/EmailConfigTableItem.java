package com.yaz.api.domain.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.yaz.api.resource.EmailConfigResource;
import com.yaz.persistence.entities.EmailConfig;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.experimental.Accessors;

@Data
@Accessors(fluent = true)
@Builder(toBuilder = true)
public class EmailConfigTableItem {

  private final EmailConfig item;
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

  public static EmailConfigTableItem ofItem(EmailConfig item) {
    return EmailConfigTableItem.builder()
        .item(item)
        .outOfBoundUpdate(false)
        .build();
  }

  public String genCardId() {
    return "email-config-card-id-" + item().id();
  }

  public String genDeleteUrl() {
    return EmailConfigResource.DELETE_PATH + item().id();
  }

  public String genCardIdRef() {
    return "#" + genCardId();
  }
}
