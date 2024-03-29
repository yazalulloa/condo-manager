package com.yaz.util;

import com.yaz.persistence.domain.Currency;
import com.yaz.persistence.entities.Rate;
import io.vertx.core.json.JsonObject;
import io.vertx.mutiny.core.buffer.Buffer;
import io.vertx.mutiny.ext.web.client.HttpResponse;
import jakarta.ws.rs.core.Response;
import java.math.BigDecimal;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.text.NumberFormat;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.zip.CRC32;
import org.apache.commons.lang3.time.DurationFormatUtils;
import org.jsoup.Jsoup;
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

  public static Rate parseRate(HttpResponse<Buffer> httpResponse) {

    final var etag = httpResponse.headers().get("etag");
    final var lastModified = httpResponse.headers().get("last-modified");

    return parseRate(httpResponse.bodyAsString()).toBuilder()
        .etag(etag)
        .lastModified(lastModified)

        .build();
  }

  public static Rate parseRate(String html) {

    final var crc32 = new CRC32();
    crc32.update(ByteBuffer.wrap(html.getBytes(StandardCharsets.UTF_8)));
    final var hash = crc32.getValue();

    final var document = Jsoup.parse(html);

    final var dolar = document.getElementById("dolar");

    final var valDolar = dolar
        .childNode(1)
        .childNode(1)
        .childNode(3)
        .childNode(0)
        .childNode(0)
        .toString()
        .replaceAll("\\.", "")
        .replaceAll(",", ".")
        .trim();

    final var elementsByClass = document.getElementsByClass("pull-right dinpro center");

    final var date = elementsByClass.get(0)
        .childNode(1)
        .attr("content")
        .trim();

    final var rate = new BigDecimal(valDolar);
    final var dateOfRate = ZonedDateTime.parse(date).toLocalDate();

    return Rate.builder()
        .fromCurrency(Currency.USD)
        .toCurrency(Currency.VED)
        .rate(rate)
        .dateOfRate(dateOfRate)
        .source(Rate.Source.BCV)
        .hash(hash)
        .build();
  }


  public static Rate parseRate(Response response) {
    final var etag = response.getHeaderString("etag");
    final var lastModified = response.getHeaderString("last-modified");

    return parseRate(response.readEntity(String.class)).toBuilder()
        .etag(etag)
        .lastModified(lastModified)
        .build();
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
}
