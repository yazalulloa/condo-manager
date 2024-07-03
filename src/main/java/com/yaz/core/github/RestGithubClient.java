package com.yaz.core.github;

import io.smallrye.mutiny.Uni;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.HeaderParam;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import java.util.List;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

@RegisterRestClient(configKey = "github-api")
public interface RestGithubClient {

  @GET
  @Path("/user/emails")
  @Produces(MediaType.APPLICATION_JSON)
  Uni<List<UserEmail>> getUserEmails(@HeaderParam("Authorization") String authorization);
}
