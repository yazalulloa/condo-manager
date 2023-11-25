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
    amount_of_apts                   SMALLINT UNSIGNED   NOT NULL,
    created_at                       DATETIME            NOT NULL,
    updated_at                       DATETIME
);


INSERT INTO buildings (id, name, rif, main_currency, debt_currency, currencies_to_show_amount_to_pay, fixed_pay,
                       fixed_pay_amount, round_up_payments, amount_of_apts, created_at)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);

INSERT INTO rates (id, from_currency, to_currency, rate, date_of_rate, source, created_at, hash, etag, last_modified)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);

CREATE TABLE IF NOT EXISTS apartments
(
    building_id CHAR(20)      NOT NULL,
    number      CHAR(20)      NOT NULL,
    name        VARCHAR(100)  NOT NULL,
    id_doc      CHAR(20),
    aliquot     DECIMAL(3, 2) NOT NULL,
    created_at  DATETIME      NOT NULL,
    updated_at  DATETIME,
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
    PRIMARY KEY (id)
);