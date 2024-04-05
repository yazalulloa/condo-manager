package com.yaz.api.domain.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.yaz.api.resource.UserResource;
import com.yaz.persistence.entities.User;
import java.util.Collection;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Data
@Builder
public class UserTableResponse {

  private final long totalCount;
  @JsonIgnore
  private final String nextPageUrl;
  private final Collection<Item> results;

  @Data
  public static class Item {

    private final User user;
    @JsonIgnore
    @Getter(lazy = true)
    private final String cardId = genCardId();
    @JsonIgnore
    @Getter(lazy = true)
    private final String cardIdRef = genCardIdRef();
    @JsonIgnore
    @Getter(lazy = true)
    private final String deleteUrl = genDeleteUrl();

    public String genCardId() {
      return "user-card-id-" + getUser().id();
    }

    public String genDeleteUrl() {
      return UserResource.DELETE_PATH + getUser().id();
    }

    public String genCardIdRef() {
      return "#" + genCardId();
    }
  }
}
