package com.yaz.client.turso;

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