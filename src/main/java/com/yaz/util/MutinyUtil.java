package com.yaz.util;

import io.reactivex.rxjava3.core.Maybe;
import io.reactivex.rxjava3.core.Single;
import io.smallrye.mutiny.Uni;
import io.smallrye.mutiny.converters.uni.UniRx3Converters;

public class MutinyUtil {

  private MutinyUtil() {


  }

  public static <T> Uni<T> toUni(Single<T> single) {
    return UniRx3Converters.<T>fromSingle().from(single);
  }

  public static <T> Uni<T> toUni(Maybe<T> maybe) {
    return UniRx3Converters.<T>fromMaybe().from(maybe);
  }
}
