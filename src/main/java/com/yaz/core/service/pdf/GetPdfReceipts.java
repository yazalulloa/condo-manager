package com.yaz.core.service.pdf;

import com.yaz.core.service.TranslationProvider;
import com.yaz.core.service.domain.CalculatedReceipt;
import com.yaz.core.service.domain.FileResponse;
import com.yaz.core.util.ZipUtility;
import com.yaz.persistence.entities.Apartment;
import com.yaz.persistence.entities.Building;
import io.reactivex.rxjava3.core.Observable;
import io.reactivex.rxjava3.core.Single;
import io.reactivex.rxjava3.schedulers.Schedulers;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collection;
import java.util.Comparator;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class GetPdfReceipts {

  private final TranslationProvider translationProvider;


  public String fileName(CalculatedReceipt receipt) {
    final var month = translationProvider.translate(receipt.month().name());
    return "%s_%s_%s".formatted(receipt.building().id(), month, receipt.date());
  }

  public FileResponse zipPath(CalculatedReceipt receipt, Collection<PdfReceiptItem> list) throws IOException {
    // asyncSubject.onNext(ReceiptPdfProgressState.ofIndeterminate("Creando zip..."));

    final var dirPath = Paths.get("tmp", "receipts", receipt.building().id(), String.valueOf(receipt.id()));
    final var fileName = fileName(receipt) + ".zip";
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

  public Single<Collection<PdfReceiptItem>> pdfItems(CalculatedReceipt receipt) {
    return Single.defer(() -> {
      final var start = System.currentTimeMillis();

      final var tempPath = Paths.get("tmp", "receipts", receipt.building().id(), String.valueOf(receipt.id()));
      //asyncSubject.onNext(ReceiptPdfProgressState.ofIndeterminate("Calculando..."));
      final var pdfReceipts = pdfReceipts(tempPath, receipt, receipt.building(), receipt.apartments());

      var counter = 0;

      return Observable.fromIterable(pdfReceipts)
          .map(pdfReceipt -> {

            return Single.fromCallable(() -> {
              final var millis = System.currentTimeMillis();
              pdfReceipt.createPdf();
              log.debug("Create pdf: {} millis: {}", pdfReceipt.path(), System.currentTimeMillis() - millis);
              final var buildingName = pdfReceipt.building().name();

              final var apt = Optional.ofNullable(pdfReceipt.apartment())
                  .map(Apartment::number)
                  .orElse("");

              //updateState("Creando archivos %s %s ".formatted(buildingName, apt), ++counter, pdfReceipts.size());

              final var fileName = Optional.ofNullable(pdfReceipt.apartment())
                  .map(Apartment::number)
                  .orElse(pdfReceipt.building().name());

              return PdfReceiptItem.builder()
                  .path(pdfReceipt.path())
                  .fileName("%s.pdf".formatted(fileName))
                  .id(pdfReceipt.id())
                  .name(pdfReceipt.name())
                  .buildingId(pdfReceipt.building().id())
                  .buildingName(pdfReceipt.building().name())
                  .emails(Optional.ofNullable(pdfReceipt.apartment()).map(Apartment::emails).orElse(null))
                  .build();
            }).subscribeOn(Schedulers.io());
          })
          .toList()
          .toFlowable()
          .flatMap(Single::merge)
          .sorted(Comparator.comparing(PdfReceiptItem::id))
          .toList()
          .map(list -> {
            final var buildingItem = list.stream().filter(item -> item.id().equals(item.buildingId()))
                .findFirst().orElseThrow();
            list.removeIf(item -> item.id().equals(item.buildingId()));
            list.addFirst(buildingItem);
            return list;
          })
          .doOnSuccess(list -> log.debug("Create pdfs: {} millis", System.currentTimeMillis() - start));
    });
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
}
