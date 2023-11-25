package com.yaz;

import com.cronutils.model.CronType;
import com.cronutils.model.definition.CronDefinition;
import com.cronutils.model.definition.CronDefinitionBuilder;
import com.cronutils.parser.CronParser;
import org.junit.jupiter.api.Test;

public class CronTest {

  @Test
  void cron() {
    final var expression = "0 0/5 13,14,15,16,17,18,23 ? * MON,TUE,WED,THU,FRI";
    //final var expression = "0    */5    13,14,15,16,17,23    *    *    MON-FRI";
    CronDefinition cronDefinition = CronDefinitionBuilder.instanceDefinitionFor(CronType.SPRING);
    CronParser cronParser = new CronParser(cronDefinition);

    final var parsed = cronParser.parse(expression);

    System.out.println(parsed);
  }

}
