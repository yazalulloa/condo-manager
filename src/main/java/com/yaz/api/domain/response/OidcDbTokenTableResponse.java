package com.yaz.api.domain.response;

import com.yaz.api.resource.OidcDbTokenResource;
import com.yaz.core.util.ConvertUtil;
import com.yaz.persistence.entities.OidcDbToken;
import java.time.ZoneOffset;
import java.util.List;
import java.util.concurrent.TimeUnit;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;


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
    private final String tokenDuration = genTokenDuration();

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

    public String genTokenDuration() {

      final var expiresIn = TimeUnit.SECONDS.toMillis(getToken().expiresIn());

      final var createdAt = getToken().createdAt().toInstant(ZoneOffset.UTC).toEpochMilli();
      return ConvertUtil.formatDuration(expiresIn - createdAt);
    }
  }


}
