package com.yaz.core.service.pdf;

import com.yaz.api.domain.response.ReceiptPdfResponse;
import com.yaz.api.domain.response.ReceiptPdfResponse.Tab;
import com.yaz.core.service.domain.CalculatedReceipt;
import com.yaz.core.util.MutinyUtil;
import com.yaz.core.service.CalculateReceiptService;
import com.yaz.core.service.EncryptionService;
import com.yaz.core.service.TranslationProvider;
import com.yaz.core.service.domain.FileResponse;
import com.yaz.core.util.RxUtil;
import io.reactivex.rxjava3.core.Single;
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

  private Single<CalculatedReceipt> calculate(String buildingId, long receiptId) {
    return RxUtil.single(calculateReceiptService.calculate(buildingId, receiptId));
  }

  public Uni<FileResponse> zipDownload(String buildingId, long receiptId) {

    return MutinyUtil.toUni(zipResponse(buildingId, receiptId))
        .map(ZipResponse::fileResponse);
  }

  public Single<ZipResponse> zipResponse(String buildingId, long receiptId) {
    return calculate(buildingId, receiptId)
        .observeOn(Schedulers.io())
        .map(receipt -> {
          final var fileResponse = getPdfReceipts.zipReceipt(receipt);
          return new ZipResponse(receipt, fileResponse);
        });
  }

  public Single<PdfReceiptResponse> pdfs(String buildingId, long receiptId) {
    return calculate(buildingId, receiptId)
        .map(receipt -> {
          final var pdfItems = getPdfReceipts.pdfItems(receipt);
          return new PdfReceiptResponse(receipt, pdfItems);
        });
  }

  public record PdfReceiptResponse(
      CalculatedReceipt receipt,
      Collection<PdfReceiptItem> pdfItems
  ) {

  }

  public Uni<ReceiptPdfResponse> pdfResponse(String buildingId, long receiptId) {
    final var responseSingle = calculate(buildingId, receiptId)
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
