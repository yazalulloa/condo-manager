-- DROP TABLE IF EXISTS rates;

CREATE TABLE IF NOT EXISTS rates
(
    id            INTEGER PRIMARY KEY,
    from_currency TEXT CHECK ( from_currency IN ('USD', 'VED') ) NOT NULL,
    to_currency   TEXT CHECK ( to_currency IN ('USD', 'VED') )   NOT NULL,
    rate          DECIMAL(16, 12)                                NOT NULL,
    date_of_rate  DATE                                           NOT NULL,
    source        TEXT CHECK ( source IN ('BCV', 'PLATFORM') )   NOT NULL,
    created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
    hash          BIGINT UNSIGNED,
    etag          varchar(20),
    last_modified varchar(40)
);

CREATE INDEX IF NOT EXISTS rates_hash_idx ON rates (hash);
CREATE INDEX IF NOT EXISTS rates_from_currency_to_currency_idx ON rates (from_currency, to_currency);

CREATE TABLE IF NOT EXISTS oidc_db_token_state_manager
(
    id            VARCHAR(100) PRIMARY KEY,
    id_token      VARCHAR(4000)   NOT NULL,
    access_token  VARCHAR(4000)   NOT NULL,
    refresh_token VARCHAR(4000),
    expires_in    BIGINT UNSIGNED NOT NULL,
    user_id       BINARY(16),
    created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at    DATETIME
);

CREATE INDEX IF NOT EXISTS oidc_db_token_state_manager_expires_in_idx ON oidc_db_token_state_manager (expires_in);
CREATE INDEX IF NOT EXISTS oidc_db_token_state_manager_user_id_idx ON oidc_db_token_state_manager (user_id);

CREATE TRIGGER IF NOT EXISTS oidc_db_token_state_manager_updated_at_trigger
    AFTER UPDATE
    ON oidc_db_token_state_manager
    FOR EACH ROW
BEGIN
    UPDATE oidc_db_token_state_manager SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
END;


-- CREATE TRIGGER IF NOT EXISTS  oidc_db_token_state_manager_updated_at_trigger
--     AFTER UPDATE ON oidc_db_token_state_manager
--     FOR EACH ROW
--     WHEN NEW.updated_at < OLD.updated_at
-- BEGIN
--     UPDATE oidc_db_token_state_manager SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
-- END;

-- CREATE TRIGGER IF NOT EXISTS  [oidc_db_token_state_manager_updated_at_trigger]
--     AFTER UPDATE
--     ON oidc_db_token_state_manager
--     FOR EACH ROW
--     WHEN NEW.updated_at < OLD.updated_at --- this avoid infinite loop
-- BEGIN
--     UPDATE oidc_db_token_state_manager
--     SET updated_at=CURRENT_TIMESTAMP
--     WHERE id_token = OLD.id_token
--        OR access_token = OLD.access_token
--        OR refresh_token = OLD.refresh_token
--        OR user_id = OLD.user_id
--        OR expires_in = OLD.expires_in;
-- END;

CREATE INDEX IF NOT EXISTS oidc_db_token_state_manager_user_id_idx ON oidc_db_token_state_manager (user_id);


