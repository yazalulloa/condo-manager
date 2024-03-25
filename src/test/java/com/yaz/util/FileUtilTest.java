package com.yaz.util;

import io.reactivex.rxjava3.core.Single;
import io.vertx.core.file.OpenOptions;
import io.vertx.rxjava3.core.Vertx;
import io.vertx.rxjava3.core.buffer.Buffer;
import io.vertx.rxjava3.core.file.FileProps;
import java.io.File;
import java.io.IOException;
import java.util.zip.CRC32;
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