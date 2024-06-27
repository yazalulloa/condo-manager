package com.yaz.api.domain.response;

import lombok.Builder;

@Builder(toBuilder = true)
public record AptCountersDto(long totalCount, Long queryCount) {

  public AptCountersDto minusOne() {
    return new AptCountersDto(totalCount - 1, queryCount - 1);
  }
}
