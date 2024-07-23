package com.yaz.api.resource;


import com.yaz.core.client.LoadDataClient;
import com.yaz.core.service.LoadBackupService;
import com.yaz.core.util.MutinyUtil;
import io.smallrye.mutiny.Uni;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Path("/rpc/load_data")
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class LoadDataResource {

  private final LoadDataClient loadDataClient;
  private final LoadBackupService backupService;

  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public Uni<String> loadData() {

    if (true) {
      return Uni.createFrom().item("OK");
    }

    final var single = backupService.load()
        .toSingleDefault("OK");

    return MutinyUtil.toUni(single);
    //return loadDataClient.loadBackup();
  }

  @GET
  @Path("/historic_rates")
  @Produces(MediaType.APPLICATION_JSON)
  public Uni<String> historicRates() {
    if (true) {
      return Uni.createFrom().item("OK");
    }

    return MutinyUtil.toUni(backupService.insertHistoricRates())
        .map(i -> "Rates: " + i);
  }

}
