package com.yaz;

import io.quarkus.csrf.reactive.runtime.CsrfTokenUtils;
import org.junit.jupiter.api.Test;

public class CsrfTokenUtilsTest {

  @Test
  void test() {
    final var secret = "Z5pbq5K4Rfp3VMD5RExdezxA1yjnGSgAuvjeTOcOqR3AvSjET4N012GWECRQn3HIFdC0Gtffh3F3R9PVEcgFyH";
    final var cookieToken = "Y60rKRf_MsaDy8FRZGhfQ478VOPVoQx2CJIzBvZ44qw";
    final var headerToken = "EuoVfVQ-W27D4uouV6ISmQ";

    final var signCsrfToken = CsrfTokenUtils.signCsrfToken(headerToken, secret);

    System.out.println(signCsrfToken);
    System.out.println(signCsrfToken.equals(cookieToken));

  }

}
