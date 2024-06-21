package com.yaz.core.util;

import com.yaz.api.domain.ExpenseTotals;
import com.yaz.api.domain.ExpenseTotals.Total;
import com.yaz.api.domain.response.ExpenseTableItem;
import com.yaz.persistence.domain.Currency;
import com.yaz.persistence.domain.ExpenseType;
import com.yaz.persistence.domain.ReserveFundType;
import com.yaz.persistence.entities.Expense;
import com.yaz.persistence.entities.ReserveFund;
import io.vertx.core.json.JsonObject;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.text.NumberFormat;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.UUID;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import org.apache.commons.lang3.time.DurationFormatUtils;
import org.apache.commons.lang3.tuple.Pair;
//import org.apache.commons.lang3.time.DurationFormatUtils;

public class ConvertUtil {

  public static final NumberFormat VE_FORMAT;
  public static final NumberFormat US_FORMAT;

  static {

    final var veSymbols = new DecimalFormatSymbols(Locale.of("es", "VE"));
    veSymbols.setCurrencySymbol("Bs. ");

    VE_FORMAT = new DecimalFormat("¤#,##0.00;¤-#,##0.00", veSymbols);

    //veFormat = DecimalFormat.getCurrencyInstance(locale);
    final var usSymbols = new DecimalFormatSymbols(Locale.US);
    usSymbols.setCurrencySymbol("$ ");
    //"¤#,##0.00"
    US_FORMAT = new DecimalFormat("¤#,##0.00;¤-#,##0.00", usSymbols);
    //usFormat = DecimalFormat.getCurrencyInstance(Locale.US);
  }


  public static <T, S> List<T> toList(Collection<S> collection, Function<S, T> function) {

    if (collection == null) {
      return Collections.emptyList();
    }

    return collection.stream().map(function).collect(Collectors.toCollection(LinkedList::new));
  }

  public static String format(BigDecimal amount, Currency currency) {
    final var numberFormat = Optional.ofNullable(currency)
        .orElse(Currency.VED)
        .numberFormat();

    final var decimal = Optional.ofNullable(amount)
        .orElse(BigDecimal.ZERO);

    return numberFormat.format(decimal);
  }

  public static Pair<BigDecimal, Currency> pair(Collection<Expense> collection,
      Predicate<Expense> predicate, BigDecimal usdRate) {

    final var usdAmount = collection.stream().filter(predicate)
        .filter(o -> o.currency() == Currency.USD)
        .map(Expense::amount)
        .reduce(BigDecimal::add)
        .orElse(BigDecimal.ZERO);

    final var vedAmount = collection.stream().filter(predicate)
        .filter(o -> o.currency() == Currency.VED)
        .map(Expense::amount)
        .reduce(BigDecimal::add)
        .orElse(BigDecimal.ZERO);

    if (!DecimalUtil.equalsToZero(vedAmount)) {
      final var amount = usdAmount.multiply(usdRate)
          .add(vedAmount)
          .setScale(2, RoundingMode.HALF_UP);

      return Pair.of(amount, Currency.VED);
    }

    return Pair.of(usdAmount, Currency.USD);
  }

    /*public static <T extends IAmountCurrency> Pair<BigDecimal, Currency> pair(Collection<T> collection, BigDecimal usdRate) {
        return pair(collection, r -> true, usdRate);
    }*/

    /*public static <T extends IAmountCurrency> Pair<BigDecimal, Currency> pair(Collection<T> collection, Predicate<T> predicate, BigDecimal usdRate) {


        final var usdAmount = collection.stream().filter(predicate)
                .filter(o -> o.currency() == Currency.USD)
                .map(IAmountCurrency::amount)
                .reduce(BigDecimal::add)
                .orElse(BigDecimal.ZERO);

        final var vedAmount = collection.stream().filter(predicate)
                .filter(o -> o.currency() == Currency.VED)
                .map(IAmountCurrency::amount)
                .reduce(BigDecimal::add)
                .orElse(BigDecimal.ZERO);


        if (!DecimalUtil.equalsToZero(vedAmount)) {
            final var amount = usdAmount.multiply(usdRate)
                    .add(vedAmount)
                    .setScale(2, RoundingMode.HALF_UP);

            return Pair.of(amount, Currency.VED);
        }

        return Pair.of(usdAmount, Currency.USD);
    }*/

  public static Integer parseInteger(String str) {
    try {
      return Integer.parseInt(str);
    } catch (Exception e) {
      return null;
    }
  }

    /*public static Comparator<Apartment> aptNumberComparator() {
        return (o1, o2) -> {
            final var lhs = o1.apartmentId().number();
            final var rhs = o2.apartmentId().number();

            return compareAptNumbers(lhs, rhs);
        };
    }*/

  public static int compareAptNumbers(String lhs, String rhs) {
    final var lhsInt = ConvertUtil.parseInteger(lhs);
    final var rhsInt = ConvertUtil.parseInteger(rhs);

    if (lhsInt != null && rhsInt != null) {
      return lhsInt.compareTo(rhsInt);
    }

    if (lhsInt == null && rhsInt == null) {
      return lhs.compareTo(rhs);
    }

    if (lhsInt == null) {
      return 1;
    }

    return -1;
  }

   /* public static Comparator<PdfReceiptItem> pdfReceiptItemComparator() {
        return (o1, o2) -> {
            final var lhs = o1.id();
            final var rhs = o2.id();

            return compareAptNumbers(lhs, rhs);
        };
    }*/

  public static Long toLong(String str) {
    try {
      return Long.parseLong(str);
    } catch (Exception ignored) {
      return null;
    }
  }


