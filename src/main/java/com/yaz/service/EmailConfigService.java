package com.yaz.service;

import com.yaz.bean.GmailHelper;
import com.yaz.persistence.EmailConfigRepository;
import com.yaz.persistence.domain.EmailConfigUser;
import com.yaz.persistence.domain.query.EmailConfigQuery;
import com.yaz.persistence.entities.EmailConfig;
import com.yaz.resource.EmailConfigResource;
import com.yaz.resource.domain.response.EmailConfigTableItem;
import com.yaz.resource.domain.response.EmailConfigTableResponse;
import com.yaz.util.PagingProcessor;
import com.yaz.util.RxUtil;
import io.reactivex.rxjava3.core.Completable;
import io.reactivex.rxjava3.core.Maybe;
import io.reactivex.rxjava3.core.Observable;
import io.reactivex.rxjava3.core.Single;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.io.File;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class EmailConfigService {

  private final EmailConfigRepository repository;
  private final GmailHelper gmailHelper;

  public Uni<EmailConfig> create(EmailConfig emailConfig) {
    return repository.exists(emailConfig.userId())
        .flatMap(bool -> {
          if (bool) {
            log.info("Config already exists: {}", emailConfig.userId());
            return Uni.createFrom().item(emailConfig);
          }
          return repository.create(emailConfig)
              //.onItem().invoke(r -> log.info("EmailConfigService.create: {}", r))
              .replaceWith(emailConfig);
        });
  }

  public Uni<List<EmailConfig>> all() {
    return repository.all();
  }

  public Uni<Long> count() {
    return repository.count();
  }

  public Uni<List<EmailConfigUser>> list(EmailConfigQuery query) {
    return repository.select(query);
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
            nextPageUrl += "?lastId=" + last.getItem().emailConfig().userId();

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
    return repository.delete(id);
  }

  public Uni<Optional<EmailConfig>> read(String id) {
    return repository.read(id);
  }

  public Uni<Optional<EmailConfigTableItem>> readItem(String id) {
    return repository.readWithUser(id);
  }

  public Uni<EmailConfig> update(EmailConfig emailConfig) {

    return repository.update(emailConfig)
        //.onItem().invoke(r -> log.info("EmailConfigService.update: {}", r))
        .replaceWith(emailConfig);
  }

  public Uni<EmailConfig> check(EmailConfig config) {
    return update(gmailHelper.check(config));
  }

  public Uni<EmailConfigTableItem> check(EmailConfigTableItem item) {
    if (item.getItem().shouldGetNewOne()) {
      return Uni.createFrom().item(item);
    }

    return check(item.getItem().emailConfig())
        .map(emailConfig -> emailConfig.toBuilder()
            .file(null)
            .build())
        .map(emailConfig -> EmailConfigTableItem.ofItem(new EmailConfigUser(item.getItem().user(), emailConfig)));
  }


  public Maybe<EmailConfigTableItem> loadItem(String id) {
    return RxUtil.single(readItem(id))
        .flatMapMaybe(Maybe::fromOptional)
        .map(this::check)
        .flatMapSingle(RxUtil::single)
        .switchIfEmpty(Maybe.defer(() -> {
          gmailHelper.clearFlow(id);
          return Maybe.empty();
        }));
  }

  public PagingProcessor<List<EmailConfigUser>> pagingProcessor(int pageSize) {
    return new ListServicePagingProcessorImpl<>(new ListService<>() {
      @Override
      public Single<List<EmailConfigUser>> listByQuery(EmailConfigQuery query) {
        return RxUtil.single(list(query));
      }

      @Override
      public EmailConfigQuery nextQuery(List<EmailConfigUser> list, EmailConfigQuery query) {
        if (list.isEmpty()) {
          return query;
        }

        return query.toBuilder()
            .lastId(list.getLast().emailConfig().userId())
            .build();
      }
    }, EmailConfigQuery.builder().limit(pageSize).build());
  }

  public Completable checkAll() {
    final var ids = new HashSet<String>();
    return RxUtil.paging(pagingProcessor(1), list -> {
      return Observable.fromIterable(list)
          .flatMapCompletable(emailConfigUser -> {
            ids.add(emailConfigUser.emailConfig().userId());

            if (emailConfigUser.shouldGetNewOne()) {
              return Completable.complete();
            }

            final var emailConfig = emailConfigUser.emailConfig();
            return RxUtil.single(check(emailConfig))
                .doOnError(throwable -> log.error("ERROR with config {}", emailConfig.userId(), throwable))
                .ignoreElement()
                .onErrorComplete();
          });
    }).doOnComplete(() -> {

      log.info("CHECK_ALL_DONE {}", ids.size());
      deleteNotFound(ids);
    });
  }

  private void deleteNotFound(Collection<String> list) {

    try {

      final var dir = new File(GmailHelper.DIR);
      final var listFiles = dir.listFiles();
      if (listFiles != null) {
        for (File file : listFiles) {
          if (file.isDirectory() && !list.contains(file.getName())) {
            log.info("DELETE {}", file.getName());
            gmailHelper.clearFlow(file.getName());
          }
        }
      }

    } catch (Exception e) {
      log.error("Error deleting", e);
    }

  }
}
