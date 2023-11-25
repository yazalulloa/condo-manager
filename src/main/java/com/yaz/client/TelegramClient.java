package com.yaz.client;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import io.quarkus.rest.client.reactive.jackson.ClientObjectMapper;
import io.smallrye.mutiny.Uni;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import com.yaz.client.domain.telegram.SendMessage;
import com.yaz.client.domain.telegram.TelegramMessage;
import com.yaz.util.JacksonUtil;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

@RegisterRestClient(configKey = "telegram-bot-api")
public interface TelegramClient {

  @ClientObjectMapper
  static ObjectMapper objectMapper() {
    return JacksonUtil.getObjectMapper()
        .disable(SerializationFeature.FAIL_ON_EMPTY_BEANS)
        .disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES)
        .setSerializationInclusion(Include.NON_NULL);
  }

  @POST
  @Path("sendMessage")
  @Produces(MediaType.TEXT_HTML)
  Uni<TelegramMessage> sendMessage(SendMessage sendMessage);

}
