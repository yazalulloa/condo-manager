package com.yaz.api.domain.response;

import lombok.Builder;

@Builder(toBuilder = true)
public record EmailConfigDto(
    String id,
    String email,
    String username,
    String name,
    String picture) {

}
