package com.yaz.client.turso;

import java.util.List;
import lombok.Data;

@Data
public class TursoQuery{
	private List<RequestsItem> requests;
}