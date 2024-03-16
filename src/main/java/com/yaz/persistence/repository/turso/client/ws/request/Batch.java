package com.yaz.persistence.repository.turso.client.ws.request;

import java.util.List;

public record Batch(List<BatchStep> steps) {

}
