package com.yaz.core.service.entity;

import com.yaz.api.domain.response.UserTableResponse;
import com.yaz.api.resource.UserResource;
import com.yaz.core.event.domain.UserDeleted;
import com.yaz.core.service.EncryptionService;
import com.yaz.core.service.entity.cache.UserCache;
import com.yaz.core.util.Constants;
import com.yaz.persistence.domain.IdentityProvider;
import com.yaz.persistence.domain.query.UserQuery;
import com.yaz.persistence.entities.User;
import com.yaz.persistence.repository.UserRepository;
import io.quarkus.cache.CacheInvalidate;
import io.quarkus.cache.CacheInvalidateAll;
import io.quarkus.cache.CacheResult;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Event;
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
public class UserService {

  //private final Instance<UserRepository> repository;
  private final EncryptionService encryptionService;
  private final UserRepository repository;
  private final Event<UserDeleted> userDeletedEvent;


  private UserRepository repository() {
    //return repository.get();
    return repository;
  }

  public Uni<Long> count() {
    return repository().count();
  }

  @CacheInvalidate(cacheName = UserCache.GET_ID_FROM_PROVIDER)
  public Uni<Void> invalidateGetIdFromProvider(IdentityProvider provider, String providerId) {
    return Uni.createFrom().voidItem();
  }

  @CacheResult(cacheName = UserCache.GET_ID_FROM_PROVIDER, lockTimeout = Constants.CACHE_TIMEOUT)
  public Uni<Optional<String>> getIdFromProvider(IdentityProvider provider, String providerId) {
    return repository().getIdFromProvider(provider, providerId);
  }

  public Uni<String> saveIfExists(User user) {

    return repository().getIdFromProvider(user.provider(), user.providerId())
        .flatMap(optional -> {

          if (optional.isPresent()) {
            final var userId = optional.get();
            log.info("User already exists {} {}", userId, user.providerId());
            return repository().updateLastLoginAt(userId)
                .replaceWith(userId);
          }

          return save(user);
        });
  }


  public Uni<String> save(User user) {
    return repository().save(user)
        .flatMap(id -> invalidateGetIdFromProvider(user.provider(), user.providerId()).replaceWith(id))
        .invoke(id -> log.info("User inserted {}", id));
  }

  public Uni<List<User>> list(UserQuery userQuery) {
    return repository().select(userQuery);
  }

  public Uni<UserTableResponse> table(UserQuery userQuery) {
    final var actualLimit = userQuery.limit() + 1;
    return Uni.combine().all()
        .unis(count(), list(userQuery.toBuilder()
            .limit(actualLimit)
            .build()))
        .with((totalCount, list) -> {
          final var results = list.stream()
              .map(user -> {
                return UserTableResponse.Item.builder()
                    .key(encryptionService.encrypt(user.id()))
                    .user(user)
                    .build();
              })
              .collect(Collectors.toCollection(() -> new ArrayList<>(list.size())));

          String nextPageUrl = null;
          if (results.size() == actualLimit) {

            results.removeLast();
            results.trimToSize();

            final var last = results.getLast();

            nextPageUrl = UserResource.PATH;
            nextPageUrl += "?lastId=" + last.user().id();

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

  @CacheInvalidateAll(cacheName = UserCache.GET_ID_FROM_PROVIDER)
  public Uni<Integer> delete(String id) {
    return repository().delete(id)
        .onItem()
        .invoke(() -> userDeletedEvent.fireAsync(new UserDeleted(id)));
  }

  public Uni<Optional<User>> read(String userId) {
    return repository().read(userId);
  }

  public Uni<Boolean> exists(String userId) {
    return repository().exists(userId);
  }
}
