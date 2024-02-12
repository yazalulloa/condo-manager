package com.yaz.service;

import com.yaz.persistence.UserRepository;
import com.yaz.persistence.domain.query.UserQuery;
import com.yaz.persistence.entities.User;
import com.yaz.resource.UserResource;
import com.yaz.resource.domain.response.UserTableResponse;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class UserService {

  private final UserRepository repository;

  public Uni<Long> count() {
    return repository.count();
  }

  public Uni<Void> saveIfExists(User user) {

    return repository.getIdFromProvider(user.provider(), user.providerId())
        .flatMap(userId -> {
          if (userId != null) {
            // log.info("User already exists {} {}",userId, user.providerId());
            return repository.updatelastLoginAt(userId)
                .replaceWithVoid();
          }
          return repository.insert(user)
              .replaceWithVoid();
        });
  }

  public Uni<List<User>> list(UserQuery userQuery) {
    return repository.select(userQuery);
  }

  public Uni<UserTableResponse> table(UserQuery userQuery) {
    final var actualLimit = userQuery.limit() + 1;
    return Uni.combine().all()
        .unis(count(), list(userQuery.toBuilder()
            .limit(actualLimit)
            .build()))
        .with((totalCount, list) -> {
          final var results = list.stream()
              .map(UserTableResponse.Item::new)
              .collect(Collectors.toCollection(() -> new ArrayList<>(list.size())));

          String nextPageUrl = null;
          if (results.size() == actualLimit) {

            results.removeLast();
            results.trimToSize();

            final var last = results.getLast();

            nextPageUrl = UserResource.PATH;
            nextPageUrl += "?lastId=" + last.getUser().id();

            if (userQuery.identityProvider() != null) {
              nextPageUrl += "&identityProvider=" + userQuery.identityProvider();
            }

            if (userQuery.q() != null) {
              nextPageUrl += "&q=" + userQuery.q();
            }
          }

          return UserTableResponse.builder()
              .totalCount(totalCount)
              .nextPageUrl(nextPageUrl)
              .results(results)
              .build();
        });
  }

  public Uni<Integer> delete(String id) {
    return repository.delete(id);
  }
}
