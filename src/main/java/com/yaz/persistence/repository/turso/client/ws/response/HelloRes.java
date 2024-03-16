package com.yaz.persistence.repository.turso.client.ws.response;

public record HelloRes(String type, Error error) implements Response {

  public boolean isError() {
    return error != null;
  }
}
