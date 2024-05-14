package com.yaz.persistence.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.yaz.core.util.StringUtil;
import com.yaz.persistence.domain.Currency;
import java.util.List;
import java.util.UUID;
import lombok.Builder;

@Builder(toBuilder = true)
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@JsonInclude(JsonInclude.Include.NON_NULL)
public record ExtraCharge(
    long id,
    String parentReference,
    String buildingId,
    Type type,
    String description,
    double amount,
    Currency currency,
    boolean active,
    List<Apt> apartments
) {

  private static final String CARD_ID_PREFIX = "extra-charge-card-id-";

  private static String cardId() {
    return CARD_ID_PREFIX + UUID.randomUUID();
  }

  public Keys keys() {
    return new Keys(id, parentReference, buildingId, type, 0, cardId());
  }

  public Keys keysWithHash(String cardId) {

    return new Keys(id, parentReference, buildingId, type, StringUtil.objHash(this), cardId);
  }

  public enum Type {
    BUILDING, RECEIPT
  }


  @Builder(toBuilder = true)
  public record Apt(String number, String name) {

  }

  @Builder
  public record Keys(
      long id,
      String parentReference,
      String buildingId,
      Type type,
      long hash,
      String cardId
  ) {

    public static Keys newBuilding(String buildingId) {
      return new Keys(0, buildingId, buildingId, Type.BUILDING, 0, ExtraCharge.cardId());
    }

    public static Keys newReceipt(long receiptId, String buildingId) {
      return new Keys(0, String.valueOf(receiptId), buildingId, Type.RECEIPT, 0, ExtraCharge.cardId());
    }

  }
}
