package com.yaz.util;

import com.yaz.core.util.FileUtil;
import io.vertx.rxjava3.core.Vertx;
import java.io.File;
import java.io.IOException;
import org.junit.jupiter.api.Test;

class FileUtilTest {

  Vertx vertx = Vertx.vertx();

  String path = "gmail/1710640430edf22bdc-e8a9-42e6-a527-8e2abf03ea7c/StoredCredential";

  @Test
  void checksum() throws IOException {
    final var hash = FileUtil.checksumInputStream(new File(path));

    final var buffer = vertx.fileSystem().readFile(path).blockingGet();

    final var fileProps = vertx.fileSystem().props(path).blockingGet();

    System.out.println(fileProps.size());
    System.out.println(buffer.length());
  }


}