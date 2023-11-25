package com.yaz.client;

import io.reactivex.rxjava3.core.Single;
import io.vertx.core.http.HttpMethod;
import io.vertx.ext.web.client.WebClientOptions;
import io.vertx.mutiny.core.Vertx;
import io.vertx.mutiny.ext.web.client.WebClient;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.Response;
import lombok.extern.slf4j.Slf4j;
import com.yaz.util.RxUtil;
import com.yaz.util.rx.RetryWithDelay;
import org.eclipse.microprofile.config.inject.ConfigProperty;

@Slf4j
@ApplicationScoped
public class AlternateBcvClient {

  private final String url;
  private final WebClient client;

  @Inject
  public AlternateBcvClient(Vertx vertx, @ConfigProperty(name = "quarkus.rest-client.bcv-api.url") String url) {

    final var options = new WebClientOptions()
        .setReuseAddress(true)
        .setReusePort(true)
        .setProtocolVersion(io.vertx.core.http.HttpVersion.HTTP_2)
        .setSsl(true)
        .setUseAlpn(true)
        .setHttp2ClearTextUpgrade(true)
        .setTrustAll(true)
        .setVerifyHost(false)
        .setKeepAlive(true)
        .setTryUseCompression(true)
        .setMetricsName("HTTP_TRUST_ALL_CLIENT_BCV")
        .setShared(true)
        .setName("HTTP_TRUST_ALL_CLIENT_BCV");

    this.client = WebClient.create(vertx, options);
    this.url = url;
  }

  public Single<Response> get() {
    return bcv(HttpMethod.GET);
  }

  public Single<Response> head() {
    return bcv(HttpMethod.HEAD);
  }

  public Single<Response> bcv(HttpMethod httpMethod) {

    return RxUtil.single(client.requestAbs(httpMethod, url).send())
        .doOnError(throwable -> log.error("BCV_HTTP_ERROR", throwable))
        .retryWhen(RetryWithDelay.retryIfFailedNetwork())
        .map(res -> {

          final var responseBuilder = Response.status(res.statusCode())
              .entity(res.bodyAsString());

          res.headers().forEach(header -> responseBuilder.header(header.getKey(), header.getValue()));

          return responseBuilder.build();
        });
  }

}
