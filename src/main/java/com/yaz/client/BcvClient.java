package com.yaz.client;

import io.reactivex.rxjava3.core.Single;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.Response;
import java.util.concurrent.atomic.AtomicBoolean;
import lombok.extern.slf4j.Slf4j;
import com.yaz.util.RxUtil;
import org.eclipse.microprofile.rest.client.inject.RestClient;

@Slf4j
@ApplicationScoped
public class BcvClient {

  private final RestBcvClient bcvClient;
  private final AlternateBcvClient alternateBcvClient;
  private final AtomicBoolean useAlternate = new AtomicBoolean(true);

  @Inject
  public BcvClient(@RestClient RestBcvClient bcvClient, AlternateBcvClient alternateBcvClient) {
    this.bcvClient = bcvClient;
    this.alternateBcvClient = alternateBcvClient;
  }

  public Single<Response> get() {
    return Single.defer(() -> {
      if (useAlternate.get()) {
        return alternateBcvClient.get();
      } else {
        return RxUtil.single(bcvClient.getBcv())
            .doOnError(throwable -> {
              log.error("ERROR GET BCV", throwable);
              useAlternate.set(true);
            })
            .onErrorResumeWith(alternateBcvClient.get());
      }
    }).doOnError(throwable -> log.error("ERROR GET BCV", throwable));
  }

  public Single<Response> head() {

    return Single.defer(() -> {
      if (useAlternate.get()) {
        return alternateBcvClient.head();
      } else {
        return RxUtil.single(bcvClient.headBcv())
            .doOnError(throwable -> {
              log.error("ERROR HEAD BCV", throwable);
              useAlternate.set(true);
            })
            .onErrorResumeWith(alternateBcvClient.head());
      }
    }).doOnError(throwable -> log.error("ERROR HEAD BCV", throwable));
  }
}
