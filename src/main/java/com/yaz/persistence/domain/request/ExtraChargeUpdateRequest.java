package com.yaz.persistence.domain.request;

import com.yaz.persistence.domain.Currency;
import java.util.Set;
import lombok.Builder;

@Builder(toBuilder = true)
public record ExtraChargeUpdateRequest(
    String parentReference,
    String buildingId,
    long id,
    String description,
    double amount,
    Currency currency,
    boolean active,
    Set<String> apartments) {

}
