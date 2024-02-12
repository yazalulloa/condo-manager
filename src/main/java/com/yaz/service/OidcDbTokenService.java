package com.yaz.service;

import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import com.yaz.persistence.OidcDbTokenRepository;
import com.yaz.persistence.domain.OidcDbTokenQueryRequest;
import com.yaz.persistence.entities.OidcDbToken;
import com.yaz.resource.OidcDbTokenResource;
import com.yaz.resource.domain.response.OidcDbTokenTableResponse;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class OidcDbTokenService {

  private final OidcDbTokenRepository repository;


  public Uni<Long> count() {
    return repository.count();
  }

  public Uni<Integer> delete(String id) {
    return repository.delete(id);
  }

  public Uni<List<OidcDbToken>> list(OidcDbTokenQueryRequest queryRequest) {
    return repository.select(queryRequest);
  }

  public Uni<OidcDbTokenTableResponse> tableResponse(OidcDbTokenQueryRequest request) {

    final var actualLimit = request.limit() + 1;

    final var queryRequest = request.toBuilder()
        .limit(actualLimit)
        .build();
    return Uni.combine().all().unis(
        repository.count(),
        repository.select(queryRequest)
    ).with((totalCount, tokens) -> {

      final var results = tokens.stream()
          .map(OidcDbTokenTableResponse.Item::new)
          .collect(Collectors.toCollection(() -> new ArrayList<>(tokens.size())));
      
      String nextPageUrl = null;
      if (results.size() == actualLimit) {
        results.remove(results.size() - 1);
        results.trimToSize();

        final var last = results.getLast();

        nextPageUrl = OidcDbTokenResource.GRID_PATH + "?lastId=" + last.getToken().id();

      }

      return new OidcDbTokenTableResponse(totalCount, nextPageUrl, results);
    });
  }
}
