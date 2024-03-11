CREATE TABLE IF NOT EXISTS rates
(
    id            SMALLINT UNSIGNED        NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
    from_currency ENUM ('USD', 'VED')      NOT NULL,
    to_currency   ENUM ('USD', 'VED')      NOT NULL,
    rate          DECIMAL(16, 12)          NOT NULL,
    date_of_rate  DATE                     NOT NULL,
    source        ENUM ('BCV', 'PLATFORM') NOT NULL,
    created_at    DATETIME                 NOT NULL,
    hash          BIGINT UNSIGNED,
    etag          varchar(20),
    last_modified varchar(40),
    INDEX (hash)
);

CREATE TABLE IF NOT EXISTS buildings
(
    id                               CHAR(20)            NOT NULL UNIQUE PRIMARY KEY,
    name                             VARCHAR(100)        NOT NULL,
    rif                              CHAR(20)            NOT NULL UNIQUE,
    main_currency                    ENUM ('USD', 'VED') NOT NULL,
    debt_currency                    ENUM ('USD', 'VED') NOT NULL,
    currencies_to_show_amount_to_pay SET ('USD', 'VED')  NOT NULL,
    fixed_pay                        BOOL                NOT NULL,
    fixed_pay_amount                 DECIMAL(16, 2),
    round_up_payments                BOOL                NOT NULL,
    email_config_id                  BINARY(16),
    created_at                       DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at                       DATETIME ON UPDATE CURRENT_TIMESTAMP
);


INSERT INTO buildings (id, name, rif, main_currency, debt_currency, currencies_to_show_amount_to_pay, fixed_pay,
                       fixed_pay_amount, round_up_payments, created_at)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);

INSERT INTO rates (id, from_currency, to_currency, rate, date_of_rate, source, created_at, hash, etag, last_modified)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);

CREATE TABLE IF NOT EXISTS apartments
(
    building_id CHAR(20)      NOT NULL,
    number      CHAR(20)      NOT NULL,
    name        VARCHAR(100)  NOT NULL,
    id_doc      CHAR(20),
    aliquot     DECIMAL(3, 2) NOT NULL DEFAULT 0.00,
    created_at  DATETIME               DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (building_id, number),
    INDEX (name)
);

alter table apartments
    modify column aliquot decimal(3, 2);

INSERT INTO apartments (number, building_id, name, id_doc, aliquot, created_at, updated_at)
VALUES (?, ?, ?, ?, ?, ?, ?);

CREATE TABLE IF NOT EXISTS apartment_emails
(
    building_id CHAR(20)     NOT NULL,
    apt_number  CHAR(20)     NOT NULL,
    email       VARCHAR(320) NOT NULL,
    PRIMARY KEY (building_id, apt_number, email)
);

INSERT INTO apartment_emails (building_id, apt_number, email)
VALUES (?, ?, ?);

SELECT (select * from apartments where name LIKE '%pon%')        AS results,
       (SELECT count(*) from apartments)                         as total_count,
       (SELECT count(*) from apartments where name LIKE '%pon%') as query_count;

SELECT apartments.*, GROUP_CONCAT(apartment_emails.email)
from apartments
         INNER JOIN apartment_emails ON apartments.building_id = apartment_emails.building_id AND
                                        apartments.number = apartment_emails.apt_number

GROUP BY apartments.building_id, apartments.number
ORDER BY apartments.building_id, apartments.number
LIMIT 10;

SELECT DISTINCT count(*)
from apartments
         INNER JOIN apartment_emails ON apartments.building_id = apartment_emails.building_id AND
                                        apartments.number = apartment_emails.apt_number
WHERE concat(apartments.building_id, apartments.number, apartments.name, apartment_emails.email) LIKE '%carm%';


select *
from apartments
where (select count(*)
       FROM apartment_emails
       where apartments.building_id = apartment_emails.building_id
         AND apartments.number = apartment_emails.apt_number) > 1;

SELECT apartments.*, GROUP_CONCAT(apartment_emails.email)
FROM apartments
         INNER JOIN apartment_emails ON apartments.building_id = apartment_emails.building_id AND
                                        apartments.number = apartment_emails.apt_number
