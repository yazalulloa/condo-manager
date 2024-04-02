package com.yaz.bean;

import io.vertx.rxjava3.core.Vertx;
import jakarta.inject.Singleton;
import jakarta.ws.rs.Produces;

public class VertxProvider {

  @Singleton
  @Produces
  Vertx rxVertx(io.vertx.mutiny.core.Vertx vertx) {
    return Vertx.newInstance(vertx.getDelegate());
  }
}
