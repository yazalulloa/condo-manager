package com.yaz.core.service.csv;

import io.reactivex.rxjava3.core.Single;
import java.nio.file.Path;
import java.time.Month;
import java.util.List;
import java.util.Map;

public interface ReceiptParser {

  Map<String, Month> MONTHS_MAP = Map.ofEntries(
      Map.entry("ENE", Month.JANUARY),
      Map.entry("FEB", Month.FEBRUARY),
      Map.entry("MAR", Month.MARCH),
      Map.entry("ABR", Month.APRIL),
      Map.entry("MAY", Month.MAY),
      Map.entry("JUN", Month.JUNE),
      Map.entry("JUL", Month.JULY),
      Map.entry("AUG", Month.AUGUST),
      Map.entry("AGO", Month.AUGUST),
      Map.entry("AGOS", Month.AUGUST),
      Map.entry("SEP", Month.SEPTEMBER),
      Map.entry("OCT", Month.OCTOBER),
      Map.entry("NOV", Month.NOVEMBER),
      Map.entry("DIC", Month.DECEMBER)
  );

  Single<List<CsvReceipt>> parseDir(String dir);

  Single<CsvReceipt> parse(Path path);
}
