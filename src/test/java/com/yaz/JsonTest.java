package com.yaz;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.yaz.persistence.repository.turso.client.ws.request.Stmt;
import com.yaz.persistence.repository.turso.client.ws.request.Value;
import com.yaz.persistence.repository.turso.client.ws.response.Col;
import com.yaz.persistence.repository.turso.client.ws.response.StmtResult;
import com.yaz.util.JacksonUtil;
import java.io.IOException;
import org.junit.jupiter.api.Test;

public class JsonTest {

  @Test
  void test() throws IOException {
    final var mapper = JacksonUtil.getObjectMapper().copy()
        .setSerializationInclusion(JsonInclude.Include.NON_NULL)
        .setPropertyNamingStrategy(PropertyNamingStrategies.SNAKE_CASE);

    final var cols = new Col[2];

    cols[1] = new Col("id", "INTEGER");

    final var stmtResult = new StmtResult(cols, new Value[3][3], 0, "0");

    mapper.writeValue(System.out, stmtResult);
  }

}
