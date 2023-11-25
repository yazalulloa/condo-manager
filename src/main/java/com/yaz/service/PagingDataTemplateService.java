package com.yaz.service;

import io.vertx.core.json.JsonObject;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import com.yaz.persistence.domain.Paging;


@Slf4j
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class PagingDataTemplateService {

  public Map<String, Object> data(int actualLimit, Paging<JsonObject> paging,
      Consumer<Map<String, Object>> itemConsumer,
      Function<Map<String, Object>, String> lastParams) {

    final var results = paging.results()
        .stream()
        .map(JsonObject::getMap)
        .peek(itemConsumer)
        .collect(Collectors.toCollection(() -> new ArrayList<>(paging.results().size())));

    if (results.size() == actualLimit) {
      results.remove(results.size() - 1);

     /* if (sortOrder == SortOrder.DESC) {
        results.remove(results.size() - 1);
      } else {
        results.remove(0);
      }*/
    }

    results.trimToSize();

    String nextPageUrl = null;

    if (!results.isEmpty()) {

      // final var newPreviousLastId = results.get(0).get("id");
      final var newNextLastId = results.get(results.size() - 1).get("id");

      final var areThereMoreRows = paging.results().size() == actualLimit;

      if (areThereMoreRows) {
        nextPageUrl = lastParams.apply(results.get(results.size() - 1));
      }

      /*if (!isInitialLoad) {
        if (sortOrder == SortOrder.DESC || areThereMoreRows) {
          previousPageUrl = baseUrl + "?last_id=" + newPreviousLastId + "&sort_order=" + SortOrder.ASC;
          firstPageUrl = baseUrl;
        }
      }

      if (sortOrder == SortOrder.ASC || areThereMoreRows) {
        nextPageUrl = baseUrl + "?last_id=" + newNextLastId + "&sort_order=" + SortOrder.DESC;
      }*/

    }

    final var data = new HashMap<String, Object>();

    data.put("total_count", paging.totalCount());
    data.put("query_count", paging.queryCount());
    data.put("results", results);
    data.put("next_page_url", nextPageUrl);

    return data;

  }
}
