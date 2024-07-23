package com.yaz.persistence.repository.turso.client.ws;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.yaz.persistence.repository.turso.client.ws.request.RequestMsg;
import com.yaz.persistence.repository.turso.client.ws.response.ResponseMsg;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(fluent = true)
public final class TursoResult {


  @JsonProperty
  private final int requestId;
  @JsonProperty
  private final RequestMsg requestMsg;
  @JsonProperty
  private final long timestamp;
  @JsonProperty
  private ResponseMsg responseMsg;
  @JsonProperty
  private long time;

  public TursoResult(RequestMsg requestMsg) {
    this.requestId = requestMsg.requestId();
    this.requestMsg = requestMsg;
    this.timestamp = System.currentTimeMillis();
  }

  public void setResponse(ResponseMsg responseMsg) {
    this.responseMsg = responseMsg;
    this.time = System.currentTimeMillis() - timestamp;
  }
}
