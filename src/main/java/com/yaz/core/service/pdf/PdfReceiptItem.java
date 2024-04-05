package com.yaz.core.service.pdf;

import java.nio.file.Path;
import java.util.Set;
import lombok.Builder;

@Builder(toBuilder = true)
public record PdfReceiptItem(
    Path path,
    String fileName,
    String id,
    String buildingName,
    Set<String> emails) {

}
