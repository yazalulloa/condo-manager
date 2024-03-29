package com.yaz.service.pdf;

import com.yaz.persistence.entities.Apartment;
import com.yaz.persistence.entities.Building;
import com.yaz.persistence.entities.Receipt;
import com.yaz.service.TranslationProvider;
import com.yaz.service.domain.CalculatedReceipt;
import com.yaz.service.domain.FileResponse;
import com.yaz.util.ZipUtility;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collection;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class GetPdfReceipts {

  private final TranslationProvider translationProvider;

  public String zipFileName(CalculatedReceipt receipt) {
    return fileName(receipt) + ".zip";
  }

  public String fileName(CalculatedReceipt receipt) {
    final var month = translationProvider.translate(receipt.month().name());
    return "%s_%s_%s".formatted(receipt.building().id(), month, receipt.date());
  }

  public FileResponse zipPath(CalculatedReceipt receipt, Collection<PdfReceiptItem> list) throws IOException {
    // asyncSubject.onNext(ReceiptPdfProgressState.ofIndeterminate("Creando zip..."));

    final var dirPath = Paths.get("tmp", "receipts", receipt.building().id(), String.valueOf(receipt.id()));
    final var fileName = zipFileName(receipt);
    final var zipPath = dirPath.resolve(fileName);
    Files.createDirectories(dirPath);
    final var files = list.stream().map(PdfReceiptItem::path)
        .map(Path::toFile)
        .toList();

    ZipUtility.zip(files, zipPath.toFile());

    // asyncSubject.onNext(ReceiptPdfProgressState.ofIndeterminate("Descargando..."));
    return FileResponse.builder()
        .path(zipPath.toFile())
        .fileName(fileName)
        .build();
  }

  public Collection<PdfReceiptItem> pdfItems(CalculatedReceipt receipt)
      throws IOException {

    final var tempPath = Paths.get("tmp", "receipts", receipt.building().id(), String.valueOf(receipt.id()));
    //asyncSubject.onNext(ReceiptPdfProgressState.ofIndeterminate("Calculando..."));
    final var pdfReceipts = pdfReceipts(tempPath, receipt, receipt.building(), receipt.apartments());

    var counter = 0;

   // updateState("Creando archivos ", 0, pdfReceipts.size());
    final var items = new ArrayList<PdfReceiptItem>(pdfReceipts.size());

    for (CreatePdfReceipt pdfReceipt : pdfReceipts) {
      pdfReceipt.createPdf();
      final var buildingName = pdfReceipt.building().name();

      final var apt = Optional.ofNullable(pdfReceipt.apartment())
          .map(Apartment::number)
          .orElse("");

      //updateState("Creando archivos %s %s ".formatted(buildingName, apt), ++counter, pdfReceipts.size());

      final var fileName = Optional.ofNullable(pdfReceipt.apartment())
          .map(Apartment::number)
          .orElse(pdfReceipt.building().name());

      final var item = PdfReceiptItem.builder()
          .path(pdfReceipt.path())
          .fileName("%s.pdf".formatted(fileName))
          .id(pdfReceipt.id())
          . buildingName(pdfReceipt.building().name())
          .emails(Optional.ofNullable(pdfReceipt.apartment()).map(Apartment::emails).orElse(null))
          .build();

      items.add(item);
    }

    return items;
  }

  public List<CreatePdfReceipt> pdfReceipts(Path path, CalculatedReceipt receipt, Building building,
      List<Apartment> apartments) throws IOException {

    Files.createDirectories(path);
    final var list = new LinkedList<CreatePdfReceipt>();

    final var buildingPdfReceipt = CreatePdfBuildingReceipt.builder()
        .translationProvider(translationProvider)
        .path(path.resolve(building.id() + ".pdf"))
        .receipt(receipt)
        .building(building)
        .build();

    list.add(buildingPdfReceipt);

    apartments.stream()
        .<CreatePdfReceipt>map(apartment -> {
          return CreatePdfAptReceipt.builder()
              .translationProvider(translationProvider)
              .title("AVISO DE COBRO")
              .path(path.resolve(apartment.number() + ".pdf"))
              .receipt(receipt)
              .apartment(apartment)
              .building(building)
              .build();

        })
        .forEach(list::add);

    return list;
  }

  public FileResponse zipReceipt(CalculatedReceipt calculatedReceipt) throws IOException {
    final var pdfReceiptItems = pdfItems(calculatedReceipt);
    return zipPath(calculatedReceipt, pdfReceiptItems);
  }
}
