package com.yaz.resource.domain.response;

import com.yaz.persistence.entities.Building;
import com.yaz.resource.BuildingResource;
import java.util.Collection;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Data
@Builder
@RequiredArgsConstructor
public class BuildingReportResponse {

  private final long totalCount;
  private final String nextPageUrl;
  private final Collection<Item> results;
  private final String buildingEditUrl = "/buildings/edit";

  @Data
  @RequiredArgsConstructor
  public static class Item {

    private final Building building;

    @Getter(lazy = true)
    private final String cardId = genCardId();

    @Getter(lazy = true)
    private final String cardIdRef = genCardIdRef();

    @Getter(lazy = true)
    private final String deleteUrl = genDeleteUrl();

    private String genCardId() {
      return "rate-card-id-" + getBuilding().id();
    }

    private String genDeleteUrl() {
      return BuildingResource.DELETE_PATH + getBuilding().id();
    }

    private String genCardIdRef() {
      return "#" + genCardId();
    }

  }
}
