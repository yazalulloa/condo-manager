package com.yaz.core.service.csv;

import java.util.Collection;

public record PoiPage(
    String sheetName,
    int sheetIndex,
    Collection<Row> rows,
    int rowsCount,
    boolean hasNext
) {

}
