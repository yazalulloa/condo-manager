package com.yaz.persistence.repository;

import com.yaz.persistence.domain.OidcDbTokenQueryRequest;
import com.yaz.persistence.entities.OidcDbToken;
import io.smallrye.mutiny.Uni;
import java.util.List;
import java.util.Optional;

public interface OidcDbTokenRepository {

  Uni<Long> count();

  Uni<List<OidcDbToken>> select(OidcDbTokenQueryRequest queryRequest);

  Uni<Integer> delete(String id);

  Uni<Integer> updateUserId(String id, String userId);

  Uni<Integer> deleteByUser(String id);

  Uni<Integer> insert(String idToken, String accessToken, String refreshToken, long expiresIn, String id);

  Uni<Optional<OidcDbToken>> read(String id);

  Uni<Integer> deleteIfExpired(long expiresIn);
}
