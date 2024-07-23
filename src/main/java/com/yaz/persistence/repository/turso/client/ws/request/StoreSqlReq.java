package com.yaz.persistence.repository.turso.client.ws.request;

public record StoreSqlReq(String type, int sqlId, String sql) implements Request {

  public static StoreSqlReq create(int sqlId, String sql) {
    return new StoreSqlReq("store_sql", sqlId, sql);
  }

}
