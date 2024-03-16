package com.yaz.persistence.repository.turso.client.ws.request;

public record BatchStep(BatchCond condition, Stmt stmt) {

  public static BatchStep stmt(Stmt stmt) {
    return new BatchStep(null, stmt);
  }

}
