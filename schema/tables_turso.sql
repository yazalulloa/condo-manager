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


CREATE TRIGGER oidc_db_token_state_manager_updated_at_trigger
    AFTER UPDATE
    ON oidc_db_token_state_manager
    FOR EACH ROW
BEGIN
    UPDATE oidc_db_token_state_manager SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
END;


-- CREATE TRIGGER oidc_db_token_state_manager_updated_at_trigger
--     AFTER UPDATE ON oidc_db_token_state_manager
--     FOR EACH ROW
--     WHEN NEW.updated_at < OLD.updated_at
-- BEGIN
--     UPDATE oidc_db_token_state_manager SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
-- END;

-- CREATE TRIGGER [oidc_db_token_state_manager_updated_at_trigger]
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

CREATE TABLE IF NOT EXISTS email_configs
(
    user_id           VARCHAR(50) NOT NULL,
    file              BLOB        NOT NULL,
    file_size         INT         NOT NULL,
    hash              BIGINT      NOT NULL,
    active            BOOL        NOT NULL,
    is_available      BOOL        NOT NULL,
    expires_in        BIGINT      NOT NULL,
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

CREATE TRIGGER buildings_updated_at_trigger
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

CREATE TABLE IF NOT EXISTS apartment_emails
(
    building_id CHAR(20)     NOT NULL,
    apt_number  CHAR(20)     NOT NULL,
    email       VARCHAR(320) NOT NULL,
    PRIMARY KEY (building_id, apt_number, email)
);

CREATE TRIGGER apartments_updated_at_trigger
    AFTER UPDATE
    ON apartments
    FOR EACH ROW
BEGIN
    UPDATE apartments SET updated_at = CURRENT_TIMESTAMP WHERE building_id = OLD.building_id AND number = OLD.number;
END;