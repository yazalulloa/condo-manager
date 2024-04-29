package com.yaz.core.service;

import com.yaz.core.service.domain.EncryptionConfig;
import com.yaz.core.util.RandomUtil;
import io.micrometer.core.annotation.Timed;
import io.vertx.core.json.Json;
import jakarta.enterprise.context.ApplicationScoped;
import java.nio.charset.StandardCharsets;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.regex.Pattern;
import javax.crypto.Cipher;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
public class EncryptionService {


  private final SecretKey secretKey;
  private final String separator;
  private final String quotedSeparator;
  private final String transformation;
  private final int ivSize;
  private final int parameterSpecLen;

  public EncryptionService(
      EncryptionConfig config) {
    this.secretKey = new SecretKeySpec(config.secretKey().getBytes(StandardCharsets.UTF_8), config.algorithm());
    this.separator = config.separator();
    this.quotedSeparator = Pattern.quote(separator);
    this.transformation = config.transformation();
    this.ivSize = config.ivSize();
    this.parameterSpecLen = config.parameterSpecLen();
  }

  private Cipher cipher() throws NoSuchPaddingException, NoSuchAlgorithmException {
    return Cipher.getInstance(transformation);
  }

  public String encryptObj(Object obj) {
    return encrypt(Json.encode(obj));
  }



  @Timed(value = "app.cipher.encryption", description = "Encrypts a string")
  public String encrypt(String original) {
    try {
      final var iv = new byte[ivSize]; // Initialization Vector
      RandomUtil.getInstance().nextBytes(iv); // Generate a random IV
      final var cipher = cipher();
      cipher.init(Cipher.ENCRYPT_MODE, secretKey, new GCMParameterSpec(parameterSpecLen, iv));
      final var encryptedData = cipher.doFinal(original.getBytes());
      final var encoder = Base64.getUrlEncoder();
      final var encrypt64 = encoder.encode(encryptedData);
      final var iv64 = encoder.encode(iv);
      return new String(encrypt64) + separator + new String(iv64);
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  @Timed(value = "app.cipher.decryption", description = "Decrypts a string")
  public String decrypt(String cypher) {
    try {
      final var split = cypher.split(quotedSeparator);
      final var decoder = Base64.getUrlDecoder();
      final var cypherText = decoder.decode(split[0]);
      final var iv = decoder.decode(split[1]);
      final var paraSpec = new GCMParameterSpec(parameterSpecLen, iv);
      final var cipher = cipher();
      cipher.init(Cipher.DECRYPT_MODE, secretKey, paraSpec);
      final var decryptedData = cipher.doFinal(cypherText);
      return new String(decryptedData);
    } catch (Exception e) {
      throw new RuntimeException(cypher, e);
    }
  }

  public <T> T decryptObj(String json, Class<T> clazz) {
    return Json.decodeValue(decrypt(json), clazz);
  }
}