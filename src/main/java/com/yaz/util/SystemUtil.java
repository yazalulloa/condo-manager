  package com.yaz.util;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

public class SystemUtil {


  /*public static String ipStr() {
    return "IP: " + EnvUtil.currentIp();
  }*/

  public static String processorsStr() {
    final var availableProcessors = Runtime.getRuntime().availableProcessors();
    return "PROCESSORS: " + availableProcessors;
  }

  public static String maxMemoryStr() {
    final var maxMemory = Runtime.getRuntime().maxMemory();
    return "MAX MEMORY: " + FileUtil.byteCountToDisplaySize(maxMemory);
  }

  public static String totalMemoryStr() {
    final var totalMemory = Runtime.getRuntime().totalMemory();
    return "TOTAL MEMORY: " + FileUtil.byteCountToDisplaySize(totalMemory);
  }

  public static String freeMemoryStr() {
    final var freeMemory = Runtime.getRuntime().freeMemory();
    return "FREE MEMORY: " + FileUtil.byteCountToDisplaySize(freeMemory);
  }

  public static String usedMemoryStr() {
    final var usedMemory = Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory();
    return "USED MEMORY: " + FileUtil.byteCountToDisplaySize(usedMemory);
  }


  public static String freeSpaceStr() {
    final var size = FileUtil.absoluteFile().getFreeSpace();
    return "FREE SPACE: " + FileUtil.byteCountToDisplaySize(size);
  }

  public static String usableSpaceStr() {
    final var size = FileUtil.absoluteFile().getUsableSpace();
    return "USABLE SPACE: " + FileUtil.byteCountToDisplaySize(size);
  }

  public static String totalSpaceStr() {
    final var size = FileUtil.absoluteFile().getTotalSpace();
    return "TOTAL SPACE: " + FileUtil.byteCountToDisplaySize(size);
  }

  public static String usedSpaceStr() {
    final var file = FileUtil.absoluteFile();
    final var size = file.getTotalSpace() - file.getFreeSpace();
    return "USED SPACE: " + FileUtil.byteCountToDisplaySize(size);
  }

  public static List<String> systemInfoList() {
    final var results = new ArrayList<String>();
    // TODO add ip
    //results.add(ipStr());
    results.add(processorsStr());
    results.add(maxMemoryStr());
    results.add(totalMemoryStr());
    results.add(freeMemoryStr());
    results.add(usedMemoryStr());
    results.add(freeSpaceStr());
    results.add(usableSpaceStr());
    results.add(totalSpaceStr());
    results.add(usedSpaceStr());
    return results;
  }
  public static Stream<String> systemInfo() {

    return Stream.of(
        processorsStr(),
        maxMemoryStr(),
        totalMemoryStr(),
        freeMemoryStr(),
        usedMemoryStr(),
        freeSpaceStr(),
        usableSpaceStr(),
        totalSpaceStr(),
        usedSpaceStr()
    );
  }

}
