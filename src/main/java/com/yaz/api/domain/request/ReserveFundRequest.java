package com.yaz.api.domain.request;

import com.yaz.persistence.domain.ExpenseType;
import com.yaz.persistence.domain.ReserveFundType;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.jboss.resteasy.reactive.RestForm;

@Data
public class ReserveFundRequest {

  @RestForm
  @NotNull
  private String keys;
  @RestForm("reserveFundName")
  private String name;
  @RestForm("reserveFundFund")
  private String fund;
  @RestForm("reserveFundExpense")
  private String expense;
  @RestForm("reserveFundPay")
  private String pay;
  @RestForm("reserveFundActive")
  private boolean active;
  @RestForm
  private ReserveFundType type;
  @RestForm
  private ExpenseType expenseType;
  @RestForm
  private boolean addToExpenses;


  @RestForm
  private String cardId;

}
