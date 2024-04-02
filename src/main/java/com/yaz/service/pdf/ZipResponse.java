package com.yaz.service.pdf;

import com.yaz.service.domain.CalculatedReceipt;
import com.yaz.service.domain.FileResponse;

public record ZipResponse(
    CalculatedReceipt receipt,
    FileResponse fileResponse
) {

}