  public static String formatDuration(long time) {
    return DurationFormatUtils.formatDuration(time, "HH:mm:ss", false);
  }

  public static void formatDate(String field, JsonObject jsonObject) {
    Optional.ofNullable(jsonObject.getString(field))
        .map(LocalDateTime::parse)
        .map(localDateTime -> ZonedDateTime.of(localDateTime, DateUtil.VE_ZONE))
        .map(DateUtil::formatVe)
        .ifPresent(str -> jsonObject.put(field, str));
  }

  public static <T extends Enum<T>> T valueOfEnum(Class<T> enumType, String name) {
    try {
      return Enum.valueOf(enumType, name);
    } catch (Exception e) {
      return null;
    }
  }

  public static String formatUserId(String userId) {
    final var first = userId.substring(0, 10);
    final var firstReverse = new StringBuilder(first).reverse().toString();

    final var second = userId.substring(10);
    final var split = second.split("-");

    final int[] array = randPos();

    final var stringBuilder = new StringBuilder();

    for (int i : array) {
      stringBuilder.append(split[i]).append("-");
    }
    stringBuilder.deleteCharAt(stringBuilder.length() - 1);

    for (int i : array) {
      stringBuilder.append(i);
    }

    final var actualLength = stringBuilder.length() + firstReverse.length();

    final var randNumb = RandomUtil.getRandNumb(62 - actualLength);

    final var length = randNumb.length();

    return firstReverse + stringBuilder + randNumb + (length < 10 ? "0" : "") + length;
  }

  public static String getUserId(String str) {

    final var random = Integer.parseInt(str.substring(str.length() - 2));
    final var uuidStr = str.substring(10, str.length() - (2 + random));

    final var stringBuilder = new StringBuilder(str.substring(0, 10)).reverse();
    final var split = uuidStr.substring(0, uuidStr.length() - 5).split("-");
    final var posCharArray = uuidStr.substring(uuidStr.length() - 5).toCharArray();

    final var temp = new String[5];

    for (int i = 0; i < 5; i++) {
      final var pos = Integer.parseInt(String.valueOf(posCharArray[i]));
      temp[pos] = split[i];
    }

    for (String s : temp) {
      stringBuilder.append(s).append("-");
    }

    stringBuilder.deleteCharAt(stringBuilder.length() - 1);

    return stringBuilder.toString();
  }

  public static int[] randPos() {
    final int[] array = {0, 1, 2, 3, 4};
    final var rand = RandomUtil.getInstance();

    for (int i = 0; i < array.length; i++) {
      int randomIndexToSwap = rand.nextInt(array.length);
      int temp = array[randomIndexToSwap];
      array[randomIndexToSwap] = array[i];
      array[i] = temp;
    }

    if (Arrays.equals(array, new int[]{0, 1, 2, 3, 4})) {
      return randPos();
    }

    return array;
  }

  public static ExpenseTotals expenseTotals(BigDecimal rate, List<Expense> expenses) {
    final var totalCommonExpensePair = ConvertUtil.pair(expenses, r -> r.type() == ExpenseType.COMMON,
        rate);

    final var totalUnCommonExpensePair = ConvertUtil.pair(expenses, r -> r.type() == ExpenseType.UNCOMMON,
        rate);

    return ExpenseTotals.builder()
        .common(new Total(totalCommonExpensePair.getKey(), totalCommonExpensePair.getValue()))
        .unCommon(new Total(totalUnCommonExpensePair.getKey(), totalUnCommonExpensePair.getValue()))
        .build();
  }

  public static List<ExpenseTableItem> reserveFundExpenses(ExpenseTotals expenseTotalsBeforeReserveFunds,
      List<ReserveFund> reserveFunds, List<Expense> expenses) {
    final var reserveFundExpenses = new ArrayList<ExpenseTableItem>();

    for (ReserveFund reserveFund : reserveFunds) {
      final var expenseTableItem = reserveFundExpense(expenseTotalsBeforeReserveFunds, reserveFund);
      if (expenseTableItem != null) {
        reserveFundExpenses.add(expenseTableItem);
        expenses.add(expenseTableItem.item());
      }
    }

    return reserveFundExpenses;
  }

  public static ExpenseTableItem reserveFundExpense(ExpenseTotals expenseTotalsBeforeReserveFunds,
      ReserveFund reserveFund) {
    if (!reserveFund.active() || !reserveFund.addToExpenses()) {
      return null;
    }

    final var expenseTotal =
        reserveFund.expenseType() == ExpenseType.COMMON ? expenseTotalsBeforeReserveFunds.common() :
            expenseTotalsBeforeReserveFunds.unCommon();

    final var amount = reserveFund.type() == ReserveFundType.PERCENTAGE ?
        DecimalUtil.percentageOf(reserveFund.pay(), expenseTotal.amount()) : reserveFund.pay();

    final var descriptionSuffix =
        reserveFund.type() == ReserveFundType.PERCENTAGE ? " " + reserveFund.pay() + "%" : "";

    final var expenseReserveFund = Expense.builder()
        .buildingId(reserveFund.buildingId())
        .receiptId(reserveFund.id())
        .id(reserveFund.id())
        .description(reserveFund.name() + descriptionSuffix)
        .amount(amount)
        .currency(expenseTotal.currency())
        .reserveFund(true)
        .type(reserveFund.expenseType())
        .build();

    return ExpenseTableItem.builder()
        .key("")
        .item(expenseReserveFund)
        .cardId(UUID.randomUUID().toString())
        .build();

  }
}
