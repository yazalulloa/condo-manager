package com.yaz.core.client;

import io.reactivex.rxjava3.core.Single;
import io.smallrye.mutiny.Uni;
import jakarta.ws.rs.core.Response;

public interface BcvClient {
  Single<Response> get();
  Single<Response> head();
}
