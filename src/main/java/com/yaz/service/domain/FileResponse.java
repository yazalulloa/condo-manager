package com.yaz.service.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.Accessors;
import lombok.extern.jackson.Jacksonized;

@Jacksonized
@Builder(toBuilder = true)
@Accessors(fluent = true)
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class FileResponse {

  @JsonProperty
  private final String fileName;

  @JsonProperty
  private final String path;

  @JsonProperty
  private final String contentType;

  @JsonProperty
  private final boolean deleteFile;

//  @JsonIgnore
//  private final ReadStream<Buffer> readStream;

  @JsonIgnore
  private final long fileSize;
}