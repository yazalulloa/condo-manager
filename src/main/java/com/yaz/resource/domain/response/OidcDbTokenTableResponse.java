package com.yaz.resource.domain.response;

import java.util.List;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import com.yaz.persistence.entities.OidcDbToken;
import com.yaz.resource.OidcDbTokenResource;


public record OidcDbTokenTableResponse(
    long totalCount,
    String nextPageUrl,
    List<Item> results
) {

  @Data
  @RequiredArgsConstructor
  public static class Item {

    private final OidcDbToken token;

    @Getter(lazy = true)
    private final String cardId = genCardId();

    @Getter(lazy = true)
    private final String deleteUrl = genDeleteUrl();

    @Getter(lazy = true)
    private final String cardIdRef = genCardIdRef();


    public String genCardId() {
      return "oidc-token-card-id-" + getToken().id();
    }

    public String genDeleteUrl() {
      return OidcDbTokenResource.DELETE_PATH + getToken().id();
    }

    public String genCardIdRef() {
      return "#" + genCardId();
    }
  }


}
