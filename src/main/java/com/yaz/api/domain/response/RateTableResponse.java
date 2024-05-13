package com.yaz.api.domain.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.yaz.api.resource.RateResource;
import com.yaz.persistence.entities.Rate;
import java.util.Collection;
import java.util.List;
import java.util.UUID;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.experimental.Accessors;

@Builder(toBuilder = true)
public record RateTableResponse(
    Long selected,
    long totalCount,
    String nextPageUrl,
    List<Item> results) {

  @Data
  @Accessors(fluent = true)
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
      return rate().etag() != null || rate().hash() != null || rate().lastModified() != null;
    }
  }
}
