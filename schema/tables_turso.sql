CREATE TABLE IF NOT EXISTS rates
(
    id            SMALLINT UNSIGNED AUTOINCREMENT PRIMARY KEY,
    from_currency TEXT CHECK ( from_currency IN ('USD', 'VED') ) NOT NULL,
    to_currency   TEXT CHECK ( to_currency IN ('USD', 'VED') )   NOT NULL,
    rate          DECIMAL(16, 12)                                NOT NULL,
    date_of_rate  DATE                                           NOT NULL,
    source        TEXT CHECK ( source IN ('BCV', 'PLATFORM') )   NOT NULL,
    created_at    DATETIME                                       NOT NULL,
    hash          BIGINT UNSIGNED,
    etag          varchar(20),
    last_modified varchar(40)
);

CREATE INDEX rates_hash_idx ON rates (hash);