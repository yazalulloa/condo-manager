package com.yaz.persistence.repository;

import com.yaz.persistence.domain.IdentityProvider;
import com.yaz.persistence.domain.query.UserQuery;
import com.yaz.persistence.entities.User;
import io.smallrye.mutiny.Uni;
import java.util.List;
import java.util.Optional;

public interface UserRepository {

  Uni<Long> count();

  Uni<Integer> delete(String id);

  Uni<Optional<String>> getIdFromProvider(IdentityProvider provider, String providerId);

  Uni<Integer> updateLastLoginAt(String id);

  Uni<String> save(User user);

  Uni<List<User>> select(UserQuery query);
}
