package com.yaz.persistence.repository.turso.client.ws.request;

public record HelloMsg(String type, String jwt) {

  public static HelloMsg create(String jwt) {
    return new HelloMsg("hello", jwt);
  }

}
