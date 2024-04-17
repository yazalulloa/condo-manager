package com.yaz.api.domain;

import com.yaz.api.resource.ApartmentsResource;
import java.util.UUID;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import com.yaz.persistence.entities.Apartment;

@Builder
@Data
public class AptItem {

  private final String key;

  private final Apartment apt;
  private final boolean isUpdate;

  @Builder.Default
  private final String cardId = "apartment-card-id-" + UUID.randomUUID();


//  @Getter(lazy = true)
//  private final String cardId = genCardId();

  @Getter(lazy = true)
  private final String cardIdRef = genCardIdRef();

  @Getter(lazy = true)
  private final String editUrl = genEditUrl();

  @Getter(lazy = true)
  private final String deleteUrl = genDeleteUrl();

  @Getter(lazy = true)
  private final String itemUrl = genItemUrl();

//  public AptItem(Apartment apt) {
//    this.apt = apt;
//    this.isUpdate = false;
//  }

  public String genEditUrl() {
    return ApartmentsResource.EDIT_FORM_PATH + key;
  }

  public String genItemUrl() {
    return ApartmentsResource.ITEM_PATH + key;
  }

//  public String genCardId() {
//    return "apt-card-id-" + getApt().buildingId() + "-" + getApt().number();
//  }

  public String genDeleteUrl() {
    return ApartmentsResource.DELETE_PATH + key;
  }

  public String genCardIdRef() {
    return "#" + cardId;
  }
}
