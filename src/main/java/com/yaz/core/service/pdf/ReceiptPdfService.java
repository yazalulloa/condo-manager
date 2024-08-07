package com.yaz.core.service.pdf;

import com.yaz.api.domain.response.ReceiptPdfResponse;
import com.yaz.api.domain.response.ReceiptPdfResponse.Tab;
import com.yaz.core.service.CalculateReceiptService;
import com.yaz.core.service.EncryptionService;
import com.yaz.core.service.TranslationProvider;
import com.yaz.core.service.domain.CalculatedReceipt;
import com.yaz.core.service.domain.FileResponse;
import com.yaz.core.util.MutinyUtil;
import com.yaz.core.util.RxUtil;
import io.reactivex.rxjava3.core.Single;
import io.reactivex.rxjava3.schedulers.Schedulers;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.Collection;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor
public class ReceiptPdfService {

  private final CalculateReceiptService calculateReceiptService;
  private final GetPdfReceipts getPdfReceipts;
  private final TranslationProvider translationProvider;
  private final EncryptionService encryptionService;

  public Single<CalculatedReceipt> calculate(String buildingId, long receiptId) {
    return RxUtil.single(calculateReceiptService.calculate(buildingId, receiptId));
  }

  public Uni<FileResponse> zipDownload(String buildingId, long receiptId) {

    return MutinyUtil.toUni(zipResponse(buildingId, receiptId))
        .map(ZipResponse::fileResponse);
  }

  public Single<ZipResponse> zipResponse(String buildingId, long receiptId) {
    return calculate(buildingId, receiptId)
        .observeOn(Schedulers.io())
        .flatMap(receipt -> {
          return getPdfReceipts.pdfItems(receipt)
              .map(pdfReceiptItems -> {
                final var fileResponse = getPdfReceipts.zipPath(receipt, pdfReceiptItems);
                return new ZipResponse(receipt, fileResponse);
              });
        });
  }

  public Single<PdfReceiptResponse> pdfs(String buildingId, long receiptId, Set<String> apts) {
    return calculate(buildingId, receiptId)
        .flatMap(receipt -> {
          if (apts != null && !apts.isEmpty()) {
            final var apartments = receipt.apartments().stream()
                .filter(apartment -> apts.contains(apartment.number()))
                .toList();

            receipt = receipt.toBuilder()
                .apartments(apartments)
                .build();
          }

          CalculatedReceipt finalReceipt = receipt;
          return getPdfReceipts.pdfItems(receipt)
              .map(pdfReceiptItems -> new PdfReceiptResponse(finalReceipt, pdfReceiptItems));
        });
  }

  public Single<ReceiptPdfResponse> pdfResponse(String buildingId, long receiptId, String clientId) {
    return calculate(buildingId, receiptId)
        .map(calculatedReceipt -> calculatedReceipt.toBuilder()
            .clientId(clientId)
            .build())
        .observeOn(Schedulers.io())
        .flatMap(this::pdfResponse);
  }

  public Single<ReceiptPdfResponse> pdfResponse(CalculatedReceipt calculatedReceipt) {
    return getPdfReceipts.pdfItems(calculatedReceipt)
        .map(pdfReceiptItems -> {

          final var zipPath = getPdfReceipts.zipPath(calculatedReceipt, pdfReceiptItems);
          final var fileName = getPdfReceipts.fileName(calculatedReceipt);

          final var tabs = pdfReceiptItems.stream()
              .map(item -> {

                final var s =
                    fileName + (item.id().equals(calculatedReceipt.building().id()) ? "" : "_" + item.id()) + ".pdf";

                return Tab.builder()
                    .number(item.id())
                    .name(item.name())
                    .path(encryptionService.encrypt(item.path().toString()) + "/" + s)
                    .checked(item.emails() == null)
                    .build();
              })
              .toList();

          return ReceiptPdfResponse.builder()
              .building(calculatedReceipt.building().id())
              .month(translationProvider.translate(calculatedReceipt.month().name()))
              .date(calculatedReceipt.date())
              .zipPath(encryptionService.encrypt(zipPath.path().toString()))
              .tabs(tabs)
              .selectedTab(tabs.stream().filter(Tab::checked).findFirst().map(Tab::number).orElse(null))
              .build();
        });
  }

  public record PdfReceiptResponse(
      CalculatedReceipt receipt,
      Collection<PdfReceiptItem> pdfItems
  ) {

  }
}
