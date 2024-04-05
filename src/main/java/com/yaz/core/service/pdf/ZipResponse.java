package com.yaz.core.service.pdf;

import com.yaz.core.service.domain.CalculatedReceipt;
import com.yaz.core.service.domain.FileResponse;

public record ZipResponse(
    CalculatedReceipt receipt,
    FileResponse fileResponse
) {

}
