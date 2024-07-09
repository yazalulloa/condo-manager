package com.yaz.core.bcv;

import io.reactivex.rxjava3.core.Single;
import jakarta.ws.rs.core.Response;

public interface BcvClient {

  Single<Response> get();

  Single<Response> head();
}
