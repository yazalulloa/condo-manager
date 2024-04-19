package com.yaz.core.service.csv;

import io.reactivex.rxjava3.core.Single;
import java.nio.file.Path;
import java.util.List;

public interface ReceiptParser {


  Single<List<CsvReceipt>> parseDir(String dir);

  Single<CsvReceipt> parse(String fileName, Path path);
}
