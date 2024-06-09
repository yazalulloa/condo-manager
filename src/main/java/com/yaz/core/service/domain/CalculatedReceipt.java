package com.yaz.core.service.domain;

import com.yaz.persistence.domain.Currency;
import com.yaz.persistence.domain.ExpenseType;
import com.yaz.persistence.domain.ReserveFundType;
import com.yaz.persistence.entities.Apartment;
import com.yaz.persistence.entities.Building;
import com.yaz.persistence.entities.Expense;
import com.yaz.persistence.entities.ExtraCharge;
import com.yaz.persistence.entities.Rate;
import com.yaz.persistence.entities.Receipt;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.Month;
import java.util.List;
import java.util.Map;
import java.util.Set;
import lombok.Builder;

@Builder(toBuilder = true)
public record CalculatedReceipt(
    long id,
    int year,
    Month month,
    LocalDate date,
    List<Expense> expenses,
    BigDecimal totalCommonExpenses,
    Currency totalCommonExpensesCurrency,
    BigDecimal totalUnCommonExpenses,
    Currency totalUnCommonExpensesCurrency,
    List<AptDebt> debts,
    List<AptTotal> aptTotals,
    BigDecimal totalDebt,
    Integer debtReceiptsAmount,
    List<ExtraCharge> extraCharges,
    Rate rate,
    List<ReserveFundTotal> reserveFundTotals,
    Building building,
    List<Apartment> apartments,
    String emailConfigId,
    Receipt receipt,
    String clientId
) {

  @Builder(toBuilder = true)
  public record AptTotal(
      String number,
      String name,
      Map<Currency, BigDecimal> amounts,
      List<ExtraCharge> extraCharges
  ) {

  }

  @Builder(toBuilder = true)
  public record ReserveFundTotal(
      String name,
      BigDecimal fund,
      BigDecimal expense,
      BigDecimal amount,
      ReserveFundType type,
      ExpenseType expenseType,
      BigDecimal pay,
      Boolean addToExpenses
  ) {

  }

  @Builder(toBuilder = true)
  public record AptDebt(
      String aptNumber,
      String name,

      int receipts,

      BigDecimal amount,

      Set<Integer> months,

      BigDecimal previousPaymentAmount,

      Currency previousPaymentAmountCurrency
  ) {

  }
}
