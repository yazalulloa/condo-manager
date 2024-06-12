package com.yaz.core.client;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.yaz.core.client.domain.telegram.EditMessageText;
import com.yaz.core.client.domain.telegram.SendDocument;
import com.yaz.core.client.domain.telegram.SendMessage;
import com.yaz.core.client.domain.telegram.TelegramUpdate;
import com.yaz.core.client.domain.telegram.WebHookRequest;
import com.yaz.core.util.JacksonUtil;
import io.quarkus.rest.client.reactive.jackson.ClientObjectMapper;
import io.smallrye.mutiny.Uni;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import java.util.List;
import java.util.Set;
import lombok.Builder;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

@RegisterRestClient(configKey = "telegram-bot-api")
public interface TelegramClient {

  @ClientObjectMapper
  static ObjectMapper objectMapper() {
    return JacksonUtil.getObjectMapper()
        .copy()
        .setPropertyNamingStrategy(PropertyNamingStrategies.SNAKE_CASE)
        .disable(SerializationFeature.FAIL_ON_EMPTY_BEANS)
        .disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES)
        .setSerializationInclusion(Include.NON_NULL);
  }

  @GET
  @Path("getMe")
  @Produces(MediaType.APPLICATION_JSON)
  Uni<String> getMe();

  @POST
  @Path("sendMessage")
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces(MediaType.APPLICATION_JSON)
  Uni<String> sendMessage(SendMessage sendMessage);

  @POST
  @Path("sendMessage")
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces(MediaType.APPLICATION_JSON)
  Uni<String> editMessageText(EditMessageText sendMessage);

  @POST
  @Path("sendMessage")
  @Consumes(MediaType.MULTIPART_FORM_DATA)
  @Produces(MediaType.APPLICATION_JSON)
  Uni<String> sendDocument(SendDocument sendMessage);

  @GET
  @Path("getWebhookInfo")
  @Produces(MediaType.APPLICATION_JSON)
  Uni<String> getWebhookInfo();

  @POST
  @Path("deleteWebhook")
  @Produces(MediaType.APPLICATION_JSON)
  Uni<String> deleteWebhook(@QueryParam("drop_pending_updates") boolean dropPendingUpdates);

  @POST
  @Path("setWebhook")
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces(MediaType.APPLICATION_JSON)
  Uni<String> setWebhook(WebHookRequest sendMessage);

  @POST
  @Path("getUpdates")
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces(MediaType.APPLICATION_JSON)
  Uni<TelegramUpdateResponse> getUpdates(GetUpdatesRequest getUpdatesRequest);

  @POST
  @Path("getUpdates")
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces(MediaType.APPLICATION_JSON)
  Uni<String> getUpdatesStr();

  record TelegramUpdateResponse(
      boolean ok,
      List<TelegramUpdate> result
  ) {

  }

  @Builder(toBuilder = true)
  record GetUpdatesRequest(
      Long offset,
      Integer limit,
      Integer timeout,
      Set<String> allowedUpdates

  ) {

  }

}
