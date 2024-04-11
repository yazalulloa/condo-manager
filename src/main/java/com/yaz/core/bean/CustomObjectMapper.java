package com.yaz.core.bean;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.yaz.core.bean.qualifier.TursoObjectMapper;
import com.yaz.core.util.JacksonUtil;
import io.quarkus.arc.All;
import io.quarkus.jackson.ObjectMapperCustomizer;
import jakarta.inject.Singleton;
import jakarta.ws.rs.Produces;
import java.util.List;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class CustomObjectMapper {

  // Replaces the CDI producer for ObjectMapper built into Quarkus
  @Singleton
  @Produces
  ObjectMapper objectMapper(@All List<ObjectMapperCustomizer> customizers) {
    ObjectMapper mapper = JacksonUtil.getObjectMapper(); // Custom `ObjectMapper`
    JacksonUtil.loadModules();
    // Apply all ObjectMapperCustomizer beans (incl. Quarkus)
    for (ObjectMapperCustomizer customizer : customizers) {
      customizer.customize(mapper);
    }

    return mapper;
  }

  @Singleton
  @Produces
  @TursoObjectMapper
  ObjectMapper tursoObjectMapper(ObjectMapper objectMapper) {

    return objectMapper
        .copy()
        .setSerializationInclusion(JsonInclude.Include.NON_NULL)
        .setPropertyNamingStrategy(PropertyNamingStrategies.SNAKE_CASE)
        .configure(JsonGenerator.Feature.WRITE_BIGDECIMAL_AS_PLAIN, true);
  }

//  @Singleton
//  @Produces
//  Vertx rxVertx(io.vertx.mutiny.core.Vertx vertx) {
//    return Vertx.newInstance(vertx.getDelegate());
//  }

//  @Singleton
//  @Produces
//  @NonNullObjectMapper
//  JsonMapper jsonMapper() {
//    return JacksonUtil.jsonMapper();
//  }

}
