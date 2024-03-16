package com.yaz.job;

import com.yaz.persistence.repository.turso.client.TursoWsService;
import io.quarkus.scheduler.Scheduled;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@ApplicationScoped
@Slf4j
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class WebsocketJob {


  private final TursoWsService wsService;

//  {"type":"request","request_id":0,"request":{"type":"open_stream","stream_id":0}}
//  {"type":"request","request_id":1,"request":{"type":"store_sql","sql_id":0,"sql":"SELECT * FROM sqlite_schema;"}}
//  {"type":"request","request_id":2,"request":{"type":"execute","stream_id":0,"stmt":{"sql_id":0,"args":[],"named_args":[],"want_rows":true}}}
//  {"type":"request","request_id":3,"request":{"type":"close_stream","stream_id":0}}
//
//
//  {"type":"request","request_id":0,"request":{"type":"open_stream","stream_id":0}}
//  {"type":"request","request_id":1,"request":{"type":"store_sql","sql_id":0,"sql":"SELECT * FROM sqlite_schema;"}}
//  {"type":"request","request_id":2,"request":{"type":"execute","stream_id":0,"stmt":{"sql_id":0,"args":[],"named_args":[],"want_rows":true}}}
//  {"type":"request","request_id":3,"request":{"type":"close_stream","stream_id":0}}


  @Scheduled(every = "60s")
  public void runAsStart() {

    wsService.heartBeat()
        .onSuccess(v -> {

          wsService.loadSchema()
              .subscribe()
              .with(
                  res -> {},
                  //res -> log.info("Schema loaded"),
                  err -> log.error("Failed to load schema", err));
        });

  }

}
