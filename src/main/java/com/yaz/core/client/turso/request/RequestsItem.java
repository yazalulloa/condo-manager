package com.yaz.core.client.turso.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class RequestsItem{
	private final String type;
	private Stmt stmt;
}