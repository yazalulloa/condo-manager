package com.yaz.persistence.repository.turso.client.ws.request;

public record SequenceReq(String type, int streamId, String sql, int sqlId) implements Request {

    public static SequenceReq create(int streamId, String sql, int sqlId) {
      return new SequenceReq("sequence", streamId, sql, sqlId);
    }

}
