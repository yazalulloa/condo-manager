package com.yaz.core.util;


import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
import org.apache.commons.compress.archivers.tar.TarArchiveEntry;
import org.apache.commons.compress.archivers.tar.TarArchiveOutputStream;
import org.apache.commons.compress.compressors.gzip.GzipCompressorOutputStream;
import org.apache.commons.io.IOUtils;


public class ZipUtility {


  private static final int BUFFER_SIZE = 4096;

  private ZipUtility() {
    super();
  }

  public static void zipDirectory(File file, File destZipFile) throws IOException {
    if (file.isDirectory()) {
      final var listFiles = file.listFiles();
      if (listFiles != null && listFiles.length > 0) {
        final var list = Arrays.stream(listFiles).toList();
        zip(list, destZipFile);
        return;
      }
    }

    throw new IllegalArgumentException();

  }

  public static void zip(List<File> listFiles, File destZipFile) throws IOException {
    try (ZipOutputStream zos = new ZipOutputStream(new FileOutputStream(destZipFile))) {
      for (File file : listFiles) {
        if (file.isDirectory()) {
          zipDirectory(file, file.getName(), zos);
        } else {
          zipFile(file, zos);
        }
      }
      zos.flush();
    }

  }


  public static void zip(File destZipFile, String... files) throws IOException {
    List<File> listFiles = new ArrayList<>();
    for (String file : files) {
      listFiles.add(new File(file));
    }
    zip(listFiles, destZipFile);
  }


  private static void zipDirectory(File folder, String parentFolder, ZipOutputStream zos)
      throws IOException {
    for (File file : Objects.requireNonNull(folder.listFiles())) {
      if (file.isDirectory()) {
        zipDirectory(file, parentFolder + "/" + file.getName(), zos);
        continue;
      }
      zos.putNextEntry(new ZipEntry(parentFolder + "/" + file.getName()));
      try (final var bis = new BufferedInputStream(new FileInputStream(file))) {
        byte[] bytesIn = new byte[BUFFER_SIZE];
        int read;
        while ((read = bis.read(bytesIn)) != -1) {
          zos.write(bytesIn, 0, read);
        }
        zos.closeEntry();
      }
    }
  }

  private static void zipFile(File file, ZipOutputStream zos)
      throws IOException {
    zos.putNextEntry(new ZipEntry(file.getName()));
    try (final var bis = new BufferedInputStream(new FileInputStream(file))) {

      byte[] bytesIn = new byte[BUFFER_SIZE];
      int read;
      while ((read = bis.read(bytesIn)) != -1) {
        zos.write(bytesIn, 0, read);
      }
      zos.closeEntry();
    }
  }

  public static void gzip(String tarGzPath, String... directoryPath) throws IOException {

    try (final var fOut = new FileOutputStream(tarGzPath);
        final var bOut = new BufferedOutputStream(fOut);
        final var gzOut = new GzipCompressorOutputStream(bOut);
        final var tOut = new TarArchiveOutputStream(gzOut)) {

      for (final var path : directoryPath) {
        gzip(tOut, path, "");
      }

      tOut.finish();
    }
  }

  private static void gzip(TarArchiveOutputStream tOut, String path, String base) throws IOException {
    final var f = new File(path);
    final var entryName = base + f.getName();
    final var tarEntry = new TarArchiveEntry(f, entryName);

    tOut.putArchiveEntry(tarEntry);

    if (f.isFile()) {

      try (final var input = new FileInputStream(f)) {
        IOUtils.copy(input, tOut);
      }

      tOut.closeArchiveEntry();
    } else {
      tOut.closeArchiveEntry();

      final var children = f.listFiles();

      if (children != null) {
        for (final var child : children) {
          gzip(tOut, child.getAbsolutePath(), entryName + "/");
        }
      }
    }
  }

//  public static void createTarFile(String sourceDir) {
//    TarArchiveOutputStream tarOs = null;
//    try {
//      File source = new File(sourceDir);
//      // Using input name to create output name
//      FileOutputStream fos = new FileOutputStream(source.getAbsolutePath().concat(".tar.gz"));
//      GZIPOutputStream gos = new GZIPOutputStream(new BufferedOutputStream(fos));
//      tarOs = new TarArchiveOutputStream(gos);
//      addFilesToTarGZ(sourceDir, "", tarOs);
//    } catch (IOException e) {
//      // TODO Auto-generated catch block
//      e.printStackTrace();
//    } finally {
//      try {
//        tarOs.close();
//      } catch (IOException e) {
//        // TODO Auto-generated catch block
//        e.printStackTrace();
//      }
//    }
//  }

  public static void addFilesToTarGZ(String filePath, String parent, TarArchiveOutputStream tarArchive)
      throws IOException {
    final var file = new File(filePath);
    // Create entry name relative to parent file path
    final var entryName = parent + file.getName();
    // add tar ArchiveEntry
    tarArchive.putArchiveEntry(new TarArchiveEntry(file, entryName));
    if (file.isFile()) {
      final var fis = new FileInputStream(file);
      try (final var bis = new BufferedInputStream(fis)) {
        // Write file content to archive
        IOUtils.copy(bis, tarArchive);
        tarArchive.closeArchiveEntry();
      }
    } else if (file.isDirectory()) {
      // no need to copy any content since it is
      // a directory, just close the outputstream
      tarArchive.closeArchiveEntry();
      // for files in the directories
      for (final var f : Objects.requireNonNull(file.listFiles())) {
        // recursively call the method for all the subdirectories
        addFilesToTarGZ(f.getAbsolutePath(), entryName + File.separator, tarArchive);
      }
    }
  }

  public static void createTarGzipFiles(String output, Collection<String> paths) throws IOException {
    createTarGzipFiles(Paths.get(output), paths.stream().map(Paths::get).toList());
  }

  public static void createTarGzipFiles(Path output, Collection<Path> paths) throws IOException {

    try (final var fOut = Files.newOutputStream(output);
        final var buffOut = new BufferedOutputStream(fOut);
        final var gzOut = new GzipCompressorOutputStream(buffOut);
        final var tOut = new TarArchiveOutputStream(gzOut)) {

      for (Path path : paths) {

        if (!Files.isRegularFile(path)) {
          throw new IOException("Support only file!");
        }

        TarArchiveEntry tarEntry = new TarArchiveEntry(
            path.toFile(),
            path.getFileName().toString());

        tOut.putArchiveEntry(tarEntry);

        // copy file to TarArchiveOutputStream
        Files.copy(path, tOut);

        tOut.closeArchiveEntry();

      }

      tOut.finish();

    }

  }

}

