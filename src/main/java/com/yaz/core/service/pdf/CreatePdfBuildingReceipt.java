package com.yaz.core.service.pdf;

import com.itextpdf.kernel.pdf.canvas.PdfCanvasConstants;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Text;
import com.itextpdf.layout.properties.TextAlignment;
import com.yaz.core.service.TranslationProvider;
import com.yaz.core.service.domain.CalculatedReceipt;
import com.yaz.persistence.domain.Currency;
import com.yaz.persistence.entities.Apartment;
import com.yaz.persistence.entities.Building;
import java.math.BigDecimal;
import java.nio.file.Path;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import lombok.experimental.Accessors;

@Builder(toBuilder = true)
@Accessors(fluent = true)
@ToString
@Getter
public class CreatePdfBuildingReceipt extends CreatePdfReceipt {

  private final TranslationProvider translationProvider;
  private final Path path;
  private final CalculatedReceipt receipt;
  private final Building building;

  @Override
  public Apartment apartment() {
    return null;
  }

  private String translate(String str) {
    return translationProvider.translate(str);
  }

  protected void addContent(Document document) {

    document.add(new Paragraph(new Text("AVISO DE COBRO").setBold()).setTextAlignment(TextAlignment.CENTER));
    document.add(new Paragraph(building().name()));
    document.add(new Paragraph(building().rif()));
    document.add(new Paragraph("MES A PAGAR: " + translate(receipt().month().name())));
    document.add(new Paragraph(receipt().date().toString()));
    document.add(new Paragraph("LISTADO A PAGAR"));

    final var currenciesToShowAmountToPay = building().currenciesToShowAmountToPay();
    final var showMultipleCurrenciesAmountToPay = currenciesToShowAmountToPay.size() > 1;

    if (showMultipleCurrenciesAmountToPay) {
      document.add(new Paragraph("TASA DE CAMBIO USD: " + Currency.USD.format(receipt().rate().rate())));
      document.add(new Paragraph("FECHA DE TASA DE CAMBIO: " + receipt().rate().dateOfRate()));

    }
    document.add(new Paragraph("\n"));

    final var table = PdfUtil.table(showMultipleCurrenciesAmountToPay ? 2 + currenciesToShowAmountToPay.size() : 3);
    table.addHeaderCell(PdfUtil.tableCell().add(new Paragraph("APTO")));
    table.addHeaderCell(PdfUtil.tableCell().add(new Paragraph("PROPIETARIOS")));

    if (showMultipleCurrenciesAmountToPay) {
      currenciesToShowAmountToPay.forEach(currencyType -> {
        table.addHeaderCell(PdfUtil.tableCell().add(new Paragraph("MONTO " + currencyType.name())));
      });
    } else {

      table.addHeaderCell(PdfUtil.tableCell().add(new Paragraph("MONTO")));
    }

    receipt().aptTotals().forEach(aptTotal -> {
      final var aptCell = PdfUtil.tableCell()
          .setTextRenderingMode(PdfCanvasConstants.TextRenderingMode.FILL)
          .setTextAlignment(TextAlignment.CENTER)
          .add(new Paragraph(aptTotal.number()));

      table.addCell(aptCell);

      final var nameCell = PdfUtil.tableCell()
          .setTextRenderingMode(PdfCanvasConstants.TextRenderingMode.FILL)
          .setTextAlignment(TextAlignment.CENTER)
          .add(new Paragraph(aptTotal.name()));

      table.addCell(nameCell);

      if (showMultipleCurrenciesAmountToPay) {
        currenciesToShowAmountToPay.forEach(currencyType -> {

          final var amountCell = PdfUtil.tableCell()
              .setTextRenderingMode(PdfCanvasConstants.TextRenderingMode.FILL)
              .setTextAlignment(TextAlignment.CENTER)
              .add(new Paragraph(currencyType.format(aptTotal.amounts().get(currencyType))));

          table.addCell(amountCell);
        });

      } else {

        final var amountCell = PdfUtil.tableCell()
            .setTextRenderingMode(PdfCanvasConstants.TextRenderingMode.FILL)
            .setTextAlignment(TextAlignment.CENTER)
            .add(new Paragraph(building().mainCurrency().format(aptTotal.amounts().get(building().mainCurrency()))));

        table.addCell(amountCell);
      }


    });
    document.add(table);

    final var total = receipt().aptTotals().stream().map(CalculatedReceipt.AptTotal::amounts)
        .map(m -> m.get(building().mainCurrency())).reduce(BigDecimal::add).orElse(BigDecimal.ZERO);
    document.add(new Paragraph("TOTAL: " + building().mainCurrency().format(total)));
  }
}
