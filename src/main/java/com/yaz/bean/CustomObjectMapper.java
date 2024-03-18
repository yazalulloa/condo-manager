package com.yaz.bean;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.json.JsonMapper;
import com.yaz.bean.qualifier.NonNullObjectMapper;
import com.yaz.util.JacksonUtil;
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

//  @Singleton
//  @Produces
//  @NonNullObjectMapper
//  JsonMapper jsonMapper() {
//    return JacksonUtil.jsonMapper();
//  }

}