CREATE TABLE IF NOT EXISTS users
(

    id            VARCHAR(50)                             NOT NULL,
    provider_id   VARCHAR(100)                            NOT NULL,
    provider      TEXT CHECK ( provider IN ('GOOGLE', 'GITHUB', 'MASTODON', 'MICROSOFT', 'APPLE',
                                            'FACEBOOK') ) NOT NULL,
    email         VARCHAR(320)                            NOT NULL,
    username      VARCHAR(100)                            NOT NULL,
    name          VARCHAR(200)                            NOT NULL,
    picture       VARCHAR(500)                            NOT NULL,
    data          JSONB                                   NOT NULL,
    created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE INDEX IF NOT EXISTS users_provider_id_idx ON users (provider, provider_id);

CREATE TABLE IF NOT EXISTS email_configs
(
    user_id           VARCHAR(50) NOT NULL,
    file              BLOB        NOT NULL,
    file_size         INT         NOT NULL,
    hash              BIGINT      NOT NULL,
    active            BOOL        NOT NULL,
    is_available      BOOL        NOT NULL,
    expires_in        BIGINT,
    has_refresh_token BOOL        NOT NULL,
    created_at        DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at        DATETIME,
    last_check_at     DATETIME,
    stacktrace        TEXT,
    PRIMARY KEY (user_id)
);


-- INSERT INTO rates (from_currency, to_currency, rate, date_of_rate, source, created_at)
-- VALUES ('USD', 'VED', 36.318500000000, '2024-02-14', 'BCV', '2024-02-14 02:36:52') returning id;


-- INSERT INTO rates (from_currency, to_currency, rate, date_of_rate, source, created_at)
-- VALUES ('USD', 'VED', 36.318500000000, '2024-02-14', 'BCV', '2024-02-14 02:36:52'),
--        ('USD', 'VED', 36.260900000000, '2024-02-15', 'BCV', '2024-02-14 19:49:07'),
--        ('USD', 'VED', 36.273700000000, '2024-02-16', 'BCV', '2024-02-15 20:05:59'),
--        ('USD', 'VED', 36.335800000000, '2024-02-19', 'BCV', '2024-02-16 19:35:06'),
--        ('USD', 'VED', 16.566600000000, '2022-12-27', 'BCV', '2022-12-27 01:43:19');

-- INSERT INTO rates (from_currency, to_currency, rate, date_of_rate, source, created_at, hash, etag, last_modified) VALUES ('USD','VED',36.318500000000,2024-02-14,'BCV',2024-02-14T02:36:52,3349433059,'\"1707797225-1\"','Tue, 13 Feb 2024 04:07:05 GMT'),('USD','VED',36.260900000000,2024-02-15,'BCV',2024-02-14T19:49:07,2210479811,'\"1707940006-1\"','Wed, 14 Feb 2024 19:46:46 GMT'),('USD','VED',36.273700000000,2024-02-16,'BCV',2024-02-15T20:05:59,3711972730,'\"1708027503-1\"','Thu, 15 Feb 2024 20:05:03 GMT'),('USD','VED',36.335800000000,2024-02-19,'BCV',2024-02-16T19:35:06,186241407,'\"1708112024-1\"','Fri, 16 Feb 2024 19:33:44 GMT'),('USD','VED',16.566600000000,2022-12-27,'BCV',2022-12-27T01:43:19,null,null,null)

CREATE TABLE IF NOT EXISTS buildings
(
    id                               CHAR(20)                                       NOT NULL UNIQUE PRIMARY KEY,
    name                             VARCHAR(100)                                   NOT NULL,
    rif                              CHAR(20)                                       NOT NULL UNIQUE,
    main_currency                    TEXT CHECK ( main_currency IN ('USD', 'VED') ) NOT NULL,
    debt_currency                    TEXT CHECK ( debt_currency IN ('USD', 'VED') ) NOT NULL,
    currencies_to_show_amount_to_pay TEXT                                           NOT NULL,
    fixed_pay                        BOOL                                           NOT NULL,
    fixed_pay_amount                 DECIMAL(16, 2),
    round_up_payments                BOOL                                           NOT NULL,
    email_config_id                  BINARY(16),
    created_at                       DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at                       DATETIME
);

CREATE TRIGGER IF NOT EXISTS buildings_updated_at_trigger
    AFTER UPDATE
    ON buildings
    FOR EACH ROW
BEGIN
    UPDATE buildings SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
END;

CREATE TABLE IF NOT EXISTS apartments
(
    building_id CHAR(20)      NOT NULL,
    number      CHAR(20)      NOT NULL,
    name        VARCHAR(100)  NOT NULL,
    id_doc      CHAR(20),
    aliquot     DECIMAL(3, 2) NOT NULL DEFAULT 0.00,
    created_at  DATETIME               DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME,
    PRIMARY KEY (building_id, number)
);
CREATE INDEX IF NOT EXISTS apartments_name_idx ON apartments (name);
CREATE INDEX IF NOT EXISTS apartments_building_id_number_name_idx ON apartments (building_id, number, name);

CREATE TABLE IF NOT EXISTS apartment_emails
(
    building_id CHAR(20)     NOT NULL,
    apt_number  CHAR(20)     NOT NULL,
    email       VARCHAR(320) NOT NULL,
    PRIMARY KEY (building_id, apt_number, email)
);

CREATE TRIGGER IF NOT EXISTS apartments_updated_at_trigger
    AFTER UPDATE
    ON apartments
    FOR EACH ROW
BEGIN
    UPDATE apartments SET updated_at = CURRENT_TIMESTAMP WHERE building_id = OLD.building_id AND number = OLD.number;
END;

CREATE TABLE IF NOT EXISTS extra_charges
(
    id               INTEGER PRIMARY KEY,
    building_id      CHAR(20)                                       NOT NULL,
    parent_reference CHAR(20)                                       NOT NULL,
    type             TEXT CHECK ( type IN ('BUILDING', 'RECEIPT') ) NOT NULL,
    description      VARCHAR(100)                                   NOT NULL,
    amount           DECIMAL(16, 2)                                 NOT NULL,
    currency         TEXT CHECK ( currency IN ('USD', 'VED') )      NOT NULL,
    active           BOOL                                           NOT NULL,
    created_at       DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at       DATETIME
);


CREATE INDEX IF NOT EXISTS extra_charges_parent_reference_idx ON extra_charges (parent_reference);
CREATE INDEX IF NOT EXISTS extra_charges_building_id_idx ON extra_charges (building_id);
CREATE INDEX IF NOT EXISTS extra_charges_parent_reference_building_id_idx ON extra_charges (parent_reference, building_id);
CREATE INDEX IF NOT EXISTS extra_charges_type_idx ON extra_charges (type);

CREATE TRIGGER IF NOT EXISTS extra_charges_updated_at_trigger
    AFTER UPDATE
    ON extra_charges
    FOR EACH ROW
BEGIN
    UPDATE extra_charges
    SET updated_at = CURRENT_TIMESTAMP
    WHERE id = OLD.id;
END;

CREATE TABLE IF NOT EXISTS extra_charges_apartments
(
    building_id      CHAR(20)    NOT NULL,
    parent_reference CHAR(20)    NOT NULL,
    id               VARCHAR(50) NOT NULL,
    apt_number       CHAR(20)    NOT NULL,
    created_at       DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (building_id, parent_reference, id, apt_number)
);

CREATE TABLE IF NOT EXISTS telegram_chats
(
    user_id    VARCHAR(50)     NOT NULL,
    chat_id    BIGINT UNSIGNED NOT NULL,
    data       JSONB           NOT NULL,
    first_name TEXT,
    last_name  TEXT,
    username   TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME,
    PRIMARY KEY (user_id, chat_id)
);

CREATE TRIGGER IF NOT EXISTS telegram_chats_updated_at_trigger
    AFTER UPDATE
    ON telegram_chats
    FOR EACH ROW
BEGIN
    UPDATE telegram_chats
    SET updated_at = CURRENT_TIMESTAMP
    WHERE user_id = OLD.user_id
      AND chat_id = OLD.chat_id;
END;

CREATE TABLE IF NOT EXISTS notifications_events
(
    user_id    VARCHAR(50)                                           NOT NULL,
    event      TEXT CHECK ( event IN ('APP_STARTUP', 'APP_SHUTTING_DOWN', 'NEW_RATE',
                                      'CONFIG_EMAIL_FAILED_CHECK') ) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, event)
);

