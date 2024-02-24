package com.yaz.resource;


import io.smallrye.mutiny.Uni;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import com.yaz.client.LoadDataClient;
import com.yaz.service.LoadBackupService;
import com.yaz.util.MutinyUtil;

@Slf4j
@Path("/rpc/load_data")
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class LoadDataResource {

  private final LoadDataClient loadDataClient;
  private final LoadBackupService backupService;

  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public Uni<String> loadData() {
    final var single = backupService.load()
        .toSingleDefault("OK");

    return MutinyUtil.toUni(single);
    //return loadDataClient.loadBackup();
  }

}
