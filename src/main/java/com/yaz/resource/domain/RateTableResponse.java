package com.yaz.resource.domain;

import java.util.Collection;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import com.yaz.persistence.entities.Rate;
import com.yaz.resource.RateResource;

@Data
@Builder
public class RateTableResponse {

  private final long totalCount;
  private final String nextPageUrl;
  private final Collection<Item> results;

  @Data
  public static class Item {

    private final Rate rate;

    @Getter(lazy = true)
    private final String cardId = genCardId();

    @Getter(lazy = true)
    private final String cardIdRef = genCardIdRef();

    @Getter(lazy = true)
    private final String deleteUrl = genDeleteUrl();

    @Getter(lazy = true)
    private final Boolean ifHidden = genIfHidden();

    public String genCardId() {
      return "rate-card-id-" + getRate().id();
    }

    public String genDeleteUrl() {
      return RateResource.DELETE_PATH + getRate().id();
    }

    public String genCardIdRef() {
      return "#" + genCardId();
    }

    public boolean genIfHidden() {
      return getRate().etag() != null || getRate().hash() != null || getRate().lastModified() != null;
    }
  }
}
