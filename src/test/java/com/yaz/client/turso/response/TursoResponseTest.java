package com.yaz.client.turso.response;

import com.yaz.core.client.turso.response.TursoResponse;
import io.vertx.core.json.Json;
import org.junit.jupiter.api.Test;

class TursoResponseTest {

  @Test
  void parse() {
    final var json = """
        {
          "baton": null,
          "base_url": null,
          "results": [
            {
              "type": "ok",
              "response": {
                "type": "execute",
                "result": {
                  "cols": [],
                  "rows": [],
                  "affected_row_count": 1,
                  "last_insert_rowid": null,
                  "replication_index": "260"
                }
              }
            },
            {
              "type": "ok",
              "response": {
                "type": "close"
              }
            }
          ]
        }
        """;

    final var tursoResponse = Json.decodeValue(json, TursoResponse.class);
    System.out.println(tursoResponse);
  }
}