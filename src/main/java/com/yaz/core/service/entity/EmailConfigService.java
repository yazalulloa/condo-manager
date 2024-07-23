package com.yaz.core.service.entity;

import com.yaz.api.domain.response.EmailConfigDto;
import com.yaz.api.domain.response.EmailConfigTableItem;
import com.yaz.api.domain.response.EmailConfigTableResponse;
import com.yaz.api.resource.EmailConfigResource;
import com.yaz.core.event.domain.EmailConfigDeleted;
import com.yaz.core.service.ListService;
import com.yaz.core.service.ListServicePagingProcessorImpl;
import com.yaz.core.service.gmail.GmailHelper;
import com.yaz.core.util.PagingProcessor;
import com.yaz.core.util.RxUtil;
import com.yaz.persistence.domain.query.EmailConfigQuery;
import com.yaz.persistence.entities.EmailConfig;
import com.yaz.persistence.repository.EmailConfigRepository;
import io.reactivex.rxjava3.core.Completable;
import io.reactivex.rxjava3.core.Maybe;
import io.reactivex.rxjava3.core.Single;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Event;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor
public class EmailConfigService {

  //private final Instance<EmailConfigRepository> repository;
  private final EmailConfigRepository repository;
  private final GmailHelper gmailHelper;
  private final Event<EmailConfigDeleted> emailConfigDeletedEvent;

  private EmailConfigRepository repository() {
    //return repository.get();
    return repository;
  }

  public Uni<EmailConfig> create(EmailConfig emailConfig) {
    return repository().create(emailConfig)
        .flatMap(i -> {
          if (i > 0) {
            return invalidateOne(emailConfig.id())
                .replaceWith(emailConfig);
          }
          return Uni.createFrom().item(emailConfig);
        });
  }

  //@CacheInvalidate(cacheName = EmailConfigCache.EXISTS)
  public Uni<Boolean> exists(String userId) {
    return repository().exists(userId);
  }

  //@CacheInvalidateAll(cacheName = EmailConfigCache.TOTAL_COUNT)
  //@CacheInvalidateAll(cacheName = EmailConfigCache.QUERY_COUNT)
  //@CacheInvalidate(cacheName = EmailConfigCache.EXISTS)
  public Uni<Void> invalidateOne(String id) {
    return invalidateGet(id);
  }

  //@CacheInvalidateAll(cacheName = EmailConfigCache.SELECT)
  //@CacheInvalidateAll(cacheName = EmailConfigCache.DIPLAY)
  //@CacheInvalidate(cacheName = EmailConfigCache.GET)
  //@CacheInvalidate(cacheName = EmailConfigCache.GET_ITEM)
  public Uni<Void> invalidateGet(String id) {
    return Uni.createFrom().voidItem();
  }

  //@CacheResult(cacheName = EmailConfigCache.TOTAL_COUNT, lockTimeout = Constants.CACHE_TIMEOUT)
  public Uni<Long> count() {
    return repository().count();
  }

  //@CacheResult(cacheName = EmailConfigCache.SELECT, lockTimeout = Constants.CACHE_TIMEOUT)
  public Uni<List<EmailConfig>> list(EmailConfigQuery query) {
    return repository().select(query);
  }

  public Uni<EmailConfigTableResponse> table(EmailConfigQuery query) {
    final var actualLimit = query.limit() + 1;
    return Uni.combine().all()
        .unis(count(), list(query.toBuilder()
            .limit(actualLimit)
            .build()))
        .with((totalCount, list) -> {
          final var results = list.stream()
              .map(EmailConfigTableItem::ofItem)
              .collect(Collectors.toCollection(() -> new ArrayList<>(list.size())));

          String nextPageUrl = null;
          if (results.size() == actualLimit) {

            results.removeLast();
            results.trimToSize();

            final var last = results.getLast();

            nextPageUrl = EmailConfigResource.PATH;
            nextPageUrl += "?lastId=" + last.item().id();

            if (query.user() != null) {
              nextPageUrl += "&user=" + query.user();
            }
          }

          return EmailConfigTableResponse.builder()
              .totalCount(totalCount)
              .nextPageUrl(nextPageUrl)
              .results(results)
              .build();
        });
  }


  public Uni<Integer> delete(String id) {
    gmailHelper.clearFlow(id);
    return repository().delete(id)
        .flatMap(i -> invalidateOne(id)
            .replaceWith(i))
        .eventually(
            () -> Uni.createFrom().completionStage(emailConfigDeletedEvent.fireAsync(new EmailConfigDeleted(id))));
  }

  //@CacheResult(cacheName = EmailConfigCache.GET_ITEM, lockTimeout = Constants.CACHE_TIMEOUT)
  public Uni<Optional<EmailConfigTableItem>> readItem(String id) {
    return repository().readWithUser(id);
  }

  public Uni<EmailConfig> update(EmailConfig emailConfig) {

    return repository().update(emailConfig)
        .flatMap(i -> {
          if (i > 0) {
            return invalidateGet(emailConfig.id())
                .replaceWith(emailConfig);
          }
          return Uni.createFrom().item(emailConfig);
        });
  }

  public PagingProcessor<List<EmailConfig>> pagingProcessor(int pageSize) {
    return new ListServicePagingProcessorImpl<>(new ListService<>() {
      @Override
      public Single<List<EmailConfig>> listByQuery(EmailConfigQuery query) {
        return RxUtil.single(list(query));
      }

      @Override
      public EmailConfigQuery nextQuery(List<EmailConfig> list, EmailConfigQuery query) {
        if (list.isEmpty()) {
          return query;
        }

        return query.toBuilder()
            .lastId(list.getLast().id())
            .build();
      }
    }, EmailConfigQuery.builder().limit(pageSize).build());
  }


  //@CacheResult(cacheName = EmailConfigCache.DIPLAY, lockTimeout = Constants.CACHE_TIMEOUT)
  public Uni<List<EmailConfigDto>> displayList() {
    return repository().displayList();
  }

  public Single<byte[]> getFile(String userId) {
    return RxUtil.toMaybe(repository().getFile(userId))
        .flatMap(Maybe::fromOptional)
        .toSingle();
  }

  public Completable updateLastCheck(String userId, boolean hasRefreshToken, Long expiresIn) {
    return RxUtil.completable(repository().updateLastCheck(userId, hasRefreshToken, expiresIn));
  }

  public Uni<List<EmailConfig>> selectByEmail(String email, String id) {
    return repository().selectByEmail(email, id);
  }
}
