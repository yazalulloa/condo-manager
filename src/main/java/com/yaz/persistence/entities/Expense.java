package com.yaz.persistence.entities;

import com.yaz.persistence.domain.Currency;
import com.yaz.persistence.domain.ExpenseType;
import java.math.BigDecimal;
import lombok.Builder;

@Builder
public record Expense(
    String description,
    BigDecimal amount,
    Currency currency,
    Boolean reserveFund,
    ExpenseType type
) {

}
