package com.yaz.persistence.repository.turso.client.ws.request;

public record RequestMsg(String type, int requestId, Request request) {

  public static RequestMsg create(int requestId, Request request) {
    return new RequestMsg("request", requestId, request);
  }

}
