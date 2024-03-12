package com.yaz.persistence.client;

import com.yaz.condo.manager.grpc.hrana.client.MutinyTursoStreamingGrpc;
import com.yaz.condo.manager.grpc.hrana.ws.HelloMsg;
import com.yaz.condo.manager.grpc.hrana.ws.ServerMsg;
import io.quarkus.grpc.GrpcClient;
import io.smallrye.mutiny.Multi;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.POST;

@ApplicationScoped
public class TursoGrpcClient {

  @GrpcClient("turso-grpc")
  MutinyTursoStreamingGrpc.MutinyTursoStreamingStub client;

  @POST
  public Multi<ServerMsg> hello(String jwt) {
    final var helloMsg = HelloMsg.newBuilder()
        .setJwt(jwt)
        .build();

    return client.start(helloMsg)
        .map(serverMsg -> serverMsg);
  }
}
