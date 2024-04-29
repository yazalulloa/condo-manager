package com.yaz.core.service.csv;

import com.yaz.core.service.TranslationProvider;
import com.yaz.core.service.entity.BuildingService;
import com.yaz.core.util.DecimalUtil;
import com.yaz.core.util.StringUtil;
import com.yaz.persistence.domain.Currency;
import com.yaz.persistence.domain.ExpenseType;
import com.yaz.persistence.entities.Debt;
import com.yaz.persistence.entities.Expense;
import com.yaz.persistence.entities.ExtraCharge;
import com.yaz.persistence.entities.ExtraCharge.Type;
import io.reactivex.rxjava3.core.Single;
import io.vertx.rxjava3.core.Vertx;
import jakarta.inject.Inject;
import java.math.BigDecimal;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.stream.Collectors;
import lombok.Builder;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

@Slf4j
//@LookupIfProperty(name = "app.poi.parsing", stringValue = "workbook")
//@Named("workbook")
//@ApplicationScoped
public class ReceiptParserSheet extends ReceiptParserAbstractImpl {

  private final Vertx vertx;

  @Inject
  public ReceiptParserSheet(Vertx vertx) {
    this.vertx = vertx;
  }

  @Override
  protected Vertx vertx() {
    return vertx;
  }

  @Override
  public Single<CsvReceipt> parse(Path path) {
    return Single.fromSupplier(() -> {
      try (final var workbook = new XSSFWorkbook(path.toFile())) {

        final var numberOfSheets = workbook.getNumberOfSheets();

        final var expensesSheet = workbook.getSheetAt(0);
        final var debtsSheet = workbook.getSheetAt(1);
        final var possibleExtraChargesSheet = numberOfSheets > 2 && workbook.getSheetAt(2) != null;
        final var reserveFundSheet = numberOfSheets > 3 ? workbook.getSheetAt(3) : null;

        final var extraChargesSheet = numberOfSheets > 4 ? workbook.getSheetAt(4) : null;

        final var expenses = expenses(expensesSheet);
        final var debts = debts(debtsSheet);
        final var extraCharges = Optional.ofNullable(extraChargesSheet)
            .map(this::extraCharges)
            .orElseGet(ArrayList::new);

        Optional.ofNullable(numberOfSheets > 2 ? workbook.getSheetAt(2) : null)
            .ifPresent(sheet -> {
              extraCharges.addAll(extraChargesV2(sheet));
            });

        return CsvReceipt.builder()
            .expenses(expenses)
            .debts(debts)
            .extraCharges(extraCharges)
            .build();
      }
    });
  }

  private List<Expense> expenses(Sheet sheet) {
    final var expenses = new LinkedList<Expense>();

    var type = ExpenseType.COMMON;
    for (final org.apache.poi.ss.usermodel.Row row : sheet) {

      final var list = PoiUtil.toList(row);

      if (type == ExpenseType.UNCOMMON && list.isEmpty()) {
        break;
      }

      if (!list.isEmpty()) {
        if (list.getFirst().contains("GASTOS NO COMUNES")) {
          type = ExpenseType.UNCOMMON;
        }

      }

      if (list.size() >= 2) {
        final var description = list.get(0).replaceAll("\\s{2,}", " ").trim();
        final var amount = list.get(1).trim();

        if (description.contains("GASTOS_COMUNES")) {
          type = ExpenseType.UNCOMMON;
          continue;
        }

        if (!PoiUtil.isThereIsANumber(amount)) {
          continue;
        }

        expenses.add(Expense.builder()
            .description(description)
            .amount(PoiUtil.decimal(amount))
            .type(type)
            .currency(Currency.VED)
            .build());
      }
    }

    final var comparator = Comparator.comparing(Expense::type)
        //.thenComparing(Expense::description)
        ;

    return expenses.stream().sorted(comparator)
        .collect(Collectors.toCollection(LinkedList::new));
  }

  private List<Debt> debts(Sheet sheet) {
    final var debts = new LinkedList<Debt>();

    for (final org.apache.poi.ss.usermodel.Row row : sheet) {
      final var list = PoiUtil.toList(row);
      if (list.size() >= 4) {

        try {
          final var apt = PoiUtil.apt(list.get(0).trim());
          final var name = list.get(1).trim();
          final var receipts = list.get(2).trim();
          final var amount = list.get(3).trim();

          if (!amount.isEmpty() && !StringUtil.isNumeric(amount)) {
            continue;
          }

          final var status = list.size() > 4 ? list.get(4) : "";
          final var abono = list.size() > 5 ? list.get(5) : null;

          final var previousPaymentCurrency = Optional.ofNullable(abono)
              .map(str -> str.contains("$"))
              .map(b -> Currency.USD)
              .orElse(null);

          final var previousPaymentAmount = Optional.ofNullable(abono)
              .map(str -> str.replace("$", "").trim())
              .filter(str -> !str.equals("OJO"))
              .filter(s -> !s.isEmpty())
              .map(PoiUtil::decimal)
              .orElse(null);

          final var amountDecimal = amount.isEmpty() ? BigDecimal.ZERO : PoiUtil.decimal(amount);

          final var debt = Debt.builder()
              .aptNumber(apt)
              //.name(name)
              .receipts(PoiUtil.decimal(receipts).intValue())
              .amount(amountDecimal)
              .months(months(status))
              .previousPaymentAmount(previousPaymentAmount)
              .previousPaymentAmountCurrency(previousPaymentCurrency)
              .build();

          debts.add(debt);
        } catch (Exception e) {
          throw new RuntimeException(sheet.getSheetName() + " " + row.getRowNum(), e);
        }
      }
    }

    return debts.stream().sorted(Comparator.comparing(Debt::aptNumber))
        .collect(Collectors.toCollection(LinkedList::new));
  }

