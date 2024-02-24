package com.yaz;

import static org.hamcrest.Matchers.is;

import io.quarkus.test.junit.QuarkusTest;
import io.restassured.RestAssured;
import org.junit.jupiter.api.Test;

@QuarkusTest
public class LoadDataResourceTest {

  @Test
  public void testLoadDataEndpoint() {
    RestAssured.given()
        .when()
        .get("/rpc/load_data")
        .then()
        .statusCode(200)
        .body(is("OK"));
  }
}
