package com.yaz.api.domain.response;

import com.yaz.api.resource.BuildingResource;
import com.yaz.persistence.entities.Building;
import java.util.Collection;
import java.util.UUID;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.experimental.Accessors;


@Builder(toBuilder = true)
public record BuildingReportResponse(
    long totalCount,
    String nextPageUrl,
    Collection<Item> results) {

  @Data
  @Builder(toBuilder = true)
  @Accessors(fluent = true)
  public static class Item {

    private final String key;
    private final Building building;

    @Builder.Default
    private final String cardId = "building-card-id-" + UUID.randomUUID();


    @Getter(lazy = true)
    private final String cardIdRef = genCardIdRef();

    @Getter(lazy = true)
    private final String deleteUrl = genDeleteUrl();

    private String genDeleteUrl() {
      return BuildingResource.DELETE_PATH + key;
    }

    private String genCardIdRef() {
      return "#" + cardId();
    }

  }
}
