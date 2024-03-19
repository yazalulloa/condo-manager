package com.yaz.service;

import com.yaz.util.RandomUtil;
import io.micrometer.core.annotation.Timed;
import jakarta.enterprise.context.ApplicationScoped;
import java.nio.charset.StandardCharsets;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import javax.crypto.Cipher;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import lombok.extern.slf4j.Slf4j;
import org.eclipse.microprofile.config.inject.ConfigProperty;

@Slf4j
@ApplicationScoped
public class EncryptionService {
  private static final String SEPARATOR = "@";

  private final SecretKey secretKey;

  public EncryptionService(@ConfigProperty(name = "app.resources.secret-key") String key) {
    this.secretKey = new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), "AES");
  }

  private Cipher cipher() throws NoSuchPaddingException, NoSuchAlgorithmException {
    return Cipher.getInstance("AES/GCM/NoPadding");
  }

  @Timed(value = "app.cipher.encryption", description = "Encrypts a string")
  public String encrypt(String original) {
    try {
      final var iv = new byte[16]; // Initialization Vector
      RandomUtil.getInstance().nextBytes(iv); // Generate a random IV
      final var cipher = cipher();
      cipher.init(Cipher.ENCRYPT_MODE, secretKey, new GCMParameterSpec(128, iv));
      final var encryptedData = cipher.doFinal(original.getBytes());
      final var encoder = Base64.getUrlEncoder();
      final var encrypt64 = encoder.encode(encryptedData);
      final var iv64 = encoder.encode(iv);
      return new String(encrypt64) + SEPARATOR + new String(iv64);
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  @Timed(value = "app.cipher.decryption", description = "Decrypts a string")
  public String decrypt(String cypher) {
    try {
      final var split = cypher.split(SEPARATOR);
      final var decoder = Base64.getUrlDecoder();
      final var cypherText = decoder.decode(split[0]);
      final var iv = decoder.decode(split[1]);
      final var paraSpec = new GCMParameterSpec(128, iv);
      final var cipher = cipher();
      cipher.init(Cipher.DECRYPT_MODE, secretKey, paraSpec);
      final var decryptedData = cipher.doFinal(cypherText);
      return new String(decryptedData);
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }
}