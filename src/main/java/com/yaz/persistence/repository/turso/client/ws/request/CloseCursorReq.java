package com.yaz.persistence.repository.turso.client.ws.request;

public record CloseCursorReq(String type, int cursorId) implements Request {

  public static CloseCursorReq create(int requestId) {
    return new CloseCursorReq("close_cursor", requestId);
  }

}
