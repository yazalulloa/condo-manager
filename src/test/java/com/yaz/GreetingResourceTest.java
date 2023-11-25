package com.yaz;

import static io.restassured.RestAssured.given;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;

@QuarkusTest
public class GreetingResourceTest {

    @Test
    public void testHelloEndpoint() {
        given()
          .when().get("/hello")
          .then()
             .statusCode(200)
        //     .body(is("Hello from RESTEasy"))
        ;
    }

    @Test
    public void testRateEndpoint() {
        given()
            .when().get("/hello/rate")
            .then()
            .statusCode(200)
        //     .body(is("Hello from RESTEasy"))
        ;
    }

}