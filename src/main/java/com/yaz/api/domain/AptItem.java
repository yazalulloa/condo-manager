package com.yaz.api.domain;

import com.yaz.api.resource.ApartmentsResource;
import com.yaz.persistence.entities.Apartment;
import java.math.BigDecimal;
import java.util.Set;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.experimental.Accessors;

@Builder
@Data
@Accessors(fluent = true)
public class AptItem {

  private final String key;

  private final Apartment apt;
  private final boolean isUpdate;
  private final String cardId;

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
    return ApartmentsResource.PATH + "?id=" + key;
  }

  public String genCardIdRef() {
    return "#" + cardId;
  }

  public AptEditAttr editAttr() {
    return new AptEditAttr(
        key,
        apt.buildingId(),
        apt.number(),
        apt.name(),
        apt.aliquot(),
        apt.emails()
    );
  }

  public record AptEditAttr(
      String key,
      String buildingId,
      String number,
      String name,
      BigDecimal aliquot,
      Set<String> emails
  ) implements EditAttr {

  }
}
