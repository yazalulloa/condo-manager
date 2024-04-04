package com.yaz.resource.domain.response;

public record ReceiptProgressUpdate(
    String left,
    String right,
    int counter,
    int size
) {

}
