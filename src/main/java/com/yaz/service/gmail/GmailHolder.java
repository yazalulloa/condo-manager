package com.yaz.service.gmail;

import com.google.api.services.gmail.Gmail;
import com.google.api.services.gmail.model.Message;
import com.yaz.service.gmail.domain.ReceiptEmailRequest;
import io.micrometer.core.annotation.Timed;
import jakarta.mail.MessagingException;
import java.io.IOException;

public class GmailHolder {

  private final Gmail gmail;

  public GmailHolder(Gmail gmail) {
    this.gmail = gmail;
  }

  public Message sendReceiptEmail(ReceiptEmailRequest emailRequest) throws MessagingException, IOException {
    final var mimeMessage = MimeMessageUtil.createEmail(emailRequest);

    final var messageWithEmail = GmailUtil.createMessageWithEmail(mimeMessage);
    return sendMsg(messageWithEmail);
  }

  @Timed(value = "gmail.send-msg", description = "[Gmail] A measure of how long it takes to send a message")
  public Message sendMsg(Message content) throws IOException {
    return gmail.users().messages().send("me", content).execute();
  }
}