WHERE apartments.building_id = 'MARACAIBO'

GROUP BY apartments.building_id, apartments.number
ORDER BY apartments.building_id, apartments.number
limit 10;

SELECT apartments.*, GROUP_CONCAT(apartment_emails.email)
FROM apartments
         INNER JOIN apartment_emails ON apartments.building_id = apartment_emails.building_id AND
                                        apartments.number = apartment_emails.apt_number
WHERE (select count(*)
       FROM apartment_emails
       where apartments.building_id = apartment_emails.building_id
         AND apartments.number = apartment_emails.apt_number) > 1

GROUP BY apartments.building_id, apartments.number
ORDER BY apartments.building_id, apartments.number
limit 10;

SELECT apartments.*, GROUP_CONCAT(apartment_emails.email)
FROM apartments
         INNER JOIN (SELECT apartments.building_id, apartments.number
                     FROM apartments
                              LEFT JOIN apartment_emails ON apartments.building_id = apartment_emails.building_id AND
                                                            apartments.number = apartment_emails.apt_number
                     WHERE concat(apartments.building_id, apartments.number, apartments.name,
                                  apartment_emails.email) LIKE '%vict%'
                     GROUP BY apartments.building_id, apartments.number) AS matched_apartments
                    ON matched_apartments.building_id = apartments.building_id AND
                       matched_apartments.number = apartments.number
         INNER JOIN apartment_emails ON apartments.building_id = apartment_emails.building_id AND
                                        apartments.number = apartment_emails.apt_number
GROUP BY apartments.building_id, apartments.number
ORDER BY apartments.building_id, apartments.number
LIMIT 10;


SELECT apartments.*, GROUP_CONCAT(apartment_emails.email)
FROM apartments
         INNER JOIN apartment_emails ON apartments.building_id = apartment_emails.building_id AND
                                        apartments.number = apartment_emails.apt_number
WHERE (apartments.building_id, apartments.number) > ('ANTONIETA', '05-A')
GROUP BY apartments.building_id, apartments.number
ORDER BY apartments.building_id, apartments.number
LIMIT 10;



SELECT apartments.*, GROUP_CONCAT(apartment_emails.email)
from apartments
         INNER JOIN apartment_emails ON apartments.building_id = apartment_emails.building_id AND
                                        apartments.number = apartment_emails.apt_number
WHERE (apartments.building_id, apartments.number) > (?, ?)
GROUP BY apartments.building_id, apartments.number
ORDER BY apartments.building_id, apartments.number
LIMIT ?;

SELECT apartments.*, GROUP_CONCAT(apartment_emails.email) as emails
from apartments
         INNER JOIN apartment_emails ON apartments.building_id = apartment_emails.building_id AND
                                        apartments.number = apartment_emails.apt_number

GROUP BY apartments.building_id, apartments.number
ORDER BY apartments.building_id, apartments.number
LIMIT 10;


CREATE TABLE IF NOT EXISTS oidc_db_token_state_manager
(
    id            VARCHAR(100),
    id_token      VARCHAR(5000) NULL,
    access_token  VARCHAR(5000) NULL,
    refresh_token VARCHAR(5000) NULL,
    expires_in    BIGINT        NOT NULL,
    user_id       BINARY(16),
    created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at    DATETIME ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    INDEX (user_id)
);