CREATE TABLE IF NOT EXISTS reserve_funds
(
    id              INTEGER PRIMARY KEY,
    building_id     CHAR(20)                                              NOT NULL,
    name            VARCHAR(100)                                          NOT NULL,
    fund            DECIMAL(16, 2)                                        NOT NULL,
    expense         DECIMAL(16, 2),
    pay             DECIMAL(16, 2),
    active          BOOL                                                  NOT NULL,
    type            TEXT CHECK ( type IN ('FIXED_PAY', 'PERCENTAGE') )    NOT NULL,
    expense_type    TEXT CHECK ( expense_type IN ('COMMON', 'UNCOMMON') ) NOT NULL,
    add_to_expenses BOOL                                                  NOT NULL,
    created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME
);

CREATE INDEX IF NOT EXISTS reserve_funds_building_id_idx ON reserve_funds (building_id);

CREATE TRIGGER IF NOT EXISTS reserve_funds_updated_at_trigger
    AFTER UPDATE
    ON reserve_funds
    FOR EACH ROW
BEGIN
    UPDATE reserve_funds
    SET updated_at = CURRENT_TIMESTAMP
    WHERE id = OLD.id;
END;


CREATE TABLE IF NOT EXISTS receipts
(
    id          INTEGER PRIMARY KEY,
    building_id CHAR(20) NOT NULL,
    year        SMALLINT NOT NULL,
    month       SMALLINT NOT NULL,
    date        DATE     NOT NULL,
    rate_id     INTEGER  NOT NULL,
    sent        BOOL     NOT NULL,
    last_sent   DATETIME,
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME
);


CREATE INDEX IF NOT EXISTS receipts_building_id_idx ON receipts (building_id);
CREATE INDEX IF NOT EXISTS receipts_month_idx ON receipts (month);
CREATE INDEX IF NOT EXISTS receipts_date_idx ON receipts (date);

CREATE TRIGGER IF NOT EXISTS receipts_updated_at_trigger
    AFTER UPDATE
    ON receipts
    FOR EACH ROW
BEGIN
    UPDATE receipts
    SET updated_at = CURRENT_TIMESTAMP
    WHERE id = OLD.id;
END;

CREATE TABLE IF NOT EXISTS expenses
(
    id           INTEGER PRIMARY KEY,
    building_id  CHAR(20)                                      NOT NULL,
    receipt_id   INTEGER                                       NOT NULL,
    description  TEXT                                          NOT NULL,
    amount       DECIMAL(16, 2)                                NOT NULL,
    currency     TEXT CHECK ( currency IN ('USD', 'VED') )     NOT NULL,
    reserve_fund BOOL                                          NOT NULL,
    type         TEXT CHECK ( type IN ('COMMON', 'UNCOMMON') ) NOT NULL
);


CREATE INDEX IF NOT EXISTS expenses_building_id_idx ON expenses (building_id);
CREATE INDEX IF NOT EXISTS expenses_receipt_id_idx ON expenses (receipt_id);

CREATE TABLE IF NOT EXISTS debts
(
    building_id                      CHAR(20)       NOT NULL,
    receipt_id                       INTEGER        NOT NULL,
    apt_number                       CHAR(20)       NOT NULL,
    receipts                         SMALLINT       NOT NULL,
    amount                           DECIMAL(16, 2) NOT NULL,
    months                           TEXT,
    previous_payment_amount          DECIMAL(16, 2),
    previous_payment_amount_currency TEXT CHECK ( previous_payment_amount_currency IN ('USD', 'VED') ),
    PRIMARY KEY (building_id, receipt_id, apt_number)
);
