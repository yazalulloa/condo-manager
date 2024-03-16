package com.yaz.persistence.repository.turso.client.ws.request;

public sealed interface Request permits
    OpenStreamReq
    , CloseStreamReq
    , ExecuteReq
    , BatchReq
    , OpenCursorReq
    , CloseCursorReq
    , FetchCursorReq
    , SequenceReq
    , DescribeReq
    , StoreSqlReq
    , CloseSqlReq
    , GetAutocommitReq {

  String type();

}