CREATE TABLE IF NOT EXISTS users
(
    id            BINARY(16)                                                              NOT NULL,
    provider_id   VARCHAR(100)                                                            NOT NULL,
    provider      ENUM ('GOOGLE', 'GITHUB', 'MASTODON', 'MICROSOFT', 'APPLE', 'FACEBOOK') NOT NULL,
    email         VARCHAR(320)                                                            NOT NULL,
    username      VARCHAR(100)                                                            NOT NULL,
    name          VARCHAR(200)                                                            NOT NULL,
    picture       VARCHAR(500)                                                            NOT NULL,
    data          JSON                                                                    NOT NULL,
    created_at    DATETIME                                                                NOT NULL,
    last_login_at DATETIME,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS email_configs
(
    user_id           BINARY(16) NOT NULL,
    file              BLOB       NOT NULL,
    file_size         INT        NOT NULL,
    hash              BIGINT     NOT NULL,
    active            BOOL       NOT NULL,
    is_available      BOOL       NOT NULL,
    expires_in        BIGINT     NOT NULL,
    created_at        DATETIME   NOT NULL,
    has_refresh_token BOOL       NOT NULL,
    updated_at        DATETIME,
    last_check_at     DATETIME,
    stacktrace        TEXT,
    PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS extra_charges
(
    building_id  CHAR(20)                     NOT NULL,
    secondary_id CHAR(40)                     NOT NULL,
    id           BINARY(16)                   NOT NULL,
    type         ENUM ('BUILDING', 'RECEIPT') NOT NULL,
    description  VARCHAR(100)                 NOT NULL,
    amount       DECIMAL(16, 2)               NOT NULL,
    currency     ENUM ('USD', 'VED')          NOT NULL,
    active       BOOL                         NOT NULL DEFAULT true,
    created_at   DATETIME                              DEFAULT CURRENT_TIMESTAMP,
    updated_at   DATETIME ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (building_id, secondary_id, id)
);

CREATE TABLE IF NOT EXISTS extra_charges_apartments
(
    building_id  CHAR(20)   NOT NULL,
    secondary_id CHAR(40)   NOT NULL,
    id           BINARY(16) NOT NULL,
    apt_number   CHAR(20)   NOT NULL,
    created_at   DATETIME   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (building_id, secondary_id, id, apt_number)
);

INSERT INTO extra_charges (building_id, secondary_id, id, type, description, amount, currency, active)
VALUES ('ANTONIETA', 'ANTONIETA', UUID_TO_BIN(UUID()), 'BUILDING', 'TEST', 12.23, 'USD', true);

INSERT INTO extra_charges_apartments (building_id, secondary_id, id, apt_number)
VALUES ('ANTONIETA', 'ANTONIETA', UUID_TO_BIN('d735ef95-d83b-11ee-8b80-62ee39fccc7b'), '01-A'),
       ('ANTONIETA', 'ANTONIETA', UUID_TO_BIN('d735ef95-d83b-11ee-8b80-62ee39fccc7b'), '01-B'),
       ('ANTONIETA', 'ANTONIETA', UUID_TO_BIN('d735ef95-d83b-11ee-8b80-62ee39fccc7b'), '02-A');

SELECT extra_charges.*,
       BIN_TO_UUID(extra_charges.id)                                                            as uuid_id,
       GROUP_CONCAT(extra_charges_apartments.apt_number, ', ', apartments.name SEPARATOR ' ; ') as apt_numbers

FROM extra_charges
         LEFT JOIN extra_charges_apartments ON extra_charges.building_id = extra_charges_apartments.building_id AND
                                               extra_charges.secondary_id = extra_charges_apartments.secondary_id AND
                                               extra_charges.id = extra_charges_apartments.id
         LEFT JOIN apartments ON extra_charges_apartments.building_id = apartments.building_id AND
                                 extra_charges_apartments.apt_number = apartments.number

GROUP BY extra_charges.building_id, extra_charges.secondary_id, extra_charges.id
ORDER BY extra_charges.building_id, extra_charges.secondary_id, extra_charges.id;

SELECT extra_charges.*,
       BIN_TO_UUID(extra_charges.id)                                                            as uuid_id,
       GROUP_CONCAT(extra_charges_apartments.apt_number, ', ', apartments.name SEPARATOR ' ; ') as apt_numbers

FROM extra_charges
         LEFT JOIN extra_charges_apartments ON extra_charges.building_id = extra_charges_apartments.building_id AND
                                               extra_charges.secondary_id = extra_charges_apartments.secondary_id AND
                                               extra_charges.id = extra_charges_apartments.id
         LEFT JOIN apartments ON extra_charges_apartments.building_id = apartments.building_id AND
                                 extra_charges_apartments.apt_number = apartments.number
WHERE extra_charges.id = UUID_TO_BIN('11eedbe8-97b8-0690-8fee-d229547576d5')
GROUP BY extra_charges.building_id, extra_charges.secondary_id, extra_charges.id
ORDER BY extra_charges.building_id, extra_charges.secondary_id, extra_charges.id;
