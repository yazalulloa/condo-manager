package com.yaz.core.util;

import java.util.Collection;
import org.apache.poi.ss.formula.functions.T;

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

}
