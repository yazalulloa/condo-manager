package com.yaz.service;


import com.yaz.persistence.domain.OidcDbTokenQueryRequest;
import com.yaz.persistence.entities.OidcDbToken;
import com.yaz.persistence.repository.OidcDbTokenRepository;
import com.yaz.resource.OidcDbTokenResource;
import com.yaz.resource.domain.response.OidcDbTokenTableResponse;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.inject.Instance;
import jakarta.inject.Inject;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class OidcDbTokenService {

  private final Instance<OidcDbTokenRepository> repository;

  private OidcDbTokenRepository repository() {
    return repository.get();
  }


  public Uni<Long> count() {
    return repository().count();
  }

  public Uni<Integer> delete(String id) {
    return repository().delete(id);
  }

  public Uni<List<OidcDbToken>> list(OidcDbTokenQueryRequest queryRequest) {
    return repository().select(queryRequest);
  }

  public Uni<Integer> updateUserId(String id, String userId) {
    return repository().updateUserId(id, userId);
  }

  public Uni<OidcDbTokenTableResponse> tableResponse(OidcDbTokenQueryRequest request) {

    final var actualLimit = request.limit() + 1;

    final var queryRequest = request.toBuilder()
        .limit(actualLimit)
        .build();
    return Uni.combine().all().unis(
        count(),
        list(queryRequest)
    ).with((totalCount, tokens) -> {

      final var results = tokens.stream()
          .map(OidcDbTokenTableResponse.Item::new)
          .collect(Collectors.toCollection(() -> new ArrayList<>(tokens.size())));

      String nextPageUrl = null;
      if (results.size() == actualLimit) {
        results.removeLast();
        results.trimToSize();

        final var last = results.getLast();

        nextPageUrl = OidcDbTokenResource.GRID_PATH + "?lastId=" + last.getToken().id();

      }

      return new OidcDbTokenTableResponse(totalCount, nextPageUrl, results);
    });
  }

  public Uni<Integer> deleteByUser(String id) {
    return repository().deleteByUser(id);
  }

  public Uni<Integer> insert(String idToken, String accessToken, String refreshToken, long expiresIn, String id) {
    return repository().insert(idToken, accessToken, refreshToken, expiresIn, id);
  }

  public Uni<Optional<OidcDbToken>> read(String id) {
    return repository().read(id);
  }

  public Uni<Integer> deleteIfExpired(long expiresIn) {
    return repository().deleteIfExpired(expiresIn);
  }
}
