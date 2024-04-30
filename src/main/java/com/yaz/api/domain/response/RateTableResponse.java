package com.yaz.api.domain.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.yaz.api.resource.RateResource;
import com.yaz.persistence.entities.Rate;
import java.util.Collection;
import java.util.UUID;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Builder(toBuilder = true)
public record RateTableResponse(
    Long selected,
    long totalCount,
    String nextPageUrl,
    Collection<Item> results) {

  @Data
  @Builder
  public static class Item {


    private final String key;
    private final Rate rate;

    @Builder.Default
    private final String cardId = "rate-card-id-" + UUID.randomUUID();

    @JsonIgnore
    @Getter(lazy = true)
    private final String cardIdRef = genCardIdRef();
    @JsonIgnore
    @Getter(lazy = true)
    private final String deleteUrl = genDeleteUrl();
    @JsonIgnore
    @Getter(lazy = true)
    private final Boolean ifHidden = genIfHidden();

    public String genDeleteUrl() {
      return RateResource.DELETE_PATH + key;
    }

    public String genCardIdRef() {
      return "#" + cardId;
    }

    public boolean genIfHidden() {
      return getRate().etag() != null || getRate().hash() != null || getRate().lastModified() != null;
    }
  }
}
