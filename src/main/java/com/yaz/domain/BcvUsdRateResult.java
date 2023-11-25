package com.yaz.domain;


import com.yaz.persistence.entities.Rate;

public record BcvUsdRateResult(State state, Rate rate) {

    public BcvUsdRateResult(State state) {
        this(state, null);
    }

    public enum State {
        NEW_RATE,
        OLD_RATE,
        SAME_RATE,
        RATE_NOT_IN_DB,
        ETAG_IS_SAME,
        HASH_SAVED,
        QUEUE_IS_NOT_AVAILABLE
    }
}
