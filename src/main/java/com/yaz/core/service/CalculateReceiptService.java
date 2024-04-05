package com.yaz.core.service;

import com.yaz.core.service.domain.CalculatedReceipt;
import com.yaz.core.service.domain.CalculatedReceipt.AptDebt;
import com.yaz.core.service.domain.CalculatedReceipt.AptTotal;
import com.yaz.core.service.domain.CalculatedReceipt.ReserveFundTotal;
import com.yaz.core.service.entity.DebtService;
import com.yaz.core.service.entity.ExpenseService;
import com.yaz.core.service.entity.ReceiptService;
import com.yaz.core.service.entity.ReserveFundService;
import com.yaz.core.util.ConvertUtil;
import com.yaz.core.util.DecimalUtil;
import com.yaz.core.util.MutinyUtil;
import com.yaz.persistence.domain.Currency;
import com.yaz.persistence.domain.ExpenseType;
import com.yaz.persistence.domain.ReserveFundType;
import com.yaz.persistence.entities.Apartment;
import com.yaz.persistence.entities.Building;
import com.yaz.persistence.entities.Debt;
import com.yaz.persistence.entities.Expense;
import com.yaz.persistence.entities.ExtraCharge;
import com.yaz.persistence.entities.Receipt;
import com.yaz.core.service.entity.ApartmentService;
import com.yaz.core.service.entity.BuildingService;
import com.yaz.core.service.entity.ExtraChargeService;
import com.yaz.core.service.entity.RateService;
import com.yaz.core.util.Constants;
import com.yaz.core.util.RxUtil;
import io.quarkus.cache.CacheResult;
import io.reactivex.rxjava3.core.Maybe;
import io.reactivex.rxjava3.core.Single;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.time.Month;
import java.util.Collection;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.UnaryOperator;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class CalculateReceiptService {

  private final BuildingService buildingService;
  private final ApartmentService apartmentService;
  private final ReserveFundService reserveFundService;
  private final ReceiptService receiptService;
  private final ExpenseService expenseService;
  private final DebtService debtService;
  private final ExtraChargeService extraChargeService;
  private final RateService rateService;

  @CacheResult(cacheName = "calculated_receipt", lockTimeout = Constants.CACHE_TIMEOUT)
  public Uni<CalculatedReceipt> calculate(String buildingId, long receiptId) {

    final var receiptSingle = RxUtil.toMaybe(receiptService.read(receiptId))
        .flatMap(Maybe::fromOptional)
        .switchIfEmpty(Single.error(new IllegalArgumentException("Receipt not found")))
        .cache();

    final var buildingSingle = RxUtil.toMaybe(buildingService.get(buildingId))
        .flatMap(Maybe::fromOptional)
        .switchIfEmpty(Single.error(new IllegalArgumentException("Building not found")));

    final var reserveFundsSingle = RxUtil.single(reserveFundService.listByBuilding(buildingId));

    final var apartmentsSingle = RxUtil.single(apartmentService.apartmentsByBuilding(buildingId));

    final var expensesSingle = RxUtil.single(expenseService.readByReceipt(buildingId, receiptId));

    final var debtsSingle = RxUtil.single(debtService.readByReceipt(buildingId, receiptId));

    final var extraChargesSingle = RxUtil.single(extraChargeService.listOnlyByBuilding(buildingId));

    final var rateSingle = receiptSingle.map(Receipt::rateId)
        .map(rateService::read)
        .flatMap(RxUtil::single)
        .flatMapMaybe(Maybe::fromOptional)
        .switchIfEmpty(Single.error(new IllegalArgumentException("Rate not found")));

    final var calculatedReceiptSingle = Single.zip(receiptSingle, buildingSingle, reserveFundsSingle, apartmentsSingle,
        expensesSingle,
        debtsSingle,
        extraChargesSingle, rateSingle,
        (receipt, building, reserveFundList, apartments, expenseList, debtList, extraChargeList, rate) -> {

          final var expenses = expenseList.stream()
              .filter(expense -> !expense.description().equals("DIFERENCIA DE ALIQUOTA"))
              .filter(expense -> !expense.reserveFund())
              .collect(Collectors.toCollection(LinkedList::new));

          final var totalCommonExpensePair = ConvertUtil.pair(expenses,
              r -> r.type() == ExpenseType.COMMON && !r.reserveFund(), rate.rate());
          final var totalCommonExpensesBeforeReserveFund = totalCommonExpensePair.getLeft();

          final var debtReceiptsAmount = debtList.stream().map(Debt::receipts)
              .reduce(Integer::sum)
              .orElse(0);

          final var debtTotal = debtList.stream().map(Debt::amount)
              .reduce(BigDecimal::add)
              .orElse(BigDecimal.ZERO);

          final var reserveFundTotals = reserveFundList
              .stream()
              .filter(reserveFund -> reserveFund.active() && DecimalUtil.greaterThanZero(reserveFund.pay()))
              .map(reserveFund -> {

                final var amount = reserveFund.type() == ReserveFundType.FIXED_PAY ? reserveFund.pay() :
                    DecimalUtil.percentageOf(reserveFund.pay(), totalCommonExpensesBeforeReserveFund);

                return ReserveFundTotal.builder()
                    .name(reserveFund.name())
                    .fund(reserveFund.fund())
                    .expense(reserveFund.expense())
                    .amount(amount)
                    .type(reserveFund.type())
                    .expenseType(reserveFund.expenseType())
                    .pay(reserveFund.pay())
                    .addToExpenses(reserveFund.addToExpenses())
                    .build();
              })
              .toList();

          final var totalCommonExpenses = reserveFundTotals.stream()
              .filter(ReserveFundTotal::addToExpenses)
              .filter(res -> res.expenseType() == ExpenseType.COMMON)
              .map(ReserveFundTotal::amount)
              .reduce(BigDecimal::add)
              .orElse(BigDecimal.ZERO)
              .add(totalCommonExpensesBeforeReserveFund);

          reserveFundTotals.stream().filter(ReserveFundTotal::addToExpenses).map(fund -> {
            final var isFixedPay = fund.type() == ReserveFundType.FIXED_PAY;
            return Expense.builder()
                .description(fund.name() + " " + fund.pay() + (isFixedPay ? "" : "%"))
                .amount(fund.amount())
                .currency(totalCommonExpensePair.getRight())
                .type(fund.expenseType())
                .reserveFund(true)
                .build();
          }).forEach(expenses::add);

          final var aliquotDifference = aliquotDifference(apartments, totalCommonExpenses);

          expenses.add(Expense.builder()
              .description("DIFERENCIA DE ALIQUOTA")
              .amount(aliquotDifference)
              .currency(totalCommonExpensePair.getRight())
              .type(ExpenseType.UNCOMMON)
              .build());

          final var totalUnCommonExpensePair = ConvertUtil.pair(expenses, r -> r.type() == ExpenseType.UNCOMMON,
              rate.rate());

          final var totalUnCommonExpenses = totalUnCommonExpensePair.getLeft();

          final var equalsToZero = DecimalUtil.equalsToZero(totalUnCommonExpenses);
          final var unCommonPay =
              equalsToZero ? BigDecimal.ZERO : totalUnCommonExpenses
                  .divide(BigDecimal.valueOf(apartments.size()), MathContext.DECIMAL128);

          final var buildingExtraCharges = extraChargeList.stream()
              .filter(extraCharge -> extraCharge.secondaryId().equals(extraCharge.buildingId()))
              .toList();

          final var receiptExtraCharges = extraChargeList.stream()
              .filter(extraCharge -> extraCharge.secondaryId().equals(String.valueOf(receipt.id())))
              .toList();

          final var aptTotals = apartments.stream()
              .map(apartment -> {

                final var extraCharges = extraCharges(apartment.number(), buildingExtraCharges,
                    receiptExtraCharges);

                final var amounts = totalAptPay(unCommonPay, building, rate.rate(), totalCommonExpenses,
                    apartment.aliquot(), extraCharges);

                return AptTotal.builder()
                    .number(apartment.number())
                    .name(apartment.name())
                    //.amount(amounts.get(Currency.USD))
                    .amounts(amounts)
                    .extraCharges(extraCharges)
                    .build();

              })
              .collect(Collectors.toCollection(LinkedList::new));

          final var debts = apartments.stream()
              .map(apartment -> {
                final var optionalDebt = debtList.stream()
                    .filter(debt -> debt.aptNumber().equals(apartment.number()))
                    .findFirst();

                return AptDebt.builder()
                    .aptNumber(apartment.number())
                    .name(apartment.name())
                    .amount(optionalDebt.map(Debt::amount).orElse(BigDecimal.ZERO))
                    .receipts(optionalDebt.map(Debt::receipts).orElse(0))
                    .months(optionalDebt.map(Debt::months).orElse(Collections.emptySet()))
                    .previousPaymentAmount(optionalDebt.map(Debt::previousPaymentAmount).orElse(BigDecimal.ZERO))
                    .previousPaymentAmountCurrency(optionalDebt.map(Debt::previousPaymentAmountCurrency)
                        .orElse(Currency.VED))
                    .build();
              })
              .toList();

          return CalculatedReceipt.builder()
              .id(receipt.id())
              .year(receipt.year())
              .month(Month.of(receipt.month()))
              .date(receipt.date())
              .rate(rate)
              .expenses(expenses)
              .totalCommonExpenses(totalCommonExpenses)
              .totalCommonExpensesCurrency(totalCommonExpensePair.getRight())
              .totalUnCommonExpenses(totalUnCommonExpenses)
              .totalUnCommonExpensesCurrency(totalUnCommonExpensePair.getRight())
              .totalDebt(debtTotal)
              .debtReceiptsAmount(debtReceiptsAmount)
              .debts(debts)
              .aptTotals(aptTotals)
              .reserveFundTotals(reserveFundTotals)
              .apartments(apartments)
              .building(building)
              .emailConfigId(building.emailConfigId())
              .build();
        });

    return MutinyUtil.toUni(calculatedReceiptSingle);
  }

  private BigDecimal aliquotDifference(Collection<Apartment> list, BigDecimal totalCommonExpenses) {

    if (DecimalUtil.equalsToZero(totalCommonExpenses)) {
      return BigDecimal.ZERO;
    }

    final var totalAliquot = list.stream()
        .map(Apartment::aliquot)
        .map(aliquot -> DecimalUtil.percentageOf(aliquot, totalCommonExpenses))
        .reduce(BigDecimal::add)
        .orElseThrow(() -> new RuntimeException("NO_ALIQUOT_FOUND"));

    final var aliquoutDifference = totalAliquot.subtract(totalCommonExpenses);

    if (DecimalUtil.greaterThanZero(aliquoutDifference)) {
      return aliquoutDifference;
    }

    return BigDecimal.ZERO;
  }

  private Map<Currency, BigDecimal> totalAptPay(BigDecimal unCommonPayPerApt, Building building, BigDecimal rate,
      BigDecimal totalCommonExpenses,
      BigDecimal aptAliquot,
      Collection<ExtraCharge> extraCharges) {

    final var currency = building.mainCurrency();
    var preCalculatedPayment = building.fixedPayAmount();

    if (!building.fixedPay()) {
      final var aliquotAmount = DecimalUtil.percentageOf(aptAliquot, totalCommonExpenses);
      // document.add(new Paragraph("MONTO POR ALIQUOTA: " + currencyType.numberFormat().format(aliquotAmount)));
      preCalculatedPayment = aliquotAmount.add(unCommonPayPerApt);//.setScale(2, RoundingMode.UP);
    }

    return totalPayment(building.fixedPay(), preCalculatedPayment, currency, rate, extraCharges);
  }

  private Map<Currency, BigDecimal> totalPayment(boolean fixedPay,
      BigDecimal preCalculatedPayment,
      Currency currencyType, BigDecimal usdExchangeRate,
      Collection<ExtraCharge> extraCharges) {

    var usdPay = BigDecimal.ZERO;
    var vesPay = BigDecimal.ZERO;

    UnaryOperator<BigDecimal> toUsd = ves -> ves.divide(usdExchangeRate, 2, RoundingMode.HALF_UP);

    UnaryOperator<BigDecimal> toVes = usd -> usd.multiply(usdExchangeRate);

    final var vesExtraCharge = extraCharges.stream().filter(c -> c.currency() == Currency.VED)
        .map(ExtraCharge::amount)
        .map(BigDecimal::valueOf)
        .reduce(BigDecimal::add)
        .orElse(BigDecimal.ZERO);

    final var usdExtraCharge = extraCharges.stream().filter(c -> c.currency() == Currency.USD)
        .map(ExtraCharge::amount)
        .map(BigDecimal::valueOf)
        .reduce(BigDecimal::add)
        .orElse(BigDecimal.ZERO);

    vesPay = vesPay.add(vesExtraCharge)
        .add(DecimalUtil.equalsToZero(usdExtraCharge) ? BigDecimal.ZERO : toVes.apply(usdExtraCharge));
    usdPay = usdPay.add(usdExtraCharge)
        .add(DecimalUtil.equalsToZero(vesExtraCharge) ? BigDecimal.ZERO : toUsd.apply(vesExtraCharge));

    if (fixedPay) {
      if (currencyType == Currency.USD) {
        usdPay = usdPay.add(preCalculatedPayment);
        vesPay = vesPay.add(toVes.apply(preCalculatedPayment));
      } else {
        vesPay = vesPay.add(preCalculatedPayment);
        usdPay = usdPay.add(toUsd.apply(preCalculatedPayment));
      }
    } else {
      vesPay = vesPay.add(preCalculatedPayment);
      usdPay = usdPay.add(toUsd.apply(preCalculatedPayment));
    }

    UnaryOperator<BigDecimal> function = bigDecimal -> {
            /*if (building.roundUpPayments()) {
                return bigDecimal.setScale(0, RoundingMode.UP);
            }*/

      return bigDecimal.setScale(2, RoundingMode.HALF_UP);
    };

    return Map.of(
        Currency.USD, function.apply(usdPay),
        Currency.VED, function.apply(vesPay)
    );
  }

  private List<ExtraCharge> extraCharges(String aptNumber, List<ExtraCharge> first, List<ExtraCharge> second) {

    final var receiptCharges = Optional.ofNullable(first)
        .orElseGet(Collections::emptyList)
        .stream()
        .filter(extraCharge -> extraCharge.apartments().stream().anyMatch(apt -> apt.number().equals(aptNumber)))
        .filter(extraCharge -> DecimalUtil.greaterThanZero(BigDecimal.valueOf(extraCharge.amount())));

    final var buildingCharges = Optional.ofNullable(second)
        .orElseGet(Collections::emptyList)
        .stream()
        .filter(extraCharge -> extraCharge.apartments().stream().anyMatch(apt -> apt.number().equals(aptNumber)))
        .filter(extraCharge -> DecimalUtil.greaterThanZero(BigDecimal.valueOf(extraCharge.amount())));

    return Stream.concat(receiptCharges, buildingCharges).toList();
  }
}
