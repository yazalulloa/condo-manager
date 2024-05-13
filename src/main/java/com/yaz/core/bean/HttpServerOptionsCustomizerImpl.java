package com.yaz.core.bean;

import io.netty.handler.codec.compression.StandardCompressionOptions;
import io.quarkus.vertx.http.HttpServerOptionsCustomizer;
import io.vertx.core.http.HttpServerOptions;
import jakarta.inject.Singleton;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Singleton
public class HttpServerOptionsCustomizerImpl implements HttpServerOptionsCustomizer {

  @Override
  public void customizeHttpServer(HttpServerOptions options) {
    addCompressors(options);
  }

  @Override
  public void customizeHttpsServer(HttpServerOptions options) {
    addCompressors(options);
  }

  @Override
  public void customizeDomainSocketServer(HttpServerOptions options) {
    addCompressors(options);
  }

  private void addCompressors(HttpServerOptions options) {

    options.addCompressor(StandardCompressionOptions.gzip())
        .addCompressor(StandardCompressionOptions.brotli())
        .addCompressor(StandardCompressionOptions.deflate())
        .addCompressor(StandardCompressionOptions.zstd());

  }
}
