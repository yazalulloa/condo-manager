package com.yaz.api.domain.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.yaz.api.resource.UserResource;
import com.yaz.persistence.entities.User;
import java.util.Collection;
import java.util.UUID;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.experimental.Accessors;

@Data
@Builder
public class UserTableResponse {

  private final long totalCount;
  @JsonIgnore
  private final String nextPageUrl;
  private final Collection<Item> results;

  @Data
  @Accessors(fluent = true)
  @Builder
  public static class Item {


    private final String key;
    private final User user;

    @Builder.Default
    private final String cardId = "user-card-id-" + UUID.randomUUID();
    @JsonIgnore
    @Getter(lazy = true)
    private final String cardIdRef = genCardIdRef();
    @JsonIgnore
    @Getter(lazy = true)
    private final String deleteUrl = genDeleteUrl();

    public String genDeleteUrl() {
      return UserResource.DELETE_PATH + key;
    }

    public String genCardIdRef() {
      return "#" + cardId;
    }
  }
}
