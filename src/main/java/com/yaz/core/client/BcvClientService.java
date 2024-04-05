package com.yaz.core.client;

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

//  public Single<Response> get() {
//    return Single.defer(() -> {
//      if (useAlternate.get()) {
//        return alternateBcvClient.get();
//      } else {
//        return restBcvClient.get()
//            .doOnError(throwable -> {
//              log.error("ERROR GET BCV", throwable);
//              useAlternate.set(true);
//            })
//            .onErrorResumeWith(alternateBcvClient.get());
//      }
//    }).doOnError(throwable -> log.error("ERROR GET BCV", throwable));
//  }

//  public Single<Response> head() {
//
//    return Single.defer(() -> {
//      if (useAlternate.get()) {
//        return alternateBcvClient.head();
//      } else {
//        return restBcvClient.head()
//            .doOnError(throwable -> {
//              log.error("ERROR HEAD BCV", throwable);
//              useAlternate.set(true);
//            })
//            .onErrorResumeWith(alternateBcvClient.head());
//      }
//    }).doOnError(throwable -> log.error("ERROR HEAD BCV", throwable));
//  }
}
