package com.yaz;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.services.gmail.model.Message;
import com.yaz.service.gmail.GmailHelper;
import com.yaz.service.gmail.GmailUtil;
import com.yaz.service.gmail.MimeMessageUtil;
import com.yaz.service.gmail.domain.ReceiptEmailRequest;
import jakarta.mail.MessagingException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.GeneralSecurityException;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import org.junit.jupiter.api.Test;

public class GmailTest {


  @Test
  void test() throws IOException, MessagingException {

    final var map = Files.readString(Paths.get(".env"))
        .lines()
        .map(str -> str.split("="))
        .filter(arr -> arr.length == 2)
        .collect(Collectors.toMap(arr -> arr[0], arr -> arr[1]));

    final var gmailHelper = new GmailHelper(
        map.get("GOOGLE_CLIENT_ID"),
        map.get("GOOGLE_CLIENT_SECRET"),
        "appName"
    );

    final var gmail = gmailHelper.gmail("1710035336157c4cdb-c74d-494d-9d50-d6521a913658");
    gmail.users().labels().list("me").execute().getLabels().forEach(System.out::println);

    final var emailRequest = ReceiptEmailRequest.builder()
        .from("yazalulloa@gmail.com")
        .to(Set.of("yzlup2@gmail.com"))
        .bcc(Set.of("yzlup2@gmail.com"))
        .cc(Set.of("yzlup2@gmail.com"))
        .subject("TEST")
        .text("TEST")
        .files(Set.of(
            "tmp/receipts/KORAL/69/KORAL_ENERO_2024-02-13.zip"
        ))
        .build();

    final var mimeMessage = MimeMessageUtil.createEmail(emailRequest);

    final var message = gmail.users().messages().send("me", GmailUtil.createMessageWithEmail(mimeMessage)).execute();

    System.out.println("Message id: " + message.getId());
    System.out.println(message.toPrettyString());

  }
}
