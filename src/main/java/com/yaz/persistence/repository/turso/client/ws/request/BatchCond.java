package com.yaz.persistence.repository.turso.client.ws.request;

import java.util.List;

public record BatchCond(String type, Long step, BatchCond cond, List<BatchCond> conds) {

  public static BatchCond ok(long step) {
    return new BatchCond("ok", step, null, null);
  }

  public static BatchCond error(long step) {
    return new BatchCond("error", step, null, null);
  }

  public static BatchCond not(BatchCond cond) {
    return new BatchCond("not", null, cond, null);
  }

  public static BatchCond and(List<BatchCond> conds) {
    return new BatchCond("and", null, null, conds);
  }

  public static BatchCond or(List<BatchCond> conds) {
    return new BatchCond("or", null, null, conds);
  }
  public static BatchCond autoCommit() {
    return new BatchCond("is_autocommit", null, null, null);
  }
}
