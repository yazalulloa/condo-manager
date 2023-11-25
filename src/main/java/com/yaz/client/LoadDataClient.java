package com.yaz.client;

import io.smallrye.mutiny.Uni;
import io.vertx.core.file.OpenOptions;
import io.vertx.core.http.HttpClientOptions;
import io.vertx.core.http.HttpMethod;
import io.vertx.mutiny.core.Vertx;
import io.vertx.mutiny.core.http.HttpClient;
import io.vertx.mutiny.core.http.HttpClientRequest;
import io.vertx.mutiny.core.streams.Pump;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.io.File;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
public class LoadDataClient {

  private final Vertx vertx;
  private final HttpClient client;
  private final Uni<HttpClientRequest> getRequest;

  @Inject
  public LoadDataClient(Vertx vertx) {
    final var options = new HttpClientOptions()
        .setReuseAddress(true)
        .setReusePort(true)
        .setProtocolVersion(io.vertx.core.http.HttpVersion.HTTP_2)
        .setUseAlpn(true)
        .setHttp2ClearTextUpgrade(true)
        .setKeepAlive(true)
        .setTryUseCompression(true)
        .setMetricsName("LOAD_DATA_CLIENT")
        .setShared(true)
        .setName("LOAD_DATA_CLIENT")
        .setDefaultHost("localhost")
        .setDefaultPort(8090);

    this.vertx = vertx;
    this.client = vertx.createHttpClient(options);
    this.getRequest = client.request(HttpMethod.GET, 8090, "http://localhost", "/0570b232-ab43-4242-8a9e-d5f035ef7580/backup");
  }

  public Uni<String> loadBackup() {
    return getRequest
        .flatMap(HttpClientRequest::send)
        .flatMap(response -> {

          if (response.statusCode() == 200) {

            final var path = "tmp/backup.tar.gz";
            final var file = new File(path);
            vertx.fileSystem().mkdirs("tmp")
                .replaceWith(vertx.fileSystem().open(file.getAbsolutePath(), new OpenOptions()))
                .flatMap(asyncFile -> {

                  return Uni.createFrom().emitter(emitter -> {
                    Pump pump = Pump.pump(response, asyncFile);
                    pump.start();
                    response.endHandler(() -> {
                      asyncFile.close();
                      emitter.complete(path);
                    });
                  });
                });
          }

          return Uni.createFrom().failure(new RuntimeException("Error loading backup " + response.statusCode()));
        });
  }
}
