package com.yaz.persistence.repository.turso.client.ws.request;

public record CloseStreamReq(String type, int streamId) implements Request {


  public static CloseStreamReq create(int streamId) {
    return new CloseStreamReq("close_stream", streamId);
  }

}
