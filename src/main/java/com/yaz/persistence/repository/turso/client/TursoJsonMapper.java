package com.yaz.persistence.repository.turso.client;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.ObjectCodec;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.yaz.core.bean.qualifier.TursoObjectMapper;
import jakarta.inject.Singleton;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Singleton
public class TursoJsonMapper {

  private final ObjectMapper mapper;


  public TursoJsonMapper(@TursoObjectMapper ObjectMapper mapper) {
    this.mapper = mapper;
  }

  public <T> T fromJson(String json, Class<T> clazz) {
    try {
      return mapper.readValue(json, clazz);
    } catch (JsonProcessingException e) {
      log.error("Failed to parse json: %s".formatted(json));
      throw new RuntimeException(e);
    }
  }

  public String toJson(Object object) {
    try {
      return mapper.writeValueAsString(object);
    } catch (JsonProcessingException e) {
      log.error("Failed to serialize object: %s".formatted(object));
      throw new RuntimeException(e);
    }
  }

  public ObjectCodec mapper() {
    return mapper;
  }
}
