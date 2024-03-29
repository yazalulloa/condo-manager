package com.yaz.service.pdf;

import com.yaz.resource.domain.response.ReceiptPdfResponse;
import com.yaz.resource.domain.response.ReceiptPdfResponse.Tab;
import com.yaz.service.CalculateReceiptService;
import com.yaz.service.EncryptionService;
import com.yaz.service.TranslationProvider;
import com.yaz.service.domain.FileResponse;
import com.yaz.util.MutinyUtil;
import io.reactivex.rxjava3.schedulers.Schedulers;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.Collection;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class ReceiptPdfService {

  private final CalculateReceiptService calculateReceiptService;
  private final GetPdfReceipts getPdfReceipts;
  private final TranslationProvider translationProvider;
  private final EncryptionService encryptionService;

  public Uni<FileResponse> zipDownload(String buildingId, long receiptId) {
    final var fileSingle = calculateReceiptService.calculate(buildingId, receiptId)
        .observeOn(Schedulers.io())
        .map(getPdfReceipts::zipReceipt);

    return MutinyUtil.toUni(fileSingle);
  }

  public Uni<Collection<PdfReceiptItem>> pdfs(String buildingId, long receiptId) {
    final var collectionSingle = calculateReceiptService.calculate(buildingId, receiptId)
        .map(getPdfReceipts::pdfItems);

    return MutinyUtil.toUni(collectionSingle);
  }

  public Uni<ReceiptPdfResponse> pdfResponse(String buildingId, long receiptId) {
    final var responseSingle = calculateReceiptService.calculate(buildingId, receiptId)
        .observeOn(Schedulers.io())
        .map(calculatedReceipt -> {

          final var pdfReceiptItems = getPdfReceipts.pdfItems(calculatedReceipt);
          final var zipPath = getPdfReceipts.zipPath(calculatedReceipt, pdfReceiptItems);
          final var fileName = getPdfReceipts.fileName(calculatedReceipt);

          final var tabs = pdfReceiptItems.stream()
              .map(item -> {

                final var s =
                    fileName + (item.id().equals(calculatedReceipt.building().id()) ? "" : "_" + item.id()) + ".pdf";

                return Tab.builder()
                    .name(item.id())
                    .path(encryptionService.encrypt(item.path().toString()) + "/" + s)
                    .checked(item.emails() == null)
                    .build();
              })
              .collect(Collectors.toList());

          return ReceiptPdfResponse.builder()
              .building(calculatedReceipt.building().id())
              .month(translationProvider.translate(calculatedReceipt.month().name()))
              .date(calculatedReceipt.date())
              .zipPath(encryptionService.encrypt(zipPath.path().toString()))
              .tabs(tabs)
              .build();
        });

    return MutinyUtil.toUni(responseSingle);
  }
}
