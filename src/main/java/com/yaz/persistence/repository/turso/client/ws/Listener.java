package com.yaz.persistence.repository.turso.client.ws;

import io.vertx.core.AsyncResult;
import io.vertx.core.Handler;
import java.util.List;

public record Listener(int[] requests, Handler<AsyncResult<List<TursoResult>>> handler) {


}
