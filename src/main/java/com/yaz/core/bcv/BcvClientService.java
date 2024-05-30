package com.yaz.core.bcv;

import io.reactivex.rxjava3.core.Single;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.Response;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.function.Function;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
public class BcvClientService {

  private final RestBcvClientWrapper restBcvClient;
  private final AlternateBcvClient alternateBcvClient;
  private static final AtomicBoolean USE_ALTERNATE = new AtomicBoolean(true);

  @Inject
  public BcvClientService(RestBcvClientWrapper restBcvClient, AlternateBcvClient alternateBcvClient) {
    this.restBcvClient = restBcvClient;
    this.alternateBcvClient = alternateBcvClient;
  }

  private BcvClient bcvClient() {
    return USE_ALTERNATE.get() ? alternateBcvClient : restBcvClient;
  }

  private Single<Response> clientResponse(Function<BcvClient, Single<Response>> function) {

    return function.apply(bcvClient())
        .doOnError(throwable -> {
          log.error("ERROR BCV", throwable);
          USE_ALTERNATE.set(!USE_ALTERNATE.get());
        })
        .onErrorResumeWith(function.apply(bcvClient()));
  }

  public Single<Response> get() {
    return clientResponse(BcvClient::get);
  }

  public Single<Response> head() {
    return clientResponse(BcvClient::head);
  }

  public Single<BcvCheck> bcvCheck() {
    return head()
        .map(response -> {
          final var etag = response.getHeaderString("etag");
          final var lastModified = response.getHeaderString("last-modified");

          return new BcvCheck(etag, lastModified);
        });
  }
}
