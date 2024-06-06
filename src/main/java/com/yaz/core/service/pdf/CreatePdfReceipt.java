package com.yaz.core.service.pdf;

import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.yaz.persistence.entities.Apartment;
import com.yaz.persistence.entities.Building;
import java.io.IOException;
import java.nio.file.Path;
import java.util.Optional;

public abstract class CreatePdfReceipt {

  public void createPdf() {
    try (
        final var writer = new PdfWriter(path().toFile());
        final var pdf = new PdfDocument(writer);
        final var document = new Document(pdf)) {

      document.setMargins(18, 18, 18, 18);
      document.setFontSize(10);
      addContent(document);

    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }

  public abstract Path path();

  public String id() {
    return Optional.ofNullable(apartment())
        .map(Apartment::number)
        .or(() -> Optional.ofNullable(building()).map(Building::id))
        .orElse(null);
  }

  public String name() {
    return Optional.ofNullable(apartment())
        .map(Apartment::name)
        .or(() -> Optional.ofNullable(building()).map(Building::name))
        .orElse(null);
  }

  public abstract Apartment apartment();

  public abstract Building building();

  protected abstract void addContent(Document document);
}
