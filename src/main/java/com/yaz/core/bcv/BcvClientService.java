package com.yaz.core.bcv;

import com.yaz.core.util.StringUtil;
import com.yaz.persistence.domain.Currency;
import com.yaz.persistence.entities.Rate;
import com.yaz.persistence.entities.Rate.Source;
import io.reactivex.rxjava3.core.Single;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.Response;
import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.function.Function;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.Jsoup;

@Slf4j
@ApplicationScoped
public class BcvClientService {

  private static final AtomicBoolean USE_ALTERNATE = new AtomicBoolean(true);
  private final RestBcvClientWrapper restBcvClient;
  private final AlternateBcvClient alternateBcvClient;

  @Inject
  public BcvClientService(RestBcvClientWrapper restBcvClient, AlternateBcvClient alternateBcvClient) {
    this.restBcvClient = restBcvClient;
    this.alternateBcvClient = alternateBcvClient;
  }

  private BcvClient bcvClient() {
    return USE_ALTERNATE.get() ? alternateBcvClient : restBcvClient;
  }

  private Single<Response> clientResponse(Function<BcvClient, Single<Response>> function) {

    return function.apply(bcvClient())
        .doOnError(throwable -> {
          log.error("ERROR BCV", throwable);
          USE_ALTERNATE.set(!USE_ALTERNATE.get());
        })
        .onErrorResumeWith(function.apply(bcvClient()));
  }

  public Single<Response> get() {
    return clientResponse(BcvClient::get);
  }

  public Single<Response> head() {
    return clientResponse(BcvClient::head);
  }

  public Single<BcvCheck> bcvCheck() {
    return head()
        .map(response -> {
          final var etag = response.getHeaderString("etag");
          final var lastModified = response.getHeaderString("last-modified");

          return new BcvCheck(etag, lastModified);
        });
  }

  public Single<Rate> currentRate() {
    return get().map(response -> {
      final var etag = response.getHeaderString("etag");
      final var lastModified = response.getHeaderString("last-modified");

      final var html = response.readEntity(String.class);
      final var hash = StringUtil.crc32(html);

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
          .source(Source.BCV)
          .hash(hash)
          .etag(etag)
          .lastModified(lastModified)
          .build();
    });
  }
}
