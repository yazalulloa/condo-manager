package com.yaz.core.service.pdf;

import com.yaz.core.service.entity.ReceiptService;
import com.yaz.core.util.RxUtil;
import com.yaz.persistence.domain.query.ReceiptQuery;
import io.quarkus.test.junit.QuarkusTest;
import io.reactivex.rxjava3.core.Observable;
import io.reactivex.rxjava3.core.Single;
import jakarta.inject.Inject;
import org.junit.jupiter.api.Test;

@QuarkusTest
class ReceiptPdfServiceTest {

  @Inject
  ReceiptService receiptService;
  @Inject
  ReceiptPdfService receiptPdfService;


  @Test
  void pdfs() {
//    RxUtil.single(receiptService.select(ReceiptQuery.builder().limit(10).build()))
//        .flatMapObservable(Observable::fromIterable)
//        .map(receipt -> receiptPdfService.pdfs(receipt.buildingId(), receipt.id(), null))
//        .toList()
//        .toFlowable()
//        .flatMap(Single::concat)
//        .ignoreElements()
//        .blockingAwait();

    receiptPdfService.pdfs("ANTONIETA", 92, null)
        .ignoreElement()
        .blockingAwait();
  }
}