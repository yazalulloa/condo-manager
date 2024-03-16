package com.yaz.persistence.repository.turso.client.ws.request;



public record ExecuteReq(String type, int streamId, Stmt stmt) implements Request {

  public static ExecuteReq create(int streamId, Stmt stmt) {
    return new ExecuteReq("execute", streamId, stmt);
  }
}
