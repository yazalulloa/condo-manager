CREATE TABLE IF NOT EXISTS buildings2
(
    id                               CHAR(20)                                       NOT NULL UNIQUE PRIMARY KEY,
    name                             VARCHAR(100)                                   NOT NULL,
    rif                              CHAR(20)                                       NOT NULL,
    main_currency                    TEXT CHECK ( main_currency IN ('USD', 'VED') ) NOT NULL,
    debt_currency                    TEXT CHECK ( debt_currency IN ('USD', 'VED') ) NOT NULL,
    currencies_to_show_amount_to_pay TEXT                                           NOT NULL,
    fixed_pay                        BOOL                                           NOT NULL,
    fixed_pay_amount                 DECIMAL(16, 2),
    round_up_payments                BOOL                                           NOT NULL,
    email_config_id                  TEXT,
    created_at                       DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at                       DATETIME
);

INSERT INTO buildings2 (id, name, rif, main_currency, debt_currency, currencies_to_show_amount_to_pay, fixed_pay, fixed_pay_amount, round_up_payments, email_config_id, created_at)
SELECT id, name, rif, main_currency, debt_currency, currencies_to_show_amount_to_pay, fixed_pay, fixed_pay_amount, round_up_payments, email_config_id, created_at FROM buildings;
DROP TABLE buildings;
ALTER TABLE buildings2 RENAME TO buildings;
