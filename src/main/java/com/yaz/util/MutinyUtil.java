package com.yaz.util;

import io.reactivex.rxjava3.core.Maybe;
import io.reactivex.rxjava3.core.Single;
import io.smallrye.mutiny.Uni;
import io.smallrye.mutiny.converters.uni.UniRx3Converters;
import java.util.Optional;

public class MutinyUtil {

  private MutinyUtil() {


  }

  public static <T> Uni<T> toUni(Single<T> single) {
    return UniRx3Converters.<T>fromSingle().from(single);
  }

  public static <T> Uni<T> toUni(Maybe<T> maybe) {
    return UniRx3Converters.<T>fromMaybe().from(maybe);
  }

  public static <T> Maybe<T> toMaybe(Uni<T> uni) {
    return UniRx3Converters.<T>toMaybe().apply(uni);
  }

  public static <T> Single<Optional<T>> toSingle(Uni<T> uni) {
    return UniRx3Converters.<T>toSingle().apply(uni);
  }

  public static <T> Single<T> single(Uni<T> uni) {
    return toMaybe(uni).toSingle();
  }
}
