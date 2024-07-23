package com.yaz.core.service;

import jakarta.enterprise.context.ApplicationScoped;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor
public class TranslationProvider {

  public String translate(String str) {

    return switch (str) {
      case "JANUARY" -> "ENERO";
      case "FEBRUARY" -> "FEBRERO";
      case "MARCH" -> "MARZO";
      case "APRIL" -> "ABRIL";
      case "MAY" -> "MAYO";
      case "JUNE" -> "JUNIO";
      case "JULY" -> "JULIO";
      case "AUGUST" -> "AGOSTO";
      case "SEPTEMBER" -> "SEPTIEMBRE";
      case "OCTOBER" -> "OCTUBRE";
      case "NOVEMBER" -> "NOVIEMBRE";
      case "DECEMBER" -> "DICIEMBRE";
      case "COMMON" -> "COMÚN";
      case "UNCOMMON" -> "NO COMÚN";
      case "PERCENTAGE" -> "PORCENTAJE";
      case "FIXED_PAY" -> "MONTO FIJO";
      default -> str;
    };

  }
}
