package com.yaz.api.domain;

import com.yaz.api.resource.ApartmentsResource;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import com.yaz.persistence.entities.Apartment;

@Data
@RequiredArgsConstructor
public class AptItem {


  private final Apartment apt;
  private final boolean isUpdate;

  @Getter(lazy = true)
  private final String cardId = genCardId();

  @Getter(lazy = true)
  private final String cardIdRef = genCardIdRef();

  @Getter(lazy = true)
  private final String editUrl = genEditUrl();

  @Getter(lazy = true)
  private final String deleteUrl = genDeleteUrl();

  @Getter(lazy = true)
  private final String itemUrl = genItemUrl();

  public AptItem(Apartment apt) {
    this.apt = apt;
    this.isUpdate = false;
  }

  public String genEditUrl() {
    return ApartmentsResource.EDIT_FORM_PATH + getApt().buildingId() + "/" + getApt().number();
  }

  public String genItemUrl() {
    return ApartmentsResource.ITEM_PATH + getApt().buildingId() + "/" + getApt().number();
  }

  public String genCardId() {
    return "apt-card-id-" + getApt().buildingId() + "-" + getApt().number();
  }

  public String genDeleteUrl() {
    return ApartmentsResource.DELETE_PATH + getApt().buildingId() + "/" + getApt().number();
  }

  public String genCardIdRef() {
    return "#" + genCardId();
  }
}
