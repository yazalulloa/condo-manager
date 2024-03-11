package com.yaz.client.turso.response;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import java.util.List;
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record ResponseResult(
	Integer affectedRowCount,
	Long lastInsertRowid,
	String replicationIndex,
	List<List<Item>> rows,
	List<ColsItem> cols
) {
}