  private List<ExtraCharge> extraCharges(Sheet sheet) {
    final var extraCharges = new LinkedList<ExtraCharge>();
    boolean skipFirst = false;
    for (final Row row : sheet) {
      final var list = PoiUtil.toList(row);
      if (list.size() >= 3) {
        if (!skipFirst) {
          skipFirst = true;
          continue;
        }

        final var apt = PoiUtil.apt(list.getFirst().trim());
        final var description = list.get(1).trim();
        final var amount = list.get(2).trim();

        final var currencyType = Optional.of(list)
            .filter(l -> l.size() > 3)
            .map(l -> l.get(3))
            .map(String::trim)
            .map(Currency::valueOf)
            .orElse(Currency.VED);

        final var extraCharge = ExtraCharge.builder()
            //.aptNumber(apt)
            .description(description)
            .amount(PoiUtil.decimal(amount).doubleValue())
            .currency(currencyType)
            .build();

        extraCharges.add(extraCharge);
      }
    }

    return extraCharges.stream().sorted(Comparator
                .comparing(ExtraCharge::description)
            // .thenComparing(ExtraCharge::aptNumber)
        )
        .collect(Collectors.toCollection(LinkedList::new));
  }

  private List<ExtraCharge> extraChargesV2(Sheet sheet) {
    final var list = new ArrayList<ExtraChargeKey>();
    final var afterDesc = new AtomicBoolean(false);
    for (Row row : sheet) {

      final var cellIterator = row.iterator();

      while (cellIterator.hasNext()) {
        final var initCell = cellIterator.next();

        final var cellValue = PoiUtil.cellToString(initCell);
        final var cellColumn = String.valueOf(initCell.getAddress().getColumn());

        if (cellValue.equals("APTO") || cellValue.equals("MONTO")) {
          afterDesc.set(true);
          break;
        }

        if (!afterDesc.get()) {
          list.stream().filter(key -> key.columnAddr.equals(cellColumn))
              .findFirst()
              .ifPresent(extraChargeKey -> {

                if (afterDesc.get()) {
                  extraChargeKey.getApartments().add(cellValue);
                  //extraChargeKey.addExtraCharge(cellValue, null);
                } else {
                  list.remove(extraChargeKey);
                }

              });

          if (!afterDesc.get()) {
            list.add(ExtraChargeKey.builder()
                .columnAddr(cellColumn)
                .description(cellValue)
                .build());
          }
        } else {
          list.stream().filter(key -> key.columnAddr.equals(cellColumn))
              .findFirst()
              .ifPresent(extraChargeKey -> {

                if (!cellIterator.hasNext()) {
                  return;
                }

                final var amountStr = PoiUtil.cellToString(cellIterator.next()).trim().replace(",", "");

                if (!StringUtil.isNumeric(amountStr)) {
                  return;
                }

                final var amount = DecimalUtil.decimal(amountStr);
                if (extraChargeKey.getAmount() != null && !DecimalUtil.equalsTo(extraChargeKey.getAmount(), amount)) {
                  final var first = list.stream().filter(
                          key -> key.columnAddr.equals(cellColumn) && key.amount != null && DecimalUtil.equalsTo(
                              key.amount, amount))
                      .findFirst();

                  if (first.isPresent()) {
                    first.get().apartments.add(cellValue);
                  } else {
                    final var chargeKey = ExtraChargeKey.builder()
                        .columnAddr(cellColumn)
                        .description(extraChargeKey.description)
                        .amount(amount)
                        .build();

                    chargeKey.apartments.add(cellValue);
                    list.add(chargeKey);
                  }

                } else {
                  extraChargeKey.setAmount(amount);
                  extraChargeKey.getApartments().add(cellValue);
                }

              });
        }

      }
    }

    return list.stream()
        .filter(key -> key.amount != null && !key.apartments.isEmpty())
        .map(key -> ExtraCharge.builder()
            .type(Type.RECEIPT)
            .description(key.description)
            .amount(key.amount.doubleValue())
            .currency(Currency.VED)
            .active(true)
            .apartments(key.apartments.stream()
                .map(apt -> ExtraCharge.Apt.builder()
                    .number(apt)
                    .build())
                .toList())
            .build())
        .sorted(Comparator
            .comparing(ExtraCharge::description))
        .toList();
  }

  @Data
  @Builder
  private static class ExtraChargeKey {

    private String columnAddr;
    private String description;
    private BigDecimal amount;
    @Builder.Default
    private Set<String> apartments = new HashSet<>();
  }
}
