package com.yaz.core.util;

import io.quarkus.qute.TemplateInstance;
import io.smallrye.mutiny.Uni;
import jakarta.ws.rs.core.Response;
import java.util.Collection;

public class TemplateUtil {


  public static <T> String toStringArray(Collection<T> collection) {
    if (collection == null || collection.isEmpty()) {
      return "[]";
    }
    final var sb = new StringBuilder();
    sb.append("[");
    for (T item : collection) {
      sb.append("'");
      sb.append(item.toString());
      sb.append("'");
      sb.append(", ");
    }
    if (sb.length() > 1) {
      sb.setLength(sb.length() - 2);
    }
    sb.append("]");
    return sb.toString();
  }

  public static Uni<Response> responseUni(TemplateInstance templateInstance) {
    return Uni.createFrom().item(Response.ok(templateInstance).build());
  }

  public static Uni<TemplateInstance> templateUni(TemplateInstance templateInstance) {
    return Uni.createFrom().item(templateInstance);
  }

}
