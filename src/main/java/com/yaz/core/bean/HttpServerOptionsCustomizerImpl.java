package com.yaz.core.bean;

import io.netty.handler.codec.compression.StandardCompressionOptions;
import io.quarkus.vertx.http.HttpServerOptionsCustomizer;
import io.vertx.core.http.HttpServerOptions;
import jakarta.inject.Singleton;

@Singleton
public class HttpServerOptionsCustomizerImpl implements HttpServerOptionsCustomizer {

  @Override
  public void customizeHttpServer(HttpServerOptions options) {
    options.addCompressor(StandardCompressionOptions.gzip())
        .addCompressor(StandardCompressionOptions.brotli())
        .addCompressor(StandardCompressionOptions.deflate())
        .addCompressor(StandardCompressionOptions.zstd());
  }

  @Override
  public void customizeHttpsServer(HttpServerOptions options) {
    options.addCompressor(StandardCompressionOptions.gzip())
        .addCompressor(StandardCompressionOptions.brotli())
        .addCompressor(StandardCompressionOptions.deflate())
        .addCompressor(StandardCompressionOptions.zstd());
  }

  @Override
  public void customizeDomainSocketServer(HttpServerOptions options) {
    options.addCompressor(StandardCompressionOptions.gzip())
        .addCompressor(StandardCompressionOptions.brotli())
        .addCompressor(StandardCompressionOptions.deflate())
        .addCompressor(StandardCompressionOptions.zstd());
  }
}
