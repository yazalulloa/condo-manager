package com.yaz.core.bcv;

import com.yaz.core.util.rx.RetryWithDelay;
import io.reactivex.rxjava3.core.Single;
import io.vertx.core.file.OpenOptions;
import io.vertx.core.http.HttpMethod;
import io.vertx.ext.web.client.WebClientOptions;
import io.vertx.rxjava3.core.Vertx;
import io.vertx.rxjava3.core.buffer.Buffer;
import io.vertx.rxjava3.ext.web.client.HttpRequest;
import io.vertx.rxjava3.ext.web.client.HttpResponse;
import io.vertx.rxjava3.ext.web.client.WebClient;
import io.vertx.rxjava3.ext.web.codec.BodyCodec;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.Response;
import lombok.extern.slf4j.Slf4j;
import org.eclipse.microprofile.config.inject.ConfigProperty;

@Slf4j
@ApplicationScoped
public class AlternateBcvClient implements BcvClient {

  private final String url;
  private final Vertx vertx;
  private final WebClient client;

  private final HttpRequest<Buffer> bcvGet;
  private final HttpRequest<Buffer> bcvHead;

  @Inject
  public AlternateBcvClient(Vertx vertx, @ConfigProperty(name = "quarkus.rest-client.bcv-api.url") String url) {

    final var options = new WebClientOptions()
        .setReuseAddress(true)
        .setReusePort(true)
        .setProtocolVersion(io.vertx.core.http.HttpVersion.HTTP_2)
        .setSsl(false)
        .setUseAlpn(true)
        .setHttp2ClearTextUpgrade(true)
        .setTrustAll(true)
        .setVerifyHost(false)
        .setKeepAlive(true)
        .setDecompressionSupported(true)
        .setMetricsName("HTTP_TRUST_ALL_CLIENT_BCV")
        .setShared(true)
        .setName("HTTP_TRUST_ALL_CLIENT_BCV");

    this.client = WebClient.create(vertx, options);
    this.url = url;
    this.vertx = vertx;
    this.bcvGet = abs(HttpMethod.GET);
    this.bcvHead = abs(HttpMethod.HEAD);
  }

  public Single<Response> get() {
    if (bcvGet != null) {
      return responseSend(bcvGet);
    }

    return bcv(HttpMethod.GET);
  }

  public Single<Response> head() {
    if (bcvHead != null) {
      return responseSend(bcvHead);
    }

    return bcv(HttpMethod.HEAD);
  }

  private HttpRequest<Buffer> abs(HttpMethod httpMethod) {
    return client.requestAbs(httpMethod, url);
  }

  public Single<Response> bcv(HttpMethod httpMethod) {
    return responseSend(client.requestAbs(httpMethod, url));
  }

  public Single<Response> responseSend(HttpRequest<Buffer> request) {
    return send(request)
        .map(res -> {

          final var responseBuilder = Response.status(res.statusCode())
              .entity(res.bodyAsString());

          res.headers().forEach(header -> responseBuilder.header(header.getKey(), header.getValue()));

          return responseBuilder.build();
        });

  }

  public Single<HttpResponse<Buffer>> get(String requestUri) {

    return client.get(url.replace("https://", ""), requestUri)
        .ssl(false)
        .send()
        .doOnError(throwable -> log.error("GET_BCV_HTTP_ERROR", throwable))
        .retryWhen(RetryWithDelay.retryIfFailedNetwork());
  }

  public Single<HttpResponse<Buffer>> headAbs(String url) {
    return send(client.headAbs(url));
  }

  private Single<HttpResponse<Buffer>> send(HttpRequest<Buffer> request) {
    return request
        .send()
        .doOnError(throwable -> log.error("SEND_REQUEST_BCV_HTTP_ERROR", throwable))
        .retryWhen(RetryWithDelay.retryIfFailedNetwork());
  }

  public Single<HttpResponse<Void>> download(String path, String requestUri) {

    return vertx.fileSystem().open(path, new OpenOptions().setWrite(true).setCreate(true))
        .flatMap(asyncFile -> {
          log.debug("Downloading file: {}", requestUri);
          return client.getAbs(requestUri)
              .as(BodyCodec.pipe(asyncFile))
              .send()
              .doOnError(throwable -> log.error("BCV_HTTP_ERROR {}", requestUri, throwable))
              .retryWhen(RetryWithDelay.retryIfFailedNetwork())
              .doOnSuccess(s -> log.debug("Downloaded file: {}", path))
              ;
        });


  }

}
