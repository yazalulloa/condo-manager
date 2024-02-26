package com.yaz.client;

import com.yaz.util.RxUtil;
import io.reactivex.rxjava3.core.Single;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.core.Response;
import lombok.extern.slf4j.Slf4j;
import org.eclipse.microprofile.rest.client.inject.RestClient;

@Slf4j
@ApplicationScoped
public class RestBcvClientWrapper implements BcvClient {

  private final RestBcvClient client;

  public RestBcvClientWrapper(@RestClient RestBcvClient client) {
    this.client = client;
  }

  @Override
  public Single<Response> get() {
    return RxUtil.single(client.getBcv());
  }

  @Override
  public Single<Response> head() {
    return RxUtil.single(client.headBcv());
  }
}
