package com.yaz.core.service.download;

import com.yaz.core.service.ListService;
import com.yaz.core.service.ListServicePagingProcessorImpl;
import com.yaz.core.service.domain.FileResponse;
import com.yaz.core.service.domain.ReceiptRecord;
import com.yaz.core.service.entity.DebtService;
import com.yaz.core.service.entity.ExpenseService;
import com.yaz.core.service.entity.ExtraChargeService;
import com.yaz.core.service.entity.ReceiptService;
import com.yaz.core.util.MutinyUtil;
import com.yaz.core.util.PagingProcessor;
import com.yaz.core.util.WriteEntityToFile;
import com.yaz.persistence.domain.query.ReceiptQuery;
import com.yaz.persistence.domain.query.SortOrder;
import io.reactivex.rxjava3.core.Observable;
import io.reactivex.rxjava3.core.Single;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor
public class ReceiptDownloader implements ListService<ReceiptRecord, ReceiptQuery> {

  private final WriteEntityToFile writeEntityToFile;
  private final ReceiptService receiptService;
  private final ExpenseService expenseService;
  private final ExtraChargeService extraChargeService;
  private final DebtService debtService;

  public PagingProcessor<List<ReceiptRecord>> pagingProcessor(int pageSize, SortOrder sortOrder) {
    return new ListServicePagingProcessorImpl<>(this,
        ReceiptQuery.builder().limit(pageSize).build());
  }

  public Single<FileResponse> downloadFile() {
    return writeEntityToFile.downloadFile("receipts.json.gz", pagingProcessor(100, SortOrder.ASC));
  }

  @Override
  public Single<List<ReceiptRecord>> listByQuery(ReceiptQuery query) {
    return MutinyUtil.single(receiptService.select(query))
        .flatMapObservable(Observable::fromIterable)
        .flatMapSingle(receipt -> {

          final var expenseSingle = MutinyUtil.single(expenseService.readByReceipt(receipt.id()));
          final var debtSingle = MutinyUtil.single(debtService.readByReceipt(receipt.buildingId(), receipt.id()));

          final var extraChargeSingle = MutinyUtil.single(
              extraChargeService.by(receipt.buildingId(), String.valueOf(receipt.id())));

          return Single.zip(expenseSingle, debtSingle, extraChargeSingle, (expenses, debts, extraCharge) -> {
            return ReceiptRecord.builder()
                .receipt(receipt)
                .extraCharges(extraCharge)
                .expenses(expenses)
                .debts(debts)
                .build();
          });

        })
        .toList();
  }

  @Override
  public ReceiptQuery nextQuery(List<ReceiptRecord> list, ReceiptQuery query) {
    if (list.isEmpty()) {
      return query;
    }

    return query.toBuilder()
        .lastId(list.getLast().receipt().id())
        .build();
  }
}